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
	export let checkedValues: string[] = [];

	// --- Check All Logic ---

	// 1. Is every item checked? (True only if lists are not empty and have same length)
	$: allChecked =
		classes.length > 0 && classes.length === checkedValues.length;

	// 2. Are some (but not all) items checked? This is the indeterminate state.
	$: indeterminate = checkedValues.length > 0 && !allChecked;

	function handleCheckAllChange() {
		checkedValues = allChecked ? [] : classes.map((c) => c.id);
	}

	function handleCheckChange(id: string, checked: boolean) {
		if (checked) {
			checkedValues = [...checkedValues, id];
		} else {
			checkedValues = checkedValues.filter((val) => val !== id);
		}
	}
</script>

<div class="w-1/2 flex flex-col h-full">
	<div>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead
						class="w-8 px-2 cursor-pointer"
						role="button"
						tabindex={0}
						onclick={handleCheckAllChange}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleCheckAllChange();
							}
						}}
					>
						<Checkbox
							checked={allChecked}
							{indeterminate}
							class="pointer-events-none"
						/>
					</TableHead>
					<TableHead class="px-2 text-muted-foreground text-sm">Classes ({classes.length})</TableHead>
				</TableRow>
			</TableHeader>
		</Table>
	</div>
	<div class="overflow-y-auto flex-grow">
		<Table>
			<TableBody>
				{#if classes.length > 0}
					{#each classes as course}
						<TableRow
							class="cursor-pointer"
							role="button"
							tabindex={0}
							onclick={() =>
								handleCheckChange(
									course.id,
									!checkedValues.includes(course.id)
								)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handleCheckChange(
										course.id,
										!checkedValues.includes(course.id)
									);
								}
							}}
						>
							<TableCell class="w-8 px-2 h-[44px] py-0">
								<Checkbox
									id={`class-${course.id}`}
									checked={checkedValues.includes(course.id)}
									class="pointer-events-none"
								/>
							</TableCell>
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