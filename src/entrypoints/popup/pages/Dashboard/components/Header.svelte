<script lang="ts">
  import { Sun, Moon, ChevronDown } from "lucide-svelte";
  import { setMode, mode, systemPrefersMode } from "mode-watcher";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { haloUser, haloSession } from "$lib/stores/app";
  import { Separator } from "$lib/components/ui/separator";
  import { buttonVariants } from "$lib/components/ui/button";

  const { onLogout } = $props<{ onLogout: () => void }>();

  let user = $derived($haloUser?.data?.userInfo);
  let session = $derived($haloSession?.data);
  let selectedMode = $derived(mode.current);
  let displayMode = $derived(
    selectedMode?.substring(0)?.charAt(0)?.toUpperCase() +
      "" +
      selectedMode?.substring(0).slice(1)
  );

  let initials = $derived(
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "??"
  );
</script>

<header class="flex items-center justify-between">
  {#if user && session}
    <div class="flex items-center gap-4">
      <Avatar class="size-10">
        <AvatarImage src={user.userImgUrl} alt={user.firstName} />
        <AvatarFallback class="bg-primary">{initials}</AvatarFallback>
      </Avatar>
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center gap-1">
          <p class="leading-none">
            Hello, <span class="font-semibold leading-none"
              >{user.preferredFirstName || user.firstName}</span
            >
          </p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              class="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-muted"
            >
              <ChevronDown class="size-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="bottom" align="end">
              <DropdownMenu.Item
                onclick={() =>
                  window.open(
                    "https://github.com/w-pieh/halo-todoist-extension/issues",
                    "_blank"
                  )}
              >
                Report Issue
              </DropdownMenu.Item>
              <Separator />
              <DropdownMenu.Item onclick={onLogout}>Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <p class="text-left text-sm text-muted-foreground">
          {session.user.email}
        </p>
      </div>
    </div>
  {:else}
    <!-- Placeholder when user data is not yet available -->
    <div class="flex items-center gap-4 animate-pulse">
      j:
      <div class="size-10 rounded-full bg-muted"></div>
      <div>
        <div class="h-4 w-24 rounded-md bg-muted"></div>
        <div class="mt-1 h-3 w-32 rounded-md bg-muted"></div>
      </div>
    </div>
  {/if}
  <h1 class="text-2xl font-bold">Haloist</h1>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
      {#if displayMode.charAt(0) == "D"}
        <Moon />
        {displayMode}
      {:else if displayMode.charAt(0) == "L"}
        <Sun />
        {displayMode}
      {/if}
      <ChevronDown class="size-4 ml-2" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item onSelect={() => setMode("system")}
        >System</DropdownMenu.Item
      >
      <DropdownMenu.Item onSelect={() => setMode("light")}
        >Light</DropdownMenu.Item
      >
      <DropdownMenu.Item onSelect={() => setMode("dark")}
        >Dark</DropdownMenu.Item
      >
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>
