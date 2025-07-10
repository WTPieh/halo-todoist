<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { CircleHelp, Hash, X } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
  import CheckboxGroup from './components/CheckboxGroup.svelte';
  import LayoutCard from './components/LayoutCard.svelte';
  import boardImageLight from '@/assets/board-image-light.png';
  import boardImageDark from '@/assets/board-image-dark.png';
  import listImageLight from '@/assets/list-image-light.png';
  import listImageDark from '@/assets/list-image-dark.png';
  import { mode, theme} from "mode-watcher"
  import { Button } from '$lib/components/ui/button';

	const { isOpen, onClose } = $props<{
		isOpen: boolean;
		onClose: () => void;
	}>();

    let isDarkMode = $state(false);
    let boardImage = $derived(isDarkMode ? boardImageDark : boardImageLight);
    let listImage = $derived(isDarkMode ? listImageDark : listImageLight);

    $effect(() => {
        isDarkMode = mode.current === 'dark';
    });

	let layout: 'list' | 'board' = $state('list');
	let groupBy = $state({
		week: true,
		class: true,
		topic: false,
		assignmentType: false
	});

	const groupingOptions = [
		{
			key: 'week' as const,
			label: 'By Week',
			tags: ['Week 1', 'Week 2', 'Week 3']
		},
		{
			key: 'class' as const,
			label: 'By Class',
			tags: ['CST-221', 'CST-305', 'CST-451']
		},
		{
			key: 'topic' as const,
			label: 'By Topic',
			tags: ['Topic 1', 'Topic 2', 'Topic 3']
		},
		{
			key: 'assignmentType' as const,
			label: 'By Assignment Type',
			tags: ['DQ', 'Assignment', 'Exam']
		}
	];

	let dialogElement: HTMLDivElement | null = $state(null);

	const handleClose = () => {
		onClose();
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Tab' && dialogElement) {
			const focusableElements = dialogElement.querySelectorAll(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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

	const handleGlobalKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			handleClose();
		}
	};

	$effect(() => {
		if (isOpen) {
			window.addEventListener('keydown', handleGlobalKeydown);
			tick().then(() => {
				dialogElement?.focus();
			});

			// This cleanup function runs when isOpen becomes false or the component unmounts
			return () => {
				window.removeEventListener('keydown', handleGlobalKeydown);
			};
		}
	});

    const cardInfo = {
        list: {
            label: "List",
            description: "Organize tasks in a simple vertical format — great for quick to-dos and linear workflows."
        },
        board: {
            label: "Board",
            description: "Visualize tasks in columns by status, perfect for tracking progress through stages."
        }
    }
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
		onclick={handleClose}
		role="presentation"
	>
		<div
			bind:this={dialogElement}
			tabindex="-1"
			class="relative min-w-[602px] max-w-[642px] min-h-[521px] max-h-[561px] w-fit rounded-xl border bg-popover p-5 shadow-lg h-fit"
			role="dialog"
			aria-labelledby="customize-view-title"
			aria-modal="true"
			transition:fly={{ y: 20, duration: 300 }}
			onclick={(event) => event.stopPropagation()}
			onkeydown={handleKeydown}
		>
			<button
				class="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground transition-all hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-popover"
				onclick={handleClose}
				aria-label="Close"
			>
				<X class="h-6 w-6" />
			</button>
			<div class="flex flex-col gap-4">
				<div class="text-center">
					<h2 id="customize-view-title" class="text-xl font-bold leading-tight">Customize View</h2>
				</div>

				<div class="space-y-3">
					<div class="flex items-center justify-between h-fit">
						<h3 class="text-lg font-semibold leading-none">Layout Options</h3>
						<Button variant="ghost" size="icon" class="p-1 text-muted-foreground hover:text-foreground size-4">
							<CircleHelp class="h-4 w-4" />
						</Button>
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <LayoutCard description={cardInfo.list.description} onSelected={() => layout = 'list'} image={listImage} title={cardInfo.list.label} selected={layout === 'list'} />
                        <LayoutCard description={cardInfo.board.description} onSelected={() => layout = 'board'} image={boardImage} title={cardInfo.board.label} selected={layout === 'board'} />
					</div>
				</div>

				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold leading-none">Autogenerated Labels</h3>
						<Button variant="ghost" size="icon" class="text-muted-foreground hover:text-foreground size-4">
							<CircleHelp class="h-4 w-4" />
						</Button>
					</div>
					<div class="grid grid-cols-2 gap-x-4 gap-y-1">
						{#each groupingOptions as group (group.key)}
                            <CheckboxGroup title={group.label} tags={group.tags} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}