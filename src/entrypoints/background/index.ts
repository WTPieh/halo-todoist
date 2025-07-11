import { BackgroundState } from "@/shared/types";
import { BackgroundMessage } from "@/shared/background-types";
import { handleHaloFetchSession } from "./api/halo-requests";
import {
  handleTodoistAuthRequest,
  handleFetchProjects,
  handleFetchUserPlan,
} from "./api/todoist-requests";

const STORAGE_KEY = "background-state";
const defaultState: BackgroundState = {
  haloSession: { status: "idle", data: null, error: null },
  haloUser: { status: "idle", data: null, error: null },
  todoistProjects: { status: "idle", data: null, error: null },
  todoistToken: { status: "idle", data: null, error: null },
  todoistUserPlan: {
    status: "idle",
    data: null,
    error: null,
    lastUpdated: null,
  },
};

// --- State Management Helpers ---
async function getState(): Promise<BackgroundState> {
  const state = await storage.getItem<BackgroundState>(`local:${STORAGE_KEY}`);
  return state ?? defaultState;
}

async function setState(newState: BackgroundState): Promise<void> {
  await storage.setItem(`local:${STORAGE_KEY}`, newState);
}

// --- Background Script Logic ---
export default defineBackground(() => {
  console.log("Background script loaded");

  browser.runtime.onMessage.addListener(async (message) => {
    console.log("Message received:", message);

    switch (message.type) {
      case BackgroundMessage.GET_STATE:
        return await getState();

      case BackgroundMessage.HALO_FETCH_SESSION:
        await handleHaloFetchSession(getState, setState);
        break;

      case BackgroundMessage.TODOIST_AUTH:
        await handleTodoistAuthRequest(getState, setState);
        break;

      case BackgroundMessage.TODOIST_FETCH_PROJECTS:
        await handleFetchProjects(getState, setState);
        break;

      case BackgroundMessage.TODOIST_FETCH_USER_PLAN:
        await handleFetchUserPlan(getState, setState);
        break;

      default:
        console.warn("Unknown message type received:", message.type);
        break;
    }
  });
});
