<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type WorkspaceProject, type PersonalProject } from '@doist/todoist-api-typescript';
	import { Import } from 'lucide-svelte';

	const {
		projects,
		selectedClasses,
		selectedProjectId,
		onCustomizeClick,
	}: {
		projects: (PersonalProject | WorkspaceProject)[];
		selectedClasses: string[];
		selectedProjectId: string | null;
		onCustomizeClick?: () => void;
	} = $props();

	let projectCount = $derived(projects.length);
	let hasSelection = $derived(selectedClasses.length > 0 && selectedProjectId !== null);
</script>

<div class="flex flex-col gap-3">
<div class="flex justify-between items-start">
	<p class="text-sm text-muted-foreground">Displaying results for {projectCount} projects</p>
	<div class="flex gap-2">
		<Button onclick={onCustomizeClick} size="lg" variant="outline">Customize View</Button>
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

</div>