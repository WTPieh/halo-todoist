<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { LogIn } from "lucide-svelte";
  import { writable } from "svelte/store";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Content from "../../components/shared/Content.svelte";
  import todoistLogo from "@/assets/todoist.png";
  import { AppState } from "@/lib/stores/path";
  import { appStore } from "$lib/stores/app";

  let isAuthenticated = writable(false);
  const handleTodoistLogin = async () => {
    let value = Math.random();
    if (value >= 0.5) appStore.setAppState(AppState.TODOIST_ERROR);
    else appStore.setAppState(AppState.TODOIST_SUCCESS);
  };
</script>

<Container>
  <Content>
    <div
      class="flex flex-col items-center justify-start h-full text-center gap-4"
    >
      <Heading
        title="Excellent! You're nearly there."
        description="All that's left is to connect your Todoist account."
      />
      <div class="flex flex-col items-center justify-center gap-4 p-5 h-full">
        <img src={todoistLogo} alt="Todoist Logo" class="size-16" />
        <Button onclick={handleTodoistLogin}>
          <LogIn class="size-4" />
          Login to Todoist
        </Button>
        <p class="text-xs text-muted-foreground max-w-60">
          We're requesting the right to view, create and update projects and
          tasks for you.
        </p>
      </div>
    </div>
  </Content>
  <BottomContainer class="flex justify-start">
    <PageIndex page={4} total={4} />
  </BottomContainer>
</Container>
