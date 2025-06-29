import { getHaloUserInfo, getInformation } from "@/shared/halo";

export default defineBackground(() => {
  console.log("Background script loaded");
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message.type == "fetch-halo") {
      (async () => {
        try {
          const userInfo = await getInformation();
          sendResponse(userInfo);
        } catch (error) {
          console.error("Error fetching Halo information:", error);
          // Optionally send an error response
          sendResponse({ error: "Failed to fetch user info" });
        }
      })();
      return true; // Keep the message channel open for the async response
    }
  });
});
