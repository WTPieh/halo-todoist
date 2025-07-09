<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Hash, X } from "lucide-svelte";
  export let checked: boolean = false;
  export let tags: string[] = [];
  export let title: string = "";
</script>

<div class="p-0 h-fit w-full overflow-hidden">
  {@render label(title, checked)}
  <div class="tags-container ml-6 flex w-full gap-2 overflow-x-auto overflow-y-visible pr-2 py-1">
    {#each tags as tag}
      <div
        role="button"
        tabindex="0"
        aria-label={tag}
        class="group flex w-fit items-center gap-1 rounded-md border bg-background px-2.5 py-1 text-sm text-nowrap transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-popover focus:outline-none"
      >
        <Hash class="h-3 w-3 text-muted-foreground" />
        <span class="text-sm leading-none">{tag}</span>
        <button
          class="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100"
          aria-label={`Remove ${tag} tag`}
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    {/each}
  </div>
</div>

{#snippet label(title: string, isChecked: boolean)}
  <div class="flex items-center gap-2">
    <Checkbox id={title} checked={isChecked} />
    <label for={title} class="font-medium">{title}</label>
  </div>
{/snippet}

<style>
	.tags-container::-webkit-scrollbar {
		height: 8px; /* Make scrollbar thinner */
	}
	.tags-container::-webkit-scrollbar-thumb {
		border-width: 2px; /* Reduce the "padding" around the thumb */
	}
</style>
