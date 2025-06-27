<script>
  import logo from "@/assets/logo.png";
  import Button from "@/lib/components/ui/button/button.svelte";
  import github from "@/assets/github-icon.svg";
  import { HandHeart } from "lucide-svelte";
</script>

<section class="flex flex-col items-center w-full h-full">
  <section class="flex flex-col w-full gap-4 justify-center items-center flex-grow">
    <div class="flex flex-col items-center justify-center space-y-4">
      <h1 class="text-2xl font-bold">Welcome to</h1>
      <div class="flex flex-col items-center justify-center space-y-2">
        <img src={logo} alt="Todoist Halo" class="size-36" />
        <p class="text-sm">By William Pieh</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2 max-w-112">
      <h2 class="text-2xl font-semibold">Classes in. Chaos Out.</h2>
      <p class="text-center">
        Haloist grabs your assignments from GCU Halo and drops them into
        Todoist—automatically. No copy-paste. No guesswork. No tabs. Just your
        week, mapped.
      </p>
    </div>
    <div class="flex flex-col items-center justify-center space-y-2 max-w-112">
      <p class="text-center font-medium">
        Ready to turn your class list into a task list?
      </p>
      <Button>Let's get Syncing!</Button>
    </div>
  </section>
  <section class="px-5 w-full border-t border-border pt-4 pb-5">
    <ul class="flex justify-between w-full">
      <li class="flex flex-col items-center gap-2">
        <p class="text-sm text-muted-foreground leading-none">© 2025</p>
        <p class="text-sm text-muted-foreground leading-none">William Pieh</p>
        <p class="text-sm text-muted-foreground leading-none">v1.0.0</p>
      </li>
      <li class="flex flex-col items-center gap-2">
        <a href="https://github.com/WTPieh/halo-todoist-extension" target="_blank">
          <img src={github} alt="GitHub" class="size-4" />
        </a>
      </li>
      <li class="flex flex-col items-center gap-2">
        <p class="leading-none text-xs text-muted-foreground">Having trouble?</p>
        <a href="mailto:william@piehsoft.com" class="leading-none text-muted-foreground underline text-xs">william@piehsoft.com</a>
      </li>
      <li>
        <ul class="flex flex-col items-center gap-2">
          <li class="leading-none">
            <a href="https://piehsoft.com/privacy" target="_blank" class="leading-none text-muted-foreground underline text-xs">Privacy Policy</a>
          </li>
          <li class="leading-none">
            <a href="https://piehsoft.com/terms" target="_blank" class="leading-none text-muted-foreground underline text-xs">Terms of Service</a>
          </li>
          <li class="leading-none">
            <a href="https://piehsoft.com" target="_blank" class="leading-none text-muted-foreground underline text-xs">Website</a>
          </li>
        </ul>
      </li>
      <li class="flex flex-col items-center gap-2">
        <p class="leading-none text-xs text-muted-foreground">Help keep this free</p>
        <Button variant="outline" size="sm" class="leading-none">
          <HandHeart class="size-4" /> Donate
        </Button>
      </li>
    </ul>
  </section>
</section>
