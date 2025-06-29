<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type WorkspaceProject, type PersonalProject } from '@doist/todoist-api-typescript';
	import { Import } from 'lucide-svelte';

	const { projects }: { projects: (PersonalProject | WorkspaceProject)[] } = $props();
	let projectCount = $derived(projects.length);

	// This will be replaced with actual selection logic later
	let hasSelection = $derived(projectCount > 0);
</script>

<div class="flex justify-between items-start">
	<p class="text-sm text-muted-foreground">Displaying results for {projectCount} projects</p>
	<div class="flex gap-2">
		<Button size="lg" variant="outline">Customize View</Button>
		<Button size="lg" disabled={!hasSelection}>
			<Import class="size-4 mr-2" /> Sync Assignments
		</Button>
	</div>
</div>
{#if !hasSelection}
	<p class="text-xs text-right text-muted-foreground">
		Must select at least one class and confirm a project
	</p>
{/if} 