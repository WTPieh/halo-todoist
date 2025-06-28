import { writable } from "svelte/store";
import { AppState } from "./path";
import { Project } from "$lib/api";

type AppStore = {
	appState: AppState;
	token: string | null | undefined;
	projects: Project[];
	isInitialized: boolean;
};

function createAppStore() {
	const { subscribe, update, set } = writable<AppStore>({
		appState: AppState.LANDING,
		token: undefined,
		projects: [],
		isInitialized: false,
	});

	return {
		subscribe,
		set,
		setAppState: (appState: AppState) => {
			update((store) => ({ ...store, appState }));
			storage.setItem("local:haloist_page", appState);
		},
		setToken: (token: string | null | undefined) => {
			update((store) => ({ ...store, token }));
		},
		setProjects: (projects: Project[]) => {
			update((store) => ({ ...store, projects }));
		},
		initialize: async () => {
			const lastPage = (await storage.getItem(
				"local:haloist_page",
			)) as unknown as AppState;
			const token = (await storage.getItem(
				"local:todoist_token",
			)) as unknown as string;
			update((store) => ({
				...store,
				appState: lastPage ? lastPage : AppState.LANDING,
				token: token,
				isInitialized: true,
			}));
		},
	};
}

export const appStore = createAppStore(); 