<script lang="ts">
	import { appStore } from "$lib/stores/app";
	import { Button } from "$lib/components/ui/button";
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from "$lib/components/ui/table";
	import { Plus, Trash } from "lucide-svelte";
</script>

<div class="w-1/2 border-l relative flex flex-col">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="px-2 text-sm"
						>Projects ({$appStore.projects.length}/5)</TableHead
					>
					<TableHead class="w-16 text-center"></TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="flex-grow overflow-y-auto">
		<Table>
			<TableBody>
				{#each $appStore.projects as project}
					<TableRow>
						<TableCell class="px-2 h-[44px] py-0"
							><p class="text-sm leading-tight">{project.name}</p></TableCell
						>
						<TableCell class="w-16 h-[44px] py-0 text-center">
							<Button variant="ghost" size="icon">
								<Trash />
							</Button>
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="absolute bottom-0 w-full p-2 bg-background/10 backdrop-blur-xs h-11">
		<Button size="sm" variant="secondary" class="w-full justify-center">
			<Plus class="size-4" />
			Add a Project
		</Button>
	</div>
</div> 