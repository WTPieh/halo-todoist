<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { RefreshCcw, LoaderCircle, CircleQuestionMark } from 'lucide-svelte';
	import { todoistProjects } from '$lib/stores/app';

	export let onRefetch: () => void;
	export let searchTerm: string;

	$: isLoading = $todoistProjects?.status === 'loading';
</script>

<div class="flex items-center justify-between">
	<Input placeholder="Search projects..." class="max-w-96" bind:value={searchTerm} />
	<div class="flex gap-2">
		<Button variant="ghost" size="sm" 
			><CircleQuestionMark class="size-4" /></Button
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