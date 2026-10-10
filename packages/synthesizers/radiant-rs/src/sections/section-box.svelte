<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    headerLabel?: string;
    headerContent?: Snippet;
    children: Snippet;
  };
  const { headerLabel, headerContent, children }: Props = $props();
</script>

<div class="flex-vc">
  <div class="w-full h-40px bg-#fff">
    {#if headerLabel}
      <div class="h-full flex-ha pl-2 text-#36f">
        {headerLabel}
      </div>
    {:else}
      {@render headerContent?.()}
    {/if}
  </div>
  <div class="flex-ha bg-#e4e4e4">
    {@render children()}
  </div>
</div>
