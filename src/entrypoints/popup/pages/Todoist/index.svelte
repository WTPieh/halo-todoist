<script lang="ts">
  import { toast } from "svelte-sonner";
  import Button from "$lib/components/ui/button/button.svelte";
  import { writable } from "svelte/store";
  import Content from "../../components/shared/Content.svelte";
  import Container from "../../components/shared/Container.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import { LoaderCircle, LogIn } from "lucide-svelte";
  import todoistLogo from "@/assets/todoist.png";
  import { BackgroundMessage } from "@/shared/background-types";
  import { appState, todoistToken as t } from "@/lib/stores/app";
  import { AppState } from "@/lib/stores/path";

  let isLoading = writable(false);
  let error = writable<string | null>(null);

  const handleLogin = async () => {
    isLoading.set(true);
    error.set(null);
    await browser.runtime.sendMessage({
      type: BackgroundMessage.TODOIST_AUTH,
    });
  };

  $effect(() => {

    switch ($t?.status) {
      case "error":
        isLoading.set(false);
        error.set($t.error ?? "There was an unrecognized error.");
        toast.error($t.error ?? "There was an unrecognized error.");
        appState.set(AppState.TODOIST_ERROR);
        break;
      case "success":
        isLoading.set(false);
        toast.success("Successfully authenticated with Todoist!");
        appState.set(AppState.TODOIST_SUCCESS);
        break;
    }
  });
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
