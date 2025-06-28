<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Import } from 'lucide-svelte';
</script>

<div class="flex justify-between items-start">
	<p class="text-sm text-muted-foreground">Displaying results for 0 projects</p>
	<div class="flex gap-2">
		<Button size="lg" variant="outline">Customize View</Button>
		<Button size="lg"><Import class="size-4 mr-2" /> Sync Assignments</Button>
	</div>
</div>
<p class="text-xs text-right text-muted-foreground">
	Must select at least one class and confirm a project
</p> 