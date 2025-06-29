<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { haloUser } from '$lib/stores/app';

	$: classes = $haloUser?.data?.classes?.courseClasses ?? [];
</script>

<div class="w-1/2 flex flex-col h-full">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="w-8 px-2"><Checkbox /></TableHead>
					<TableHead class="px-2">Classes ({classes.length})</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="overflow-y-auto flex-grow">
		<Table>
			<TableBody>
				{#if classes.length > 0}
					{#each classes as course}
						<TableRow>
							<TableCell class="w-8 px-2 h-[44px] py-0"><Checkbox /></TableCell>
							<TableCell class="px-2 h-[44px] py-0">{course.name}</TableCell>
						</TableRow>
					{/each}
				{:else}
					<div
						class="w-full h-full flex items-center justify-center text-sm text-muted-foreground"
					>
						No classes found.
					</div>
				{/if}
			</TableBody>
		</Table>
	</div>
</div> 