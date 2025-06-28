<script lang="ts">
  import logo from "@/assets/logo.png";
  import Button from "@/lib/components/ui/button/button.svelte";
  import Footer from "../../components/shared/Footer.svelte";
  import Content from "../../components/shared/Content.svelte";
  import Header from "./Header.svelte";
  import { appStore } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";
  import Container from "../../components/shared/Container.svelte";

  const handleSyncClick = async () => {
    appStore.setAppState(AppState.INTRODUCTION);
  };
</script>

<Container>
  <Content class="h-full">
    <div class="flex flex-col items-center justify-center space-y-4">
      <h1 class="text-2xl font-bold">Welcome to</h1>
      <div class="flex flex-col items-center justify-center space-y-2">
        <img src={logo} alt="Todoist Halo" class="size-36" />
        <p class="text-sm text-muted-foreground">By William Pieh</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center space-y-8">
      <Header />
      <div
        class="flex max-w-112 flex-col items-center justify-center space-y-2"
      >
        <p class="text-center font-medium">
          Ready to turn your class list into a task list?
        </p>
        <Button size="lg" onclick={handleSyncClick} class="px-8"
          >Let's get Syncing!</Button
        >
      </div>
    </div>
  </Content>
  <Footer />
</Container>
