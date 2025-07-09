<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Hash, X } from 'lucide-svelte';

	const {
		checked = false,
		tags = [],
		title = ''
	} = $props<{
		checked?: boolean;
		tags?: string[];
		title?: string;
	}>();

	let containerEl: HTMLDivElement;
	let scrollState = $state<'start' | 'middle' | 'end' | 'none'>('none');

	const handleFocus = (event: FocusEvent) => {
		const target = event.currentTarget as HTMLElement;
		target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	};

	const updateScrollState = () => {
		if (!containerEl) return;

		const { scrollWidth, clientWidth, scrollLeft } = containerEl;

		if (scrollWidth <= clientWidth) {
			scrollState = 'none';
			return;
		}

		if (scrollLeft <= 0) {
			scrollState = 'start';
		} else if (scrollLeft + clientWidth >= scrollWidth - 1) {
			scrollState = 'end';
		} else {
			scrollState = 'middle';
		}
	};

	$effect(() => {
		if (!containerEl) return;
		// Initial check
		updateScrollState();

		containerEl.addEventListener('scroll', updateScrollState);
		window.addEventListener('resize', updateScrollState);

		// This cleanup function runs when the component is unmounted
		return () => {
			containerEl.removeEventListener('scroll', updateScrollState);
			window.removeEventListener('resize', updateScrollState);
		};
	});
</script>

<div class="px-1 h-fit w-full overflow-hidden">
	{@render label(title, checked)}
	<div class="ml-6">
		<div
			bind:this={containerEl}
			class="tags-container flex w-full gap-2 overflow-x-auto overflow-y-visible pr-2 py-0.5"
			class:fade-right={scrollState === 'start' || scrollState === 'middle'}
			class:fade-left={scrollState === 'end' || scrollState === 'middle'}
		>
			{#each tags as tag}
				<div
					role="button"
					tabindex="0"
					aria-label={tag}
					class="group flex w-fit shrink-0 items-center gap-1 rounded-md border bg-background px-2.5 py-1 text-sm text-nowrap transition-all scroll-m-2 focus-within:bg-card focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 focus-within:ring-offset-popover focus:outline-none"
					onfocus={handleFocus}
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
</div>

{#snippet label(title: string, isChecked: boolean)}
	<div class="flex items-center gap-2">
		<Checkbox id={title} checked={isChecked} />
		<label for={title} class="font-medium">{title}</label>
	</div>
{/snippet}

<style>
	.tags-container.fade-right {
		-webkit-mask-image: linear-gradient(to right, black calc(100% - 24px), transparent);
		mask-image: linear-gradient(to right, black calc(100% - 24px), transparent);
	}
	.tags-container.fade-left {
		-webkit-mask-image: linear-gradient(to left, black calc(100% - 24px), transparent);
		mask-image: linear-gradient(to left, black calc(100% - 24px), transparent);
	}
	.tags-container.fade-left.fade-right {
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 24px,
			black calc(100% - 24px),
			transparent
		);
		mask-image: linear-gradient(
			to right,
			transparent,
			black 24px,
			black calc(100% - 24px),
			transparent
		);
	}

	.tags-container::-webkit-scrollbar {
		height: 4px; /* Make scrollbar thinner */
	}
	.tags-container::-webkit-scrollbar-thumb {
		border-width: 0.5px; /* Reduce the "padding" around the thumb */
	}
</style>
