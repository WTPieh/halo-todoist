<script lang="ts">
  import { toast } from "svelte-sonner";
  import Button from "$lib/components/ui/button/button.svelte";
  import { appStore } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Content from "../../components/shared/Content.svelte";
  import Container from "../../components/shared/Container.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import { LoaderCircle, LogIn } from "lucide-svelte";
  import todoistLogo from "@/assets/todoist.png";

  let isLoading = writable(false);
  let error = writable<string | null>(null);

  const handleLogin = async () => {
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
      appStore.setAppState(AppState.TODOIST_SUCCESS);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      error.set(errorMessage);
      toast.error(`Authentication Failed: ${errorMessage}`);
      appStore.setAppState(AppState.TODOIST_ERROR);
    } finally {
      isLoading.set(false);
    }
  };
</script>

<Container>
  <Content>
    <Heading
      title="Excellent! You're nearly there."
      description="All that's left is to connect your Todoist account."
    />
    <div class="flex-grow flex flex-col items-center justify-center gap-4">
      <img src={todoistLogo} alt="Todoist Logo" class="size-16" />
      <Button size="lg" onclick={handleLogin} disabled={$isLoading}>
        {#if $isLoading}
          <LoaderCircle class="size-4 mr-2 animate-spin" />
          Authenticating...
        {:else}
          <LogIn class="size-4 mr-2" />
          Login with Todoist
        {/if}
      </Button>
      <p class="text-xs text-center text-muted-foreground max-w-60">
        We're requesting the right to view, create and update projects and tasks
        for you.
      </p>
      {#if $error}
        <p class="text-sm text-destructive text-center">Error: {$error}</p>
      {/if}
    </div>
  </Content>
  <BottomContainer class="flex justify-start">
    <PageIndex page={4} total={4} />
  </BottomContainer>
</Container>
