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
import { getProjects } from "@/lib/api";

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
  todoistToken: null,
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

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message);

    switch (message.type) {
      // --- Get the entire current state from storage ---
      case "get-state":
        (async () => {
          const state = await getState();
          sendResponse(state);
        })();
        return true; // Async operation

      // --- Halo Session Fetching ---
      case "halo-fetch-session":
        (async () => {
          let state = await getState();
          state.haloSession.status = "loading";
          state.haloUser.status = "loading";
          await setState(state);

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
          await setState(state);
          sendResponse(state.haloSession);
        })();
        return true; // Indicate that sendResponse will be called asynchronously

      // --- Todoist Authentication Flow ---
      case "todoist-auth":
        (async () => {
          try {
            await handleTodoistAuth();
            sendResponse({ success: true });
          } catch (error) {
            console.error("Error during Todoist authentication:", error);
            sendResponse({
              error: error instanceof Error ? error.message : "An unknown error occurred.",
            });
          }
        })();
        return true;

      // --- Todoist Project Fetching (called from Dashboard Refresh) ---
      case "refetch-todoist-projects":
        (async () => {
          let state = await getState();
          state.todoistProjects.status = "loading";
          await setState(state);

          try {
            const token = state.todoistToken;
            if (!token) {
              throw new Error("Todoist token not found. Please authenticate.");
            }

            const projects = await getProjects(token);
            state.todoistProjects.status = "success";
            state.todoistProjects.data = projects;
            state.todoistProjects.error = null;
            state.todoistProjects.lastUpdated = Date.now();
            await setState(state);
            sendResponse({ success: true });
          } catch (error) {
            console.error("Error fetching Todoist projects:", error);
            state.todoistProjects.status = "error";
            state.todoistProjects.data = null; // Clear stale data on error
            state.todoistProjects.error =
              error instanceof Error
                ? error.message
                : "An unknown error occurred.";
            await setState(state);
            sendResponse({
              error: state.todoistProjects.error,
            });
          }
        })();
        return true;

      default:
        console.warn("Unknown message type received:", message.type);
        sendResponse({ error: `Unknown message type: ${message.type}` });
        return false;
    }
  });
});
