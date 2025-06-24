import { storage } from '#imports';
import { browser } from '#imports';

/**
 * Initiates the Todoist OAuth2 flow and securely stores the access token.
 */
export const handleTodoistAuth = async (): Promise<void> => {
  const firebaseAuthUrl = import.meta.env.VITE_FIREBASE_AUTH_URL;

  if (!firebaseAuthUrl) {
    throw new Error('VITE_FIREBASE_AUTH_URL is not defined. Please check your .env file.');
  }

  try {
    // Step 1: Create a random 'state' string for CSRF protection.
    const state = Math.random().toString(36).substring(2);

    // The Firebase function needs the extension's ID to construct the redirect URL.
    const extensionId = browser.runtime.id;

    // Step 2: Construct the URL to the Firebase auth handler.
    const authUrl = new URL("halo-todoist/us-central1/auth", firebaseAuthUrl);
    console.log('authUrl', authUrl);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('extension_id', extensionId);

    // Step 3: Launch the interactive web auth flow.
    const redirectUrl = await browser.identity.launchWebAuthFlow({
      url: authUrl.href,
      interactive: true,
    });

    if (!redirectUrl) {
      throw new Error('The authentication flow was cancelled.');
    }

    // Step 4: Parse the response from the URL fragment.
    const url = new URL(redirectUrl);
    const params = new URLSearchParams(url.hash.substring(1));

    const accessToken = params.get('access_token');
    const returnedState = params.get('state');
    const error = params.get('error');

    // Step 5: Security check.
    if (returnedState !== state) {
      throw new Error('Authentication failed due to state mismatch. Possible CSRF attack.');
    }

    if (error) {
      throw new Error(`Authentication failed: ${error}`);
    }

    if (!accessToken) {
      throw new Error('Authentication failed: No access token was returned.');
    }

    // Step 6: Success! Store the token securely.
    await storage.setItem('local:todoist_token', accessToken);
    console.log('Todoist authentication successful. Token stored.');
  } catch (error) {
    console.error('Error during Todoist authentication:', (error as Error).message);
    // Re-throw the error to be caught by the calling UI component
    throw error;
  }
}; 