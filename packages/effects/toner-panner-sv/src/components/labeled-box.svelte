<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    label?: string;
    children: Snippet;
  };
  const { label, children }: Props = $props();
</script>

<div class="flex-vc">
  <div class="h-55px flex-c">
    {@render children()}
  </div>
  <div class="text-lg text-#333 w-0 flex-c">
    {label}
  </div>
</div>
