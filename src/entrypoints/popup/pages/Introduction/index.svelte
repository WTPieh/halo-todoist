<script lang="ts">
  import Button from "@/lib/components/ui/button/button.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import { ArrowRight } from "lucide-svelte";
  import { appStore } from "$lib/stores/app";
  import { AppState } from "$lib/stores/path";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import Container from "../../components/shared/Container.svelte";
  import Content from "../../components/shared/Content.svelte";

  const handleProceed = async () => {
    appStore.setAppState(AppState.AGREEMENT);
  };
  const handleBack = async () => {
    appStore.setAppState(AppState.LANDING);
  }
</script>

<Container>
  <Content>
    <Heading
      title="How does Haloist work?"
      description="In order to start syncing your classes with Todoist, we first need to establish what this extension does with your information."
    />
    <div
      class="flex w-full h-full overflow-auto bg-muted rounded-xl p-4 flex-col gap-2"
    >
      <h2 class="text-lg font-semibold">Introduction</h2>
      <p>
        For your understanding, this is precisely what we do with your class
        information.
        <br /><br />
        When you authenticate with GCU's Halo Portal, you agree to allow us to fetch
        your classes on your behalf. You can then select which classes you'd like
        to sync.<br /><br />

        In Todoist, tasks work in two main formats: a list view or a board view.
        The display doesn't affect functionality, but for this extension, we're
        assuming board view as the default.<br /><br />

        Board view works well as a Kanban-style layout, where you can drag tasks
        between sections like "To Do," "In Progress," and "Done." This makes it
        easier to track an assignment's status over time. On the other hand,
        list view is great for organizing tasks under a shared category like
        "Week 3 Assignments" or "Quizzes." You can achieve this look by
        filtering on the tags we'll create for each week.
        <br /><br />
        You can check out our privacy policy here to see exactly what we do (or don't)
        store. Your choices are saved so that future classes can be synced the same
        way—no need to start over each time. And whenever you need to sync new ones,
        just open the extension again. It's that simple.
      </p>
    </div>
  </Content>
  <BottomContainer class="flex justify-between">
    <PageIndex page={1} total={4} />
    <div class="flex gap-2">
      <Button onclick={handleBack} variant="outline">Back</Button>
    <Button onclick={handleProceed}>Proceed <ArrowRight /></Button>
    </div>
  </BottomContainer>
</Container>
