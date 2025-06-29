<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { CircleHelp, LogOut, RefreshCcw } from 'lucide-svelte';

	export let onLogout: () => void;
	export let onRefetch: () => void;
</script>

<div class="flex items-center justify-between">
	<Input placeholder="Search projects..." class="max-w-96" />
	<div class="flex gap-2">
		<Button variant="ghost" size="sm" onclick={onLogout}
			><LogOut class="size-4" /></Button
		>
		<Button variant="outline" size="sm" onclick={onRefetch}
			><RefreshCcw class="size-4 mr-2" /> Refresh</Button
		>
	</div>
</div> 