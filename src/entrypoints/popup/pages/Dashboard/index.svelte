<script lang="ts">
  import { toast } from "svelte-sonner";
  import Toaster from "$lib/components/ui/sonner/sonner.svelte";
  import Container from "../../components/shared/Container.svelte";
  import Footer from "../../components/shared/Footer.svelte";
  import Header from "./components/Header.svelte";
  import InfoBar from "./components/InfoBar.svelte";
  import Controls from "./components/Controls.svelte";
  import ClassesTable from "./components/ClassesTable.svelte";
  import ProjectsTable from "./components/ProjectsTable.svelte";
  import Actions from "./components/Actions.svelte";
  import { appStore, haloSession, todoistProjects } from "$lib/stores/app";

  const handleLogout = () => {
    appStore.logout();
    toast.info("You have been logged out.");
  };
</script>

<Toaster />

<Container>
  <Header />

  <!-- Main Content -->
  <main class="flex-grow flex flex-col gap-3 px-5 pb-4 pt-2">
    <div class="flex flex-col gap-1">
      <InfoBar />
      <div class="flex flex-col gap-2">
        <Controls
          onLogout={handleLogout}
          onRefetch={appStore.fetchTodoistProjects}
        />
        <!-- Tables -->
        <div
          class="rounded-lg border flex-grow flex max-h-[259px] overflow-hidden"
        >
          <ClassesTable />
          <ProjectsTable />
        </div>
      </div>
    </div>
    <Actions />
  </main>

  <!-- Footer -->
  <Footer />
</Container>
