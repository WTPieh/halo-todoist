import { writable, get } from "svelte/store";
import { AppState } from "./path";
import { Project } from "$lib/api";
import { HaloValidateResponse } from "@/shared/types";
import { toast } from "svelte-sonner";

type AppStore = {
  appState: AppState;
  todoistToken: string | null | undefined;
  projects: Project[];
  haloSession: HaloValidateResponse | null | undefined;
  acceptedTerms: boolean;
  isInitialized: boolean;
  loadingProjects: boolean;
};

function createAppStore() {
  const { subscribe, update, set } = writable<AppStore>({
    appState: AppState.LANDING,
    todoistToken: undefined,
    haloSession: undefined,
    projects: [],
    acceptedTerms: false,
    isInitialized: false,
    loadingProjects: false,
  });

  return {
    subscribe,
    set,
    setAppState: (appState: AppState) => {
      if (!get(appStore).todoistToken && !get(appStore).acceptedTerms) {
        update((store) => ({
          ...store,
          appState: AppState.AGREEMENT,
        }));
      } else if (!get(appStore).todoistToken) {
        update((store) => ({
          ...store,
          appState: AppState.HALO_AUTH,
        }));
      }
      update((store) => ({ ...store, appState }));
      storage.setItem("local:haloist_page", appState);
    },
    setToken: (token: string | null | undefined) => {
      update((store) => ({ ...store, token }));
    },
    setProjects: (projects: Project[]) => {
      update((store) => ({ ...store, projects }));
    },
    setAcceptedTerms: (flag: boolean) => {
      update((store) => ({ ...store, acceptedTerms: true }));
      storage.setItem("local:accepted_terms", true);
    },
    fetchHaloSession: async () => {
      browser.runtime.onConnect.addListener(() => {
        browser.runtime.sendMessage({ type: "halo-session" }, (result) => {
          console.log(result);
        });
      });
    },
    fetchProjects: async () => {
      update((store) => ({ ...store, loadingProjects: true }));
      const response = await browser.runtime.sendMessage({
        type: "fetch-halo",
      });
      if (response && !response.error) {
        const userInfo = response as HaloValidateResponse;

      }
      else {
        console.log("Error in background.ts: ", response?.error);
      }
    },
    initialize: async () => {
      const lastPage = await storage.getItem<AppState>("local:haloist_page");
      const todoistToken = await storage.getItem<string>("local:todoist_token");
      const haloSession = await storage.getItem<HaloValidateResponse>(
        "local:halo_session"
      );

      const raw = await storage.getItem("local:accepted_terms");
      const acceptedTerms = raw === "true";

      update((store) => ({
        ...store,
        appState: lastPage ?? AppState.LANDING,
        todoistToken,
        haloSession,
        isInitialized: true,
        acceptedTerms,
      }));
    },
  };
}

export const appStore = createAppStore();
