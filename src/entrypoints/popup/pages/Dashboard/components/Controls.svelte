<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { LogOut, RefreshCcw, LoaderCircle } from 'lucide-svelte';
	import { todoistProjects } from '$lib/stores/app';

	export let onLogout: () => void;
	export let onRefetch: () => void;

	$: isLoading = $todoistProjects?.status === 'loading';
</script>

<div class="flex items-center justify-between">
	<Input placeholder="Search projects..." class="max-w-96" />
	<div class="flex gap-2">
		<Button variant="ghost" size="sm" onclick={onLogout}
			><LogOut class="size-4" /></Button
		>
		<Button variant="outline" size="sm" onclick={onRefetch} disabled={isLoading}>
			{#if isLoading}
				<LoaderCircle class="size-4 mr-2 animate-spin" />
				Refreshing...
			{:else}
				<RefreshCcw class="size-4 mr-2" />
				Refresh
			{/if}
		</Button>
	</div>
</div> 