<script lang="ts">
  import { appStore, haloSession } from "$lib/stores/app";
  import Button from "$lib/components/ui/button/button.svelte";
  import { CircleCheck, LoaderCircle, AlertTriangle } from "lucide-svelte";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Content from "../../components/shared/Content.svelte";
  import { AppState } from "@/lib/stores/path";

  const handleAuthentication = () => {
    appStore.fetchHaloSession();
  };

  const handleConfirm = () => {
    appStore.setAppState(AppState.TODOIST_AUTH);
  };

  const instructions = [
    {
      number: 1,
      description: `Navigate to <a href='https://halo.gcu.edu' target='_blank' class='text-primary underline'>https://halo.gcu.edu</a>.`,
    },
    {
      number: 2,
      description: "If not already logged in, log in to the Halo Portal.",
    },
    {
      number: 3,
      description:
        "Once logged in, return here and click 'Check Authentication'.",
    },
  ];

  $: status = $haloSession?.status ?? "idle";
</script>

<Container>
  <Content>
    <Heading
      title="Awesome! Let's get you authenticated."
      description="Please follow these instructions to connect your Halo account:"
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
    <div class="text-center">
      <Button size="lg" onclick={handleAuthentication} disabled={status === 'loading'}>
        {#if status === 'loading'}
          <LoaderCircle class="size-4 mr-2 animate-spin" />
          Checking...
        {:else}
          Check Authentication
        {/if}
      </Button>
    </div>
  </Content>
  <BottomContainer class="flex justify-between">
    <PageIndex page={3} total={4} />
    <div class="flex items-center gap-4">
      {#if status === 'success'}
        <span class="text-base font-semibold text-primary flex items-center gap-2">
          <CircleCheck class="size-5" /> Authenticated!
        </span>
        <Button onclick={handleConfirm}>Confirm</Button>
      {:else if status === 'error'}
        <span class="text-base font-semibold text-destructive flex items-center gap-2">
          <AlertTriangle class="size-5" /> Authentication Failed
        </span>
        <Button disabled>Confirm</Button>
      {:else}
        <span class="text-base font-semibold text-muted-foreground">
          Awaiting authentication...
        </span>
        <Button disabled>Confirm</Button>
      {/if}
    </div>
  </BottomContainer>
</Container>
