<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";
  import Container from "../../components/shared/Container.svelte";
  import BottomContainer from "../../components/BottomContainer.svelte";
  import PageIndex from "../../components/shared/PageIndex.svelte";
  import Heading from "../../components/shared/Heading.svelte";
  import { AppState } from "@/lib/stores/path";
  import Content from "../../components/shared/Content.svelte";
  import { appStore, acceptedTerms } from "$lib/stores/app";

  let lastUpdated = "Last updated: June 27, 2025";

  const handleProceed = () => {
    appStore.setAcceptedTerms();
    appStore.setAppState(AppState.HALO_AUTH);
  };

  const handleBack = () => {
    appStore.setAppState(AppState.INTRODUCTION);
  };
</script>

<Container>
  <Content>
    <Heading
      title="Terms and Conditions"
      description="Please read the following terms and conditions carefully."
      subtitle={lastUpdated}
    />
    <div class="flex-grow space-y-6 overflow-y-auto pr-2 bg-muted rounded-lg p-4">
      <section>
        <h2 class="text-lg font-semibold mb-2">Preamble</h2>
        <p class="text-sm text-muted-foreground">
          This Agreement ("Agreement") constitutes a legally binding agreement
          made between you, whether personally or on behalf of an entity (“you”)
          and Haloist Extension ("we," "us," or "our"), concerning your access
          to and use of the Haloist browser extension (the "Service"). You agree
          that by accessing the Service, you have read, understood, and agreed
          to be bound by all of these Terms and Conditions.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">1. Service Provision</h2>
        <p class="text-sm text-muted-foreground">
          The Service provides a tool to synchronize academic assignments from
          the GCU Halo platform to a user's Todoist account. We grant you a
          non-exclusive, non-transferable, revocable license to use the Service
          for your personal, non-commercial use, strictly in accordance with
          these terms.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">2. User Accounts and Data</h2>
        <p class="text-sm text-muted-foreground">
          The Service uses OAuth 2.0 to authenticate with Todoist. We do not
          store your password. We only store the authentication token provided
          by Todoist to make API requests on your behalf. By using the Service,
          you grant us permission to access your GCU Halo assignments and to
          create, read, and modify projects and tasks in your Todoist account.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">3. User Responsibilities</h2>
        <ul
          class="list-disc list-inside space-y-1 text-sm text-muted-foreground"
        >
          <li>
            You are responsible for maintaining the security of your accounts.
          </li>
          <li>
            You must not use the Service for any illegal or unauthorized
            purpose.
          </li>
          <li>
            You agree to comply with all applicable laws, rules, and
            regulations.
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">4. Disclaimers</h2>
        <p class="text-sm text-muted-foreground">
          The Service is provided on an "as-is" and "as-available" basis. We
          disclaim all warranties, express or implied, including the implied
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">5. Limitation of Liability</h2>
        <p class="text-sm text-muted-foreground">
          In no event will we or our directors, employees, or agents be liable
          to you or any third party for any direct, indirect, consequential,
          exemplary, incidental, special, or punitive damages, including lost
          profit, lost revenue, or loss of data arising from your use of the
          service.
        </p>
      </section>
      <div class="flex items-center space-x-2 pt-4 border-t border-border">
        <Checkbox id="terms" bind:checked={$acceptedTerms} class="bg-background" />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
        >
          I have read and agree to the terms of service.
        </label>
      </div>
    </div>
  </Content>
  <BottomContainer class="flex justify-between">
    <PageIndex page={2} total={4} />
    <div class="flex items-start space-x-2">
      <Button variant="outline" onclick={handleBack}>
        Back
      </Button>
      <Button disabled={!$acceptedTerms} onclick={handleProceed}>
        Proceed <ArrowRight class="size-4" />
      </Button>
    </div>
  </BottomContainer>
</Container>
