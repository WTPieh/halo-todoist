import {
  getInformation,
  getUserOverview,
  AUTHORIZATION_KEY,
  CONTEXT_KEY,
} from "@/shared/halo";
import type { BackgroundState } from "@/shared/types";

export async function handleHaloFetchSession(
  getState: () => Promise<BackgroundState>,
  setState: (state: BackgroundState) => Promise<void>
): Promise<void> {
  let state = await getState();
  state.haloSession.status = "loading";
  state.haloUser.status = "loading";
  await setState(state); // Update UI to show loading state

  try {
    const sessionInfo = await getInformation();
    if ("userId" in sessionInfo) {
      state.haloSession.status = "success";
      state.haloSession.data = sessionInfo;
      state.haloSession.error = null;
      state.haloSession.lastUpdated = Date.now();

      // Now fetch the user overview
      const userOverview = await getUserOverview({
        cookie: {
          [AUTHORIZATION_KEY]: sessionInfo.TE1TX0FVVEg,
          [CONTEXT_KEY]: sessionInfo.TE1TX0NPTlRFWFQ,
        },
        uid: sessionInfo.userId,
      });

      if (userOverview) {
        state.haloUser.status = "success";
        state.haloUser.data = userOverview;
      } else {
        throw new Error("Failed to fetch user overview.");
      }
    } else {
      throw new Error("Invalid session info structure received.");
    }
  } catch (error) {
    console.error("Error fetching Halo session:", error);
    state.haloSession.status = "error";
    state.haloUser.status = "error";
    state.haloSession.data = null; // Clear stale data on error
    state.haloUser.data = null;
    state.haloSession.error =
      error instanceof Error ? error.message : "An unknown error occurred.";
  }
  await setState(state); // Final state update
}
