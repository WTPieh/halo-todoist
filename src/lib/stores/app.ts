import { derived, get } from "svelte/store";
import { AppState } from "./path";
import { persistent } from "./persistent";
import type { BackgroundState } from "@/shared/types";

// 1. A single persistent store for the entire background state.
export const backgroundState = persistent<BackgroundState | null>(
  "local:background-state",
  null
);

// UI-specific state should be stored separately.
export const appState = persistent<AppState>(
  "local:haloist_page",
  AppState.LANDING
);
export const acceptedTerms = persistent("local:accepted_terms", false);

// 2. Derived stores for easy access to slices of the state.
export const haloSession = derived(
  backgroundState,
  ($state) => $state?.haloSession
);
export const haloUser = derived(backgroundState, ($state) => $state?.haloUser);
export const todoistProjects = derived(
  backgroundState,
  ($state) => $state?.todoistProjects
);

// A derived store for the combined user object, for convenience in the UI.
export const user = derived(
  [haloUser, haloSession],
  ([$haloUser, $haloSession]) => {
    if (!$haloUser?.data || !$haloSession?.data) {
      return null;
    }
    return {
      firstName: $haloUser.data.userInfo.firstName,
      lastName: $haloUser.data.userInfo.lastName,
      userImgUrl: $haloUser.data.userInfo.userImgUrl,
      email: $haloSession.data.user.email,
    };
  }
);

// 3. The actions object.
function createActions() {
  return {
    fetchHaloSession: () => {
      browser.runtime.sendMessage({ type: "halo-fetch-session" });
    },
    fetchTodoistProjects: () => {
      browser.runtime.sendMessage({ type: "todoist-fetch-projects" });
    },
    logout: () => {
      backgroundState.set(null);
      appState.set(AppState.LANDING);
      acceptedTerms.set(false);
    },
    setAppState: (newState: AppState) => {
      appState.set(newState);
    },
    setAcceptedTerms: () => {
      acceptedTerms.set(true);
    },
  };
}

export const appStore = createActions();
