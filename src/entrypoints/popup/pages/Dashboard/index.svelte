<script lang="ts">
  import { onMount } from "svelte";
  import { storage } from "#imports";
  import { toast } from "svelte-sonner";
  import Toaster from "$lib/components/ui/sonner/sonner.svelte";
  import Container from "../../components/shared/Container.svelte";
  import type { Project } from "$lib/api";
  import { writable } from "svelte/store";
  import { getProjects } from "$lib/api";
  import Footer from "../../components/shared/Footer.svelte";
  import Header from "./components/Header.svelte";
  import InfoBar from "./components/InfoBar.svelte";
  import Controls from "./components/Controls.svelte";
  import ClassesTable from "./components/ClassesTable.svelte";
  import ProjectsTable from "./components/ProjectsTable.svelte";
  import Actions from "./components/Actions.svelte";
  import { appStore } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";

  let isLoading = writable<boolean>(true);

  const handleLogout = async () => {
    await storage.removeItem("local:todoist_token");
    await storage.removeItem("local:haloist_page");
    appStore.setToken(null);
    appStore.setAppState(AppState.LANDING);
    toast.info("You have been logged out.");
  };

  const fetchProjects = async () => {
    const promise = new Promise<Project[]>(async (resolve, reject) => {
      try {
        const proj = await getProjects();
        resolve(proj);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Fetching projects...",
      success: "Projects fetched successfully",
      error: "Failed to fetch projects",
    });
    const response = await promise;
    appStore.setProjects(response);
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
        <Controls on:logout={handleLogout} on:refetch={fetchProjects} />
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
