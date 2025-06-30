<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from "$lib/components/ui/table";
	import { Plus, Trash } from "lucide-svelte";
	import type {
		PersonalProject,
		WorkspaceProject,
	} from "@doist/todoist-api-typescript";
	import { cn } from "$lib/utils";

	export let projects: (PersonalProject | WorkspaceProject)[] = [];
	export let selectedProjectId: string | null = null;

	function handleSelectProject(projectId: string) {
		selectedProjectId = selectedProjectId === projectId ? null : projectId;
	}
</script>

<div class="w-1/2 border-l flex flex-col h-full">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="px-2 text-sm text-muted-foreground"
						>Projects ({projects.length}/5)</TableHead
					>
					<TableHead class="w-16 text-center"></TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="flex-grow overflow-y-auto">
		<Table>
			<TableBody>
				{#if projects.length > 0}
					{#each projects as project}
						<TableRow
							class={cn(
								"cursor-pointer",
								selectedProjectId === project.id && "bg-primary/50 hover:bg-muted"
							)}
							onclick={() => handleSelectProject(project.id)}
							onkeydown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									handleSelectProject(project.id);
								}
							}}
							tabindex={0}
						>
							<TableCell class="px-2 h-[44px] py-0">
								<p class="text-sm leading-tight">{project.name}</p>
							</TableCell>
						<TableCell class="w-16 h-[44px] py-0 text-center">
								<Button
									variant="ghost"
									size="icon"
									class="hover:bg-destructive/20 hover:text-destructive"
									onclick={(event) => event.stopPropagation()}
								>
								<Trash />
							</Button>
						</TableCell>
					</TableRow>
				{/each}
				{:else}
					<div
						class="w-full h-full flex items-center justify-center text-sm text-muted-foreground text-center p-4"
					>
						No projects found.
					</div>
				{/if}
			</TableBody>
		</Table>
	</div>
	<div class="p-2 border-t">
		<Button size="sm" variant="secondary" class="w-full justify-center">
			<Plus class="size-4" />
			Add a Project
		</Button>
	</div>
</div> 