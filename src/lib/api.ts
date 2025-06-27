import { storage } from '#imports';

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
 * A helper function to get the auth token and create the required headers.
 * @returns {HeadersInit} The authorization headers.
 * @throws {Error} If the authentication token is not found.
 */
const getAuthHeaders = async (): Promise<HeadersInit> => {
	const token = (await storage.getItem('local:todoist_token')) as string;
	if (!token) throw new Error('Authentication token not found.');
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
};

const unwrapTodoistResponse = async <T>(response: Response): Promise<T> => {
	const data = await response.json();
	return data.results as T;
};

/**
 * Fetches all projects for the authenticated user via a direct v1 REST API call.
 */
export const getProjects = async (): Promise<Project[]> => {
	const headers = await getAuthHeaders();
	const response = await fetch('https://api.todoist.com/api/v1/projects', { headers });

	if (!response.ok) {
		throw new Error(`Failed to fetch projects: ${response.statusText}`);
	}

	return unwrapTodoistResponse<Project[]>(response);
};

/**
 * Adds a new project using a direct v1 REST API call.
 * @param projectName The name of the project to create.
 */
export const addProject = async (projectName: string): Promise<Project> => {
	const headers = await getAuthHeaders();
	const body = JSON.stringify({ name: projectName });

	const response = await fetch('https://api.todoist.com/api/v1/projects', {
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
 */
export const deleteProject = async (projectId: string): Promise<boolean> => {
	const headers = await getAuthHeaders();

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
 * @returns The JSON response from the Sync API.
 */
export const batchRequest = async (commands: BatchRequest) => {
	const token = (await storage.getItem('local:todoist_token')) as string;
	if (!token) throw new Error('Authentication token not found.');

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