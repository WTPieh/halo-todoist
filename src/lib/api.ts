import { TodoistApi, PersonalProject, WorkspaceProject, GetProjectsResponse } from '@doist/todoist-api-typescript';
import { storage } from '#imports';
import axios from 'axios';
import { keysToCamel } from './utils';

/**
 * Creates and returns an authenticated Todoist API instance.
 * This helper remains for methods that use the TodoistApi class directly.
 * @throws {Error} If the authentication token is not found.
 */
const getApiInstance = async () => {
	const token = (await storage.getItem('local:todoist_token')) as string;

	if (!token) {
		throw new Error('Authentication token not found. Please log in.');
	}

	return new TodoistApi(token);
};

/**
 * Fetches all projects for the authenticated user via a direct v1 REST API call.
 */
export const getProjects = async (): Promise<GetProjectsResponse> => {
	const token = (await storage.getItem('local:todoist_token')) as string;
	if (!token) throw new Error('Authentication token not found.');

	const response = await axios.get('https://api.todoist.com/api/v1/projects', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status !== 200) {
		throw new Error(`Failed to fetch projects: ${response.status}`);
	}
	return keysToCamel(response.data) as GetProjectsResponse;
};

/**
 * Adds a new project using the TodoistApi library.
 * @param projectName The name of the project to create.
 */
export const addProject = async (projectName: string) => {
	const api = await getApiInstance();
	return api.addProject({ name: projectName });
};

export const deleteProject = async (projectId: string) => {
	const api = await getApiInstance();
	return api.deleteProject(projectId);
};