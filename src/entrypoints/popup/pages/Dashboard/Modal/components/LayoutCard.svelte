<script lang="ts">
  import Badge from "@/lib/components/ui/badge/badge.svelte";
  import { Circle } from "lucide-svelte";
  export let selected: boolean = false;
  export let onSelected: () => void;
  export let description: string = "";
  export let image: string = "";
  export let title: string = "";
</script>

<button
  class="rounded-lg border p-5 text-left transition-all w-fit h-fit flex flex-col items-start gap-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-popover"
  class:border-primary={selected}
  class:shadow-lg={selected}
  class:bg-card={selected}
  class:bg-popover={!selected}
  onclick={onSelected}
>
  <div class="flex flex-col gap-3">
    <div class="flex items-center w-full h-[22px]">
      <div class="flex items-center gap-2">
        <Circle class={`size-2 ${selected ? 'fill-foreground' : ''}`} />
        <div class="text-base font-semibold leading-none">{title}</div>
      </div>
      {#if selected}
        <div class="flex w-full justify-end">
          <Badge>Active</Badge>
        </div>
      {/if}
    </div>
    <p class="text-xs text-muted-foreground max-w-[249px] leading-none">{description}</p>
  </div>
  <img
    src={image}
    alt={title}
    class="min-w-[249px] min-h-[165px] object-cover rounded-lg border border-border"
  />
</button>
