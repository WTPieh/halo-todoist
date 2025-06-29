<script lang="ts">
  import { appStore } from "$lib/stores/app";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowRight, CircleCheck } from "lucide-svelte";
  import { writable } from "svelte/store";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Content from "../../components/shared/Content.svelte";
  import { AppState } from "@/lib/stores/path";

  let isAuthenticated = writable(false);

  const handleConfirm = async () => {
    appStore.setAppState(AppState.TODOIST_AUTH);
  };

  onMount(async () => {
    await appStore.fetchProjects();
  });

  const instructions = [
    {
      number: 1,
      description: `Navigate to <a href='https://halo.gcu.edu' target='_blank' class='text-primary underline'>https://halo.gcu.edu</a>.`
    },
    { number: 2, description: 'If not already logged in, log in to the Halo Portal.' },
    {
      number: 3,
      description:
        'Once logged in, reopen this Chrome Extension, and it should automatically authenticate you. The Confirm button should be active.'
    }
  ];
</script>

<Container>
  <Content>
    <Heading
      title="Awesome! Let's authenticate you."
      description="In order to utilize this application, please follow these instructions:"
    />
    <div class="flex flex-col gap-8 justify-center flex-grow p-4 rounded-lg">
      {#each instructions as item}
        <div class="flex items-center gap-6">
          <div
            class="flex items-center justify-center size-16 bg-secondary rounded-full"
          >
            <span class="text-4xl font-semibold text-secondary-foreground"
              >{item.number}</span
            >
          </div>
          <p class="text-xl">{@html item.description}</p>
        </div>
      {/each}
    </div>
  </Content>
  <BottomContainer class="flex justify-between">
    <PageIndex page={3} total={4} />
    <div class="flex items-center gap-4">
      <span class="text-base font-semibold">Authenticated!</span>
      <Button onclick={handleConfirm}>
        <CircleCheck class="size-4" /> Confirm
      </Button>
    </div>
  </BottomContainer>
</Container>
