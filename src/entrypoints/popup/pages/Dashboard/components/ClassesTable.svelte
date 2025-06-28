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

	// Later, this will be real data passed in as a prop.
	// export let classes: any[] = [];
</script>

<div class="w-1/2 flex flex-col">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="w-8 px-2"><Checkbox /></TableHead>
					<TableHead class="px-2">Classes (5)</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="overflow-y-auto">
		<Table>
			<TableBody>
				<!-- Placeholder Rows -->
				{#each Array(15) as _}
					<TableRow>
						<TableCell class="w-8 px-2 h-[44px] py-0"><Checkbox /></TableCell>
						<TableCell class="px-2 h-[44px] py-0">CST-221: Web Application Development</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div> 