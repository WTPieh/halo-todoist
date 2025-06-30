<script lang="ts">
	import { cn } from '$lib/utils';

	let { className, children } : { className?: string, children?: any} = $props();
</script>

<section class={cn('flex flex-col gap-4 px-5 pb-4 pt-5 max-h-130 h-full', className)}>
  {@render children?.()}
</section>
