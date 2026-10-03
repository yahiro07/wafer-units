<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    label: string;
    children: Snippet;
  };
  const { label, children }: Props = $props();
</script>

<div class="flex-vc gap-0px">
  <div class="h-50px flex-c">
    {@render children()}
  </div>
  <div class="text-13px text-#347 w-0px flex-c">
    {label}
  </div>
</div>
