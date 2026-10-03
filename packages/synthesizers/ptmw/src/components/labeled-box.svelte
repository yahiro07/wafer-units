<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    label: string;
    content: Snippet;
  };
  const { label, content }: Props = $props();
</script>

<div class="flex-vc gap-0px">
  <div class="h-50px flex-c">
    {@render content()}
  </div>
  <div class="text-13px text-#347 w-0px flex-c">
    {label}
  </div>
</div>
