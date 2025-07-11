<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { X, Plus, Loader2 } from "lucide-svelte";
  import { sineIn } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { appState, backgroundState } from "@/lib/stores/app";

  let {
    onCreate,
    onClose,
    isOpen,
    projectCount = 0,
    maxProjects = 5,
  } = $props<{
    onCreate: (data: { name: string }) => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
    projectCount?: number;
    maxProjects?: number;
  }>();

  let name = $state("");
  let isCreating = $state(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    isCreating = true;
    try {
      await onCreate({ name: name.trim() });
      name = ""; // Reset on success
    } catch (error) {
      console.error("Failed to create project:", error);
      // The parent handles the toast notification
    } finally {
      isCreating = false;
    }
  };

  let dialogElement: HTMLDivElement;

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Tab" && dialogElement) {
      const focusableElements = dialogElement.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };

</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
    onclick={onClose}
    role="presentation"
  >
    <div
      bind:this={dialogElement}
      tabindex="-1"
      role="dialog"
      aria-labelledby="add-project-title"
      aria-modal="true"
      onclick={(event) => event.stopPropagation()}
      onkeydown={handleKeydown}
      class="relative w-fit rounded-xl border bg-popover p-5 shadow-lg h-fit gap-4 flex flex-col"
      transition:fly={{ duration: 150, y: 10, easing: sineIn }}
    >
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-foreground">Add Project</h1>
        <Button variant="ghost" size="icon" onclick={onClose} class="size-7">
          <X class="size-5" />
          <span class="sr-only">Close</span>
        </Button>
      </div>

      <!-- Project Counter & Input -->
      <div class="flex flex-col gap-2">
        <p class="text-xs text-muted-foreground">
          <span class="text-foreground font-medium">{projectCount}</span>
          <span class="text-muted-foreground">/{maxProjects} free projects</span
          >
        </p>
        <div class="flex flex-col gap-1.5">
          <Label for="project-name" class="sr-only">Project Name</Label>
          <Input
            bind:value={name}
            class="w-96"
            id="project-name"
            placeholder="Enter project name..."
          />
        </div>
      </div>

      <!-- Create Button -->
      <Button
      variant="secondary"
        onclick={handleSubmit}
        disabled={isCreating || !name.trim()}
        class="w-full"
      >
        {#if isCreating}
          <Loader2 class="animate-spin -ml-1 mr-3 size-5" />
          <span>Creating...</span>
        {:else}
          <Plus class="size-4 mr-2" />
          <span>Add Project</span>
        {/if}
      </Button>
    </div>
  </div>
{/if}
