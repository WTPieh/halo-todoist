<script lang="ts">
  let { title, description, subtitle}: { title: string, description: string, subtitle?: string } = $props();
</script>

<div class="flex flex-col gap-4">
<h1 class="text-2xl font-bold text-center leading-none">{title}</h1>
{#if subtitle}
  <p class="text-sm text-muted-foreground text-center leading-none">{subtitle}</p>
{/if}
<p class="text-center">{description}</p>
</div>