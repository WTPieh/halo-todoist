import {
  getInformation,
  getUserOverview,
  AUTHORIZATION_KEY,
  CONTEXT_KEY,
} from "@/shared/halo";
import {
  HaloInfo,
  UserOverview,
  StateSlice,
  BackgroundState,
} from "@/shared/types";
import { handleTodoistAuth } from "@/lib/auth";
import { getProjects, getUserPlan } from "@/lib/api";
import { BackgroundMessage } from "@/shared/background-types";

// The storage key and default state remain the same, but the types are now imported.
const STORAGE_KEY = "background-state";
const defaultState: BackgroundState = {
  haloSession: {
    status: "idle",
    data: null,
    error: null,
  },
  haloUser: {
    status: "idle",
    data: null,
    error: null,
  },
  todoistProjects: {
    status: "idle",
    data: null,
    error: null,
  },
  todoistToken: {
    status: "idle",
    data: null,
    error: null,
  },
  todoistUserPlan: {
    status: "idle",
    data: null,
    error: null,
    lastUpdated: null,
  },
};

// --- State Management Helpers ---

// Gets the current state from storage, providing a default if none exists.
async function getState(): Promise<BackgroundState> {
  const state = await storage.getItem<BackgroundState>(`local:${STORAGE_KEY}`);
  return state ?? defaultState;
}

// Sets the new state into storage.
async function setState(newState: BackgroundState): Promise<void> {
  await storage.setItem(`local:${STORAGE_KEY}`, newState);
}

// --- Background Script Logic ---

export default defineBackground(() => {
  console.log("Background script loaded");

  browser.runtime.onMessage.addListener(async (message) => {
    console.log("Message received:", message);

    switch (message.type) {
      // --- Get the entire current state from storage ---
      // This is a direct request for state, so we send it back.
      // Note: This isn't currently used by the app store, but might be useful.
      case BackgroundMessage.GET_STATE:
        return await getState();

      // --- Halo Session Fetching ---
      case BackgroundMessage.HALO_FETCH_SESSION: {
        let state = await getState();
        state.haloSession.status = "loading";
        state.haloUser.status = "loading";
        await setState(state); // Update UI to show loading state

        try {
          const sessionInfo = await getInformation();
          if ("userId" in sessionInfo) {
            state.haloSession.status = "success";
            state.haloSession.data = sessionInfo;
            state.haloSession.error = null;
            state.haloSession.lastUpdated = Date.now();

            // Now fetch the user overview
            const userOverview = await getUserOverview({
              cookie: {
                [AUTHORIZATION_KEY]: sessionInfo.TE1TX0FVVEg,
                [CONTEXT_KEY]: sessionInfo.TE1TX0NPTlRFWFQ,
              },
              uid: sessionInfo.userId,
            });

            if (userOverview) {
              state.haloUser.status = "success";
              state.haloUser.data = userOverview;
            } else {
              throw new Error("Failed to fetch user overview.");
            }
          } else {
            throw new Error("Invalid session info structure received.");
          }
        } catch (error) {
          console.error("Error fetching Halo session:", error);
          state.haloSession.status = "error";
          state.haloUser.status = "error";
          state.haloSession.data = null; // Clear stale data on error
          state.haloUser.data = null;
          state.haloSession.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred.";
        }
        await setState(state); // Final state update
        break;
      }
      // --- Todoist Authentication Flow ---
      case BackgroundMessage.TODOIST_AUTH: {
        let state = await getState();
        state.todoistToken.status = "loading";
        await setState(state);

        try {
          const token = await handleTodoistAuth();
          state.todoistToken.status = "success";
          state.todoistToken.data = token;
          state.todoistToken.lastUpdated = Date.now();
          state.todoistToken.error = null;
        } catch (error) {
          console.error("Error during Todoist authentication:", error);
          state.todoistToken.status = "error";
          state.todoistToken.data = null;
          state.todoistToken.lastUpdated = Date.now();
          state.todoistToken.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred.";
        }
        await setState(state);
        break;
      }

      // --- Todoist Project Fetching (called from Dashboard Refresh) ---
      case BackgroundMessage.REFETCH_TODOIST_PROJECTS: {
        let state = await getState();
        state.todoistProjects.status = "loading";
        await setState(state);

        try {
          const token = state.todoistToken;
          if (!token.data) {
            throw new Error("Todoist token not found. Please authenticate.");
          }

          const projects = await getProjects(token.data);
          state.todoistProjects.status = "success";
          state.todoistProjects.data = projects;
          state.todoistProjects.error = null;
          state.todoistProjects.lastUpdated = Date.now();
        } catch (error) {
          console.error("Error fetching Todoist projects:", error);
          state.todoistProjects.status = "error";
          state.todoistProjects.data = null; // Clear stale data on error
          state.todoistProjects.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred.";
        }
        await setState(state);
        break;
      }
      case BackgroundMessage.REFETCH_TODOIST_USER_PLAN: {
        let state = await getState();
        state.todoistUserPlan.status = "loading";
        await setState(state);

        try {
          const token = state.todoistToken;
          if (!token.data) {
            throw new Error("Todoist token not found. Please authenticate.");
          }

          const userPlan = await getUserPlan(token.data);
          state.todoistUserPlan.status = "success";
          state.todoistUserPlan.data = userPlan;
          state.todoistUserPlan.error = null;
          state.todoistUserPlan.lastUpdated = Date.now();
        } catch (error) {
          console.error("Error fetching Todoist user plan:", error);
          state.todoistUserPlan.status = "error";
          state.todoistUserPlan.data = null;
          state.todoistUserPlan.error =
            error instanceof Error
              ? error.message
              : "An unknown error occurred.";
        }
        await setState(state);
        break;
      }
      default:
        console.warn("Unknown message type received:", message.type);
        // No response needed for unknown types
        break;
    }
  });
});
