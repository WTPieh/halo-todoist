/**
 * Initiates the Todoist OAuth2 flow and securely stores the access token
 * by updating the main background state.
 */
export const handleTodoistAuth = async (): Promise<void> => {
  const firebaseAuthUrl = import.meta.env.VITE_FIREBASE_AUTH_URL;

  if (!firebaseAuthUrl) {
    throw new Error(
      "VITE_FIREBASE_AUTH_URL is not defined. Please check your .env file."
    );
  }

  try {
    const state = Math.random().toString(36).substring(2);
    const nonce = Math.random().toString(36).substring(2);
    const extensionId = browser.runtime.id;
    const authUrl = new URL("halo-todoist/us-central1/auth", firebaseAuthUrl);
    console.log(authUrl);
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("extension_id", extensionId);
    authUrl.searchParams.append("nonce", nonce);
    const redirectUrl = await browser.identity.launchWebAuthFlow({
      url: authUrl.href,
      interactive: true,
    });

    if (!redirectUrl) {
      throw new Error("The authentication flow was cancelled.");
    }

    const url = new URL(redirectUrl);
    const params = new URLSearchParams(url.hash.substring(1));
    const accessToken = params.get("access_token");
    const returnedState = params.get("state");
    const error = params.get("error");
    // const returnedNonce = params.get("nonce");

    // if (returnedNonce !== nonce) {
    //   throw new Error("Authentication failed due to nonce mismatch. Possible CSRF attack.");
    // }

    if (returnedState !== state) {
      throw new Error(
        "Authentication failed due to state mismatch. Possible CSRF attack."
      );
    }

    if (error) {
      throw new Error(`Authentication failed: ${error}`);
    }

    if (!accessToken) {
      throw new Error("Authentication failed: No access token was returned.");
    }

    // Success! Read the current state, add the token, and write it back.
    const currentState = (await storage.getItem("local:background-state")) || {};
    const newState = {
      ...currentState,
      todoistToken: accessToken,
    };
    await storage.setItem("local:background-state", newState);

    console.log("Todoist authentication successful. Token stored in background state.");
  } catch (error) {
    console.error(
      "Error during Todoist authentication:",
      (error as Error).message
    );
    throw error;
  }
}; 