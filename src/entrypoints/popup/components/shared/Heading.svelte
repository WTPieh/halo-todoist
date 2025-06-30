<script lang="ts">
  import clsx from "clsx";
  let { title, description, subtitle, descriptionClass}: { title: string, description: string, subtitle?: string, descriptionClass?: string } = $props();
</script>

<div class="flex flex-col gap-4">
<h1 class="text-2xl font-bold text-center leading-none">{title}</h1>
{#if subtitle}
  <p class="text-sm text-muted-foreground text-center leading-none">{subtitle}</p>
{/if}
<p class={clsx("text-center", descriptionClass)}>{description}</p>
</div>