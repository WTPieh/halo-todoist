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
	{#if $appStore.isInitialized}
		{#if $appStore.appState === AppState.LANDING}
			<div transition:fade class="absolute w-full h-full">
				<Landing />
			</div>
		{:else if $appStore.appState === AppState.INTRODUCTION}
			<div transition:fade class="absolute w-full h-full">
				<Introduction />
			</div>
		{:else if $appStore.appState === AppState.AGREEMENT}
			<div transition:fade class="absolute w-full h-full">
				<Agreement />
			</div>
		{:else if $appStore.appState === AppState.DASHBOARD}
			<div transition:fade class="absolute w-full h-full">
				<Dashboard />
			</div>
		{:else if $appStore.appState === AppState.HALO_AUTH}
			<div transition:fade class="absolute w-full h-full">
				<Halo />
			</div>
		{:else if $appStore.appState === AppState.TODOIST_AUTH}
			<div transition:fade class="absolute w-full h-full">
				<Todoist />
			</div>
		{:else if $appStore.appState === AppState.TODOIST_ERROR}
			<div transition:fade class="absolute w-full h-full">
				<TodoistError />
			</div>
		{:else if $appStore.appState === AppState.TODOIST_SUCCESS}
			<div transition:fade class="absolute w-full h-full">
				<TodoistSuccess />
			</div>
		{/if}
	{/if}
</main>
