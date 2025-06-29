<script lang="ts">
	import { todoistProjects } from "$lib/stores/app";
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

	$: projects = $todoistProjects?.data ?? [];
</script>

<div class="w-1/2 border-l relative flex flex-col">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="px-2 text-sm">Projects ({projects.length}/5)</TableHead>
					<TableHead class="w-16 text-center"></TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="flex-grow overflow-y-auto">
		<Table>
			<TableBody>
				{#if projects.length > 0}
					{#each projects as project}
						<TableRow>
							<TableCell class="px-2 h-[44px] py-0">
								<p class="text-sm leading-tight">{project.name}</p>
							</TableCell>
							<TableCell class="w-16 h-[44px] py-0 text-center">
								<Button variant="ghost" size="icon">
									<Trash />
								</Button>
							</TableCell>
						</TableRow>
					{/each}
				{:else}
					<TableRow>
						<TableCell colspan={2} class="h-24 text-center">
							No projects found. Try refetching or create one.
						</TableCell>
					</TableRow>
				{/if}
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