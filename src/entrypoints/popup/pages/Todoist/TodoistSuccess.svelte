<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowRight } from "lucide-svelte";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Content from "../../components/shared/Content.svelte";
  import successImage from "@/assets/success.png";
  import { AppState } from "@/lib/stores/path";
  import { appStore } from "@/lib/stores/app";
  const handleContinue = async () => {
    appStore.setAppState(AppState.DASHBOARD);
  };
</script>

<Container>
  <Content>
    <div class="flex flex-col items-center h-full text-center gap-4">
      <Heading
        title={`Congratulations! You've connected "To" doist!`}
        description="Now you can start syncing your classes."
      />
      <div class="flex flex-col items-center justify-center gap-4 p-5 h-full">
        <img src={successImage} alt="Success Illustration" class="h-48" />
        <Button onclick={handleContinue}>
          Continue <ArrowRight class="size-4" />
        </Button>
        <p class="text-xs text-muted-foreground max-w-60">
          All that's left is to import your classes, and select which project
          they'll fall under.
        </p>
      </div>
    </div>
  </Content>
  <BottomContainer class="flex justify-start">
    <p class="text-base font-bold">Completed</p>
  </BottomContainer>
</Container>
