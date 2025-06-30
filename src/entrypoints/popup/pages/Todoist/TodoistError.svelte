<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { LoaderCircle, LogIn } from "lucide-svelte";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Content from "../../components/shared/Content.svelte";
  import errorImage from "@/assets/error.png";
  import { AppState } from "$lib/stores/path";
  import { appState } from "$lib/stores/app";
  import { writable } from "svelte/store";
  import { toast } from "svelte-sonner";
  //   import { appStore } from '$lib/stores/app';
  //   import { AppState } from '@/lib/stores/path';

  const isLoading = writable(false);
  const error = writable<string | null>(null);

  const handleTryAgain = async () => {
    isLoading.set(true);
    error.set(null);
    try {
      const response = await browser.runtime.sendMessage({
        type: "todoist-auth",
      });
      if (response?.error) {
        throw new Error(response.error);
      }
      toast.success("Successfully authenticated with Todoist!");
      appState.set(AppState.TODOIST_SUCCESS);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      error.set(errorMessage);
      toast.error(`Authentication Failed: ${errorMessage}`);
    } finally {
      isLoading.set(false);
    }
  };
</script>

<section>
  <Content className="min-h-130">
    <div class="flex flex-col items-center h-full text-center gap-4">
      <Heading
        title="Oops! We hit a snag"
        description="Looks like there was a problem authenticating with Todoist. That could mean a couple of things, but go ahead and try again."
        descriptionClass="text-center max-w-118"
      />
      <div class="flex flex-col items-center justify-center gap-4 p-5 h-full">
        <img src={errorImage} alt="Error Illustration" class="h-48" />
        <Button onclick={handleTryAgain} disabled={$isLoading}>
          {#if $isLoading}
            <LoaderCircle class="size-4 mr-2 animate-spin" />
            Authenticating...
          {:else}
            <LogIn class="size-4" />
            Try Again
          {/if}
        </Button>
        <p class="text-xs text-muted-foreground max-w-60">
          If the issue persists, email me at
          <a href="mailto:william@piehsoft.com" class="underline"
            >william@piehsoft.com</a
          >
        </p>
      </div>
    </div>
  </Content>
  <BottomContainer class="flex justify-start h-full">
    <PageIndex page={4} total={4} />
  </BottomContainer>
</section>
