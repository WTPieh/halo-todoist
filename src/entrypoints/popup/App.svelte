<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
  import { appState, isAppInitialized } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";
  import Agreement from "./pages/Agreement/index.svelte";
  import Dashboard from "./pages/Dashboard/index.svelte";
  import Halo from "./pages/Halo/index.svelte";
  import Introduction from "./pages/Introduction/index.svelte";
  import Landing from "./pages/Landing/index.svelte";
  import Todoist from "./pages/Todoist/index.svelte";
  import TodoistError from "./pages/Todoist/TodoistError.svelte";
  import TodoistSuccess from "./pages/Todoist/TodoistSuccess.svelte";
  import { fade } from "svelte/transition";
</script>

<ModeWatcher />
<Toaster />
<main class="w-full h-full bg-background text-foreground relative">
  {#if $isAppInitialized}
      <div transition:fade={{ duration: 200 }} class="absolute w-full h-full">
        {#if $appState === AppState.LANDING}
          <Landing />
        {:else if $appState === AppState.INTRODUCTION}
          <Introduction />
        {:else if $appState === AppState.AGREEMENT}
          <Agreement />
        {:else if $appState === AppState.DASHBOARD}
          <Dashboard />
        {:else if $appState === AppState.HALO_AUTH}
          <Halo />
        {:else if $appState === AppState.TODOIST_AUTH}
          <Todoist />
        {:else if $appState === AppState.TODOIST_ERROR}
          <TodoistError />
        {:else if $appState === AppState.TODOIST_SUCCESS}
          <TodoistSuccess />
        {/if}
      </div>
  {:else}
    <!-- You can add a loading spinner here if you want -->
    <div class="w-full h-full flex items-center justify-center">
      <!-- Loading... -->
    </div>
  {/if}
</main>
