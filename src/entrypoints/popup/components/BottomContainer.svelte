<script lang="ts">
  import clsx from "clsx";

  let { class: className, children }: { class?: string, children: any } = $props();
</script>

<section class={clsx("px-5 w-full border-t border-border pt-4 pb-5 max-h-20 h-full", className)}>
  {@render children()}
</section>