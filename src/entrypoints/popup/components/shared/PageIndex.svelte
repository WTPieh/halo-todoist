<script lang="ts">
let { page, total }: { page: number, total: number } = $props();
</script>

<p class="text-muted-foreground">
  Page <span class="font-bold text-foreground">{page}</span> of {total}
</p>