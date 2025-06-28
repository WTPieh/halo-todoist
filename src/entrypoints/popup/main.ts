import { mount } from "svelte";
import App from "./App.svelte";
import "@/assets/app.css";
import { AppState } from "@/lib/stores/path";

// let lastPage = await storage.getItem<AppState>("local:haloist_page");
// console.log("lastPage", lastPage);
// if (!lastPage) {
//   storage.setItem("local:haloist_page", AppState.LANDING);
// }

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
