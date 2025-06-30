<script lang="ts">
    import BottomContainer from "../BottomContainer.svelte";
    import Button from '@/lib/components/ui/button/button.svelte';
    import { HandHeart } from '@lucide/svelte';
    import github from '@/assets/github-icon.svg';
    import discord from "@/assets/discord-icon.svg";

    const legalLinks = [
        { href: 'https://piehsoft.com/privacy', text: 'Privacy Policy' },
        { href: 'https://piehsoft.com/terms', text: 'Terms of Service' },
        { href: 'https://piehsoft.com', text: 'Website' }
    ];

    const info = [
      "© 2025",
      "William Pieh",
      "v1.0.0"
    ];
</script>

<BottomContainer >
    <ul class="flex w-full items-start justify-between">
      <li class="flex flex-col items-center gap-2">
        {#each info as item}
          <p class="text-xs text-muted-foreground leading-none">{item}</p>
        {/each}
      </li>
      <li class="flex flex-col items-center gap-2">
        <div class="flex flex-col gap-2">
        <a href="https://github.com/WTPieh/halo-todoist-extension" target="_blank">
          <img src={github} alt="GitHub" class="size-4" />
        </a>
        <a href="https://discord.com" target="_blank">
          <img src={discord} alt="Discord" class="size-4" />
        </a>
        </div>
      </li>
      <li class="flex flex-col items-center gap-2">
        <p class="leading-none text-xs text-muted-foreground text-center">Having trouble?</p>
        <a href="mailto:william@piehsoft.com" class="leading-none text-muted-foreground underline text-xs">william@piehsoft.com</a>
      </li>
      <li>
        <div class="flex flex-col items-center gap-2 align-top">
          {#each legalLinks as link}
            <a href={link.href} target="_blank" class="leading-none text-muted-foreground underline text-xs">{link.text}</a>
          {/each}
        </div>
      </li>
      <li class="flex flex-col items-center gap-2">
        <p class="leading-none text-xs text-muted-foreground">Help keep this free</p>
        <Button variant="outline" size="sm" class="leading-none">
          <HandHeart class="size-4" /> Donate
        </Button>
      </li>
    </ul>
</BottomContainer>