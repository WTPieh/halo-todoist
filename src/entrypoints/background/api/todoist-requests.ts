import { handleTodoistAuth } from "@/lib/auth";
import { getProjects, getUserPlan } from "@/lib/api";
import type { BackgroundState } from "@/shared/types";

export async function handleTodoistAuthRequest(
  getState: () => Promise<BackgroundState>,
  setState: (state: BackgroundState) => Promise<void>
): Promise<void> {
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
      error instanceof Error ? error.message : "An unknown error occurred.";
  }
  await setState(state);
}

export async function handleFetchProjects(
  getState: () => Promise<BackgroundState>,
  setState: (state: BackgroundState) => Promise<void>
): Promise<void> {
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
      error instanceof Error ? error.message : "An unknown error occurred.";
  }
  await setState(state);
}

export async function handleFetchUserPlan(
  getState: () => Promise<BackgroundState>,
  setState: (state: BackgroundState) => Promise<void>
): Promise<void> {
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
}
