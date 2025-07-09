import { storage } from '#imports';
import { GetProjectsResponse, PersonalProject, WorkspaceProject, TodoistApi } from '@doist/todoist-api-typescript';



// Based on the Todoist REST API v1 documentation for a project object.
export interface Project {
	id: string;
	name: string;
	color: string;
	parent_id: string | null;
	order: number;
	comment_count: number;
	is_shared: boolean;
	is_favorite: boolean;
	is_inbox_project: boolean;
	is_team_inbox: boolean;
	url: string;
	view_style: string;
}

/**
 * A helper function to create the required headers from a token.
 * @param {string} token The Todoist authentication token.
 * @returns {HeadersInit} The authorization headers.
 * @throws {Error} If the token is not provided.
 */
const getAuthHeaders = (token: string): HeadersInit => {
	if (!token) throw new Error("Authentication token not provided.");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

const unwrapTodoistResponse = async <T>(response: Response): Promise<T> => {
	const data = await response.json();
	return data.results as T;
};

/**
 * Fetches all projects for the authenticated user via a direct v1 REST API call.
 * @param {string} token The user's Todoist authentication token.
 */
export const getProjects = async (token: string): Promise<(PersonalProject | WorkspaceProject)[]> => {
	const api = new TodoistApi(token);
	const projects = await api.getProjects();

	return projects.results;
};

/**
 * Adds a new project using a direct v1 REST API call.
 * @param projectName The name of the project to create.
 * @param {string} token The user's Todoist authentication token.
 */
export const addProject = async (
	projectName: string,
	token: string
): Promise<Project> => {
	const headers = getAuthHeaders(token);
	const body = JSON.stringify({ name: projectName });

	const response = await fetch("https://api.todoist.com/api/v1/projects", {
		method: 'POST',
		headers,
		body,
	});

	if (!response.ok) {
		throw new Error(`Failed to add project: ${response.statusText}`);
	}

	return response.json();
};

/**
 * Deletes a project using a direct v1 REST API call.
 * @param projectId The ID of the project to delete.
 * @param {string} token The user's Todoist authentication token.
 */
export const deleteProject = async (
	projectId: string,
	token: string
): Promise<boolean> => {
	const headers = getAuthHeaders(token);

	const response = await fetch(`https://api.todoist.com/api/v1/projects/${projectId}`, {
		method: 'DELETE',
		headers,
	});

	if (!response.ok) {
		throw new Error(`Failed to delete project: ${response.statusText}`);
	}

	// A 204 No Content response means success.
	return response.status === 204;
};

// --- TODOIST SYNC API ---

// Define types for the Sync API commands based on Todoist documentation
export interface Command {
	type: string;
	temp_id: string;
	uuid: string;
	args: Record<string, any>; // Args can be any object, e.g., { name: 'New Project' }
}

export type BatchRequest = Command[];

/**
 * Sends a batch of commands to the Todoist Sync API.
 * @param commands An array of commands to execute.
 * @param {string} token The user's Todoist authentication token.
 */
export const batchRequest = async (commands: BatchRequest, token: string) => {
	if (!token) throw new Error("Authentication token not found.");

	const payload = {
		commands: JSON.stringify(commands),
	};
	const data = new URLSearchParams(payload);

	const response = await fetch('https://api.todoist.com/api/v1/sync', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Bearer ${token}`,
		},
		body: data,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Sync API request failed: ${response.status} ${errorText}`);
	}

	return response.json();
};