<script lang="ts">
  import {
    appStore,
    haloUser,
    isAppInitialized,
    todoistProjects,
  } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";
  import Actions from "./components/Actions.svelte";
  import ClassesTable from "./components/ClassesTable.svelte";
  import Controls from "./components/Controls.svelte";
  import Header from "./components/Header.svelte";
  import ProjectsTable from "./components/ProjectsTable.svelte";
  import InfoBar from "./components/InfoBar.svelte";
  import { toast } from "svelte-sonner";
  import Container from "../../components/shared/Container.svelte";
  import Footer from "../../components/shared/Footer.svelte";

  let searchTerm = "";
  let selectedProjectId: string | null = null;
  let selectedClasses: string[] = [];

  $: allProjects = $todoistProjects?.data || [];
  $: filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefetch = async () => {
    try {
      const response = await browser.runtime.sendMessage({
        type: "refetch-todoist-projects",
      });
      if (response?.error) {
        throw new Error(response.error);
      }
      toast.success("Successfully refreshed projects!");
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      toast.error(`Refresh Failed: ${errorMessage}`);
    }
  };

  const handleLogout = () => {
    appStore.setAppState(AppState.LANDING);
    browser.runtime.sendMessage({ type: "logout" });
  };
</script>

{#if $isAppInitialized}
  <Container>
    <div class="mx-5 mt-5 pb-2">
      <Header onLogout={handleLogout} />
    </div>
    <div class="border-b border-border">
    </div>
    <main class="flex-grow flex flex-col gap-3 px-5 pb-4 pt-2">
      <div class="flex flex-col gap-1">
        <InfoBar />
        <div class="flex flex-col gap-2">
          <Controls bind:searchTerm onRefetch={handleRefetch} />
          <div
            class="rounded-lg border flex-grow flex min-h-[259px] max-h-[259px] overflow-hidden h-full"
          >
            <ClassesTable bind:checkedValues={selectedClasses} />
            <ProjectsTable projects={filteredProjects} bind:selectedProjectId />
          </div>
        </div>
      </div>
      <Actions
        projects={filteredProjects}
        {selectedClasses}
        {selectedProjectId}
      />
    </main>
    <Footer />
  </Container>
{/if}
