<script lang="ts">
	import { Toaster } from "$lib/components/ui/sonner";
	import { appStore } from "$lib/stores/app";
	import { AppState } from "$lib/stores/path";
	import { onMount } from "svelte";
	import Agreement from "./pages/Agreement/index.svelte";
	import Dashboard from "./pages/Dashboard/index.svelte";
	import Halo from "./pages/Halo/index.svelte";
	import Introduction from "./pages/Introduction/index.svelte";
	import Landing from "./pages/Landing/index.svelte";
	import Todoist from "./pages/Todoist/index.svelte";
	import TodoistError from "./pages/Todoist/TodoistError.svelte";
	import TodoistSuccess from "./pages/Todoist/TodoistSuccess.svelte";
	import { fade } from "svelte/transition";

	onMount(async () => {
		await appStore.initialize();
	});
</script>

<Toaster />
<main class="w-full h-full bg-background text-foreground relative">
	{#if $appStore.appState === AppState.LANDING}
		<div>
			<Landing />
		</div>
	{:else if $appStore.appState === AppState.INTRODUCTION}
		<div transition:fade>
			<Introduction />
		</div>
	{:else if $appStore.appState === AppState.AGREEMENT}
		<div transition:fade>
			<Agreement />
		</div>
	{:else if $appStore.appState === AppState.DASHBOARD}
		<div transition:fade>
			<Dashboard />
		</div>
	{:else if $appStore.appState === AppState.HALO_AUTH}
		<div transition:fade>
			<Halo />
		</div>
	{:else if $appStore.appState === AppState.TODOIST_AUTH}
		<div transition:fade>
			<Todoist />
		</div>
	{:else if $appStore.appState === AppState.TODOIST_ERROR}
		<div transition:fade>
			<TodoistError />
		</div>
	{:else if $appStore.appState === AppState.TODOIST_SUCCESS}
		<div transition:fade>
			<TodoistSuccess />
		</div>
	{/if}
</main>
