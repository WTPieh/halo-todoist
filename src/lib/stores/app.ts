import { derived, get, readable } from "svelte/store";
import { AppState } from "./path";
import { persistent } from "./persistent";
import type { BackgroundState } from "@/shared/types";
import { BackgroundMessage } from "@/shared/background-types";

// 1. Create the persistent stores and capture their initialization flags.
const {
  store: backgroundStateStore,
  isInitialized: isBackgroundStateInitialized,
} = persistent<BackgroundState | null>("local:background-state", null);

const { store: appStateStore, isInitialized: isAppStateInitialized } =
  persistent<AppState>("local:haloist_page", AppState.LANDING);

const { store: acceptedTermsStore, isInitialized: isAcceptedTermsInitialized } =
  persistent("local:accepted_terms", false);

// A single store to signal when all primary UI stores are ready.
export const isAppInitialized = derived(
  [
    isBackgroundStateInitialized,
    isAppStateInitialized,
    isAcceptedTermsInitialized,
  ],
  ($values) => $values.every(Boolean)
);

// 2. Export the stores themselves for the UI to use.
export const backgroundState = backgroundStateStore;
export const appState = appStateStore;
export const acceptedTerms = acceptedTermsStore;

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
export const todoistToken = derived(
  backgroundState,
  ($state) => $state?.todoistToken
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
      browser.runtime.sendMessage({ type: BackgroundMessage.HALO_FETCH_SESSION });
    },
    fetchTodoistProjects: () => {
      browser.runtime.sendMessage({ type: BackgroundMessage.REFETCH_TODOIST_PROJECTS });
    },
    logout: () => {
      backgroundStateStore.set(null);
      appStateStore.set(AppState.LANDING);
      acceptedTermsStore.set(false);
    },
    fetchUserPlan: () => {
      browser.runtime.sendMessage({ type: BackgroundMessage.REFETCH_TODOIST_USER_PLAN });
    },
    setAppState: (newState: AppState) => {
      if (newState === AppState.TODOIST_AUTH)
        if (get(backgroundStateStore)?.todoistToken) {
          appStateStore.set(AppState.TODOIST_SUCCESS);
        }
      appStateStore.set(newState);
    },
    setAcceptedTerms: () => {
      acceptedTermsStore.set(true);
    },
  };
}

export const appStore = createActions();
