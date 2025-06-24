<script lang="ts">
  import { onMount } from 'svelte';
  import { storage } from '#imports';
  import { toast } from 'svelte-sonner';
  import Toaster from '$lib/components/ui/sonner/sonner.svelte';

  import { Button } from '$lib/components/ui/button';
  import { handleTodoistAuth } from '$lib/auth';
  import { LogOut, Plus, RefreshCcw } from '@lucide/svelte';
  import { addProject, getProjects } from '@/lib/api';
  import TodoistItem from './components/TodoistItem.svelte';
  import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '$lib/components/ui/tooltip';
  import { GetProjectsResponse, PersonalProject, WorkspaceProject } from '@doist/todoist-api-typescript';
  import { writable } from 'svelte/store';
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
  import { Input } from '$lib/components/ui/input';
  import CreateProject from './components/CreateProject.svelte';

  let token = writable<string | null | undefined>(undefined);
  let isLoading = writable<boolean>(true);
  let projects = writable< ( PersonalProject | WorkspaceProject )[]>([]);

  let newProjectName = writable<string>('');

  onMount(async () => {
    token.set(await storage.getItem('local:todoist_token'));
    isLoading.set(false);
  });

  const handleLogin = async () => {
    try {
      await handleTodoistAuth();
      token.set(await storage.getItem('local:todoist_token'));

      toast.success('Successfully logged in with Todoist!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Login failed: ${message}`);
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await storage.removeItem('local:todoist_token');
    token.set(null);
    toast.info('You have been logged out.');
  };


  const fetchProjects = async () => {
    const promise = new Promise< GetProjectsResponse>(async (resolve, reject) => {
      try {
        const proj= await getProjects();
        resolve(proj);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: 'Fetching projects...',
      success: 'Projects fetched successfully',
      error: 'Failed to fetch projects',
    });
    const response = await promise;
    projects.set(response.results.filter(p => p.isArchived === false) as ( PersonalProject | WorkspaceProject )[]);
  };
</script>

<Toaster />

<main class="p-4 w-96 bg-background">
  {#if $isLoading}
    <p>Loading...</p>
  {:else if $token}
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4 mb-4">
        <h1 class="text-lg font-semibold text-center">Welcome to Todoist Halo Extension!</h1>
        <p class="text-muted-foreground text-center leading-0">You can now use the extension.</p>
      </div>
      <p>Please note that if you are on the free plan, you can only have 5 projects, so it is recommended you delete/archive a project to make room for the new one.</p>
      <p>You can also create a project by clicking the button below. You can also delete a project by clicking the trash icon.</p>
      <TooltipProvider>
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold">Projects</p>
          <Tooltip>
            <TooltipTrigger>
              <Button onclick={fetchProjects} variant="outline" class="size-6"><RefreshCcw class="size-4" /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh projects</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {#if $projects && $projects.length > 0}
          <div class="flex flex-col gap-2 max-h-[100px] overflow-y-auto border rounded-md p-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-muted-foreground/10">
            {#each $projects as project}
              <TodoistItem project={project} onDelete={() => {
                projects.set($projects.filter(p => p.id !== project.id));
              }} />
            {/each}
          </div>
        {:else}
          <p>No projects found. Please create a project to continue.</p>
        {/if}
      </TooltipProvider>
      <CreateProject onCreateProject={(newProject) => {
        projects.set([...$projects, newProject]);
      }} />
      <div class="flex gap-2">
        <Button onclick={handleLogout} class="w-full"><LogOut />Logout</Button>
      </div>
    </div>
  {:else}
    <div class="flex flex-col gap-4 items-center text-center">
      <h1 class="text-lg font-semibold">Welcome!</h1>
      <p class="text-sm text-muted-foreground">
        Please log in with your Todoist account to continue.
      </p>
      <Button onclick={handleLogin} class="w-full">Login with Todoist</Button>
    </div>
  {/if}
</main>