<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogIn } from 'lucide-svelte';
	import Container from '../../components/shared/Container.svelte';
	import BottomContainer from '../../components/BottomContainer.svelte';
	import PageIndex from '../../components/shared/PageIndex.svelte';
	import Heading from '../../components/shared/Heading.svelte';
	import Content from '../../components/shared/Content.svelte';
	import errorImage from '@/assets/error.png';
//   import { appStore } from '$lib/stores/app';
//   import { AppState } from '@/lib/stores/path';
    
    const handleTryAgain = async () => {
		// appStore.setAppState(AppState.)
    }
</script>

<section>
	<Content>
		<div class="flex flex-col items-center h-full text-center gap-4">
			<Heading
				title="Oops! We hit a snag"
				description="Looks like there was a problem authenticating with Todoist. That could mean a couple of things, but go ahead and try again."
			/>
			<div
				class="flex flex-col items-center justify-center gap-4 p-5 h-full"
			>
				<img src={errorImage} alt="Error Illustration" class="h-48" />
				<Button onclick={handleTryAgain}>
					<LogIn class="size-4" />
					Try Again
				</Button>
				<p class="text-xs text-muted-foreground max-w-60">
					If the issue persists, email me at
					<a href="mailto:william@piehsoft.com" class="underline">william@piehsoft.com</a>
				</p>
			</div>
		</div>
	</Content>
	<BottomContainer class="flex justify-start">
		<PageIndex page={4} total={4} />
	</BottomContainer>
</section>