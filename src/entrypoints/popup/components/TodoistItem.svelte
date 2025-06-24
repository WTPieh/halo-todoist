<script lang="ts">
import { Button } from "@components/button";
import { Trash, Archive, ArchiveRestore, Loader2 } from "@lucide/svelte";
import type { PersonalProject, WorkspaceProject } from "@doist/todoist-api-typescript";
import { deleteProject } from "@/lib/api";
import { toast } from 'svelte-sonner';
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '$lib/components/ui/tooltip';

const { project, onDelete }: {project: (PersonalProject | WorkspaceProject), onDelete: () => void } = $props();

let popoverOpen = $state(false);
let isDeleting = $state(false);

const handleDeleteProject = async () => {
	try {
		isDeleting = true;
		await deleteProject(project.id);
		popoverOpen = false;
		toast.success(`Project "${project.name}" deleted.`);
		onDelete();
	} catch (error) {
		const message = error instanceof Error ? error.message : 'An unknown error occurred.';
		toast.error(`Failed to delete project: ${message}`);
	}
};
</script>

<div class="flex items-center justify-between gap-2 rounded-md border px-2 hover:bg-muted-foreground/10">
    <p class="text-sm font-semibold">{project.name}</p>
    <div class="flex gap-2">
        <Tooltip>
            <TooltipTrigger>
                <Popover open={popoverOpen} onOpenChange={() => popoverOpen = !popoverOpen}>
                    <PopoverTrigger>
                        <Button variant="ghost" size="icon" aria-label="Delete project">
                            <Trash class="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" sideOffset={4} class="flex flex-col gap-2 bg-popover text-popover-foreground p-4 w-64">
                        <h3 class="text-sm font-semibold">Delete Project</h3>
                        <p class="text-sm">Are you sure you want to delete this project? <br /><span class="font-bold text-destructive">This action cannot be undone.</span></p>
                        <div class="flex gap-4">
                            <Button variant="outline" size="sm" onclick={() => popoverOpen = false}>Cancel</Button>
                            <Button variant="destructive" size="sm" onclick={handleDeleteProject}>
                                {#if isDeleting}
                                    <Loader2 class="size-4 animate-spin" />
                                {:else}
                                    <Trash class="size-4" />
                                {/if}
                                Delete
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>Delete Project</p>
            </TooltipContent>
        </Tooltip>
    </div>
</div>

