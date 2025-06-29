<script lang="ts">
	import { ChevronDown, Sun } from 'lucide-svelte';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import { haloUser, haloSession } from '$lib/stores/app';
	import { Separator } from '$lib/components/ui/separator';

	export let onLogout: () => void;

	$: user = $haloUser?.data?.userInfo;
	$: session = $haloSession?.data;

	$: initials =
		user?.firstName && user?.lastName
			? `${user.firstName[0]}${user.lastName[0]}`
			: "??";
</script>

<header class="flex items-center justify-between">
	{#if user && session}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-colors hover:bg-muted"
			>
				<Avatar class="size-10">
					<AvatarImage src={user.userImgUrl} alt={user.firstName} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div>
					<div class="flex items-center gap-1">
						<p>
							Hello, <span class="font-semibold">{user.preferredFirstName || user.firstName}</span>
						</p>
						<ChevronDown class="size-4" />
					</div>
					<p class="text-sm text-left text-muted-foreground">
						{session.user.email}
					</p>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="bottom" align="end">
				<DropdownMenu.Item onclick={() => window.open('https://discord.gg/your-server', '_blank')}>
					Discord
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => window.open('mailto:support@example.com')}>
					Support
				</DropdownMenu.Item>
				<Separator />
				<DropdownMenu.Item onclick={onLogout}>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<!-- Placeholder when user data is not yet available -->
		<div class="flex items-center gap-4 animate-pulse">
			<div class="size-10 rounded-full bg-muted"></div>
			<div>
				<div class="h-4 w-24 rounded-md bg-muted"></div>
				<div class="h-3 w-32 mt-1 rounded-md bg-muted"></div>
			</div>
		</div>
	{/if}
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