<script lang="ts">
	import { ChevronDown, Sun } from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<header class="flex items-center justify-between border-b border-border px-5 pt-5 pb-2">
	<div class="flex items-center gap-4">
		<Avatar>
			<AvatarImage src="https://github.com/WTPieh.png" alt="William Pieh" />
			<AvatarFallback>WP</AvatarFallback>
		</Avatar>
		<div>
			<div class="flex items-center gap-1">
				<p class="font-semibold">Hello, William</p>
				<ChevronDown class="size-4" />
			</div>
			<p class="text-sm text-muted-foreground">wtpieh@gmail.com</p>
		</div>
	</div>
	<h1 class="text-2xl font-bold">Haloist</h1>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Sun class="size-4 mr-2" />
			System
			<ChevronDown class="size-4 ml-2" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item>System</DropdownMenu.Item>
			<DropdownMenu.Item>Light</DropdownMenu.Item>
			<DropdownMenu.Item>Dark</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header> 