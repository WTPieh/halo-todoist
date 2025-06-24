<script lang="ts">
  import { addProject } from "@/lib/api";
  import { toast } from "svelte-sonner";
  import type { PersonalProject, WorkspaceProject } from "@doist/todoist-api-typescript";
  import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover";
  import { Button } from "@/lib/components/ui/button";
  import { Loader2, Plus } from "@lucide/svelte";
  import { Input } from "@/lib/components/ui/input";

  const { onCreateProject }: { onCreateProject: (project: PersonalProject | WorkspaceProject) => void } = $props();

  let isCreating = $state(false);
  let newProjectName = $state('');
  let isOpen = $state(false);
  const handleCreateProject = async () => {
    try {
      isCreating = true;
      const promise = new Promise<PersonalProject | WorkspaceProject>(async (resolve, reject) => {
        try {
          const project = await addProject(newProjectName);
          resolve(project);
        } catch (error) {
          reject(error);
        }
      });
      toast.promise(promise, {
        loading: 'Creating project...',
        success: 'Project created',
        error: 'Failed to create project',
      });

      const project = await promise;
      onCreateProject(project);
      isCreating = false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Failed to create project: ${message}`);
      console.error(error);
    }
  };
</script>

<div class="flex gap-2">
    <Popover open={isOpen} onOpenChange={isOpen => isOpen = isOpen}>
    <PopoverTrigger>
      <Button><Plus />Create Project</Button>
    </PopoverTrigger>
    <PopoverContent class="flex flex-col gap-2 w-80">
        <h1 class="text-lg font-semibold">Create Project</h1>
        <p class="text-sm text-muted-foreground">Create a new project to organize your tasks.</p>
      <Input type="text" placeholder="Project name" bind:value={newProjectName} />
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => isOpen = false}>Cancel</Button>
      <Button onclick={handleCreateProject} disabled={isCreating || newProjectName.length === 0}>
        {#if isCreating}
          <Loader2 class="size-4 animate-spin" />
        {:else}
          <Plus class="size-4" />
        {/if}
        Create
      </Button>
      </div>
    </PopoverContent>
  </Popover>
  </div>