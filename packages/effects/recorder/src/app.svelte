<script lang="ts">
  import { createAppModel } from "./model/app-model.svelte.ts";

  const appModel = createAppModel();

  const { states } = appModel;

  $effect(() => {
    return () => {
      appModel.cleanup();
    };
  });
</script>

{#if states.viewActive}
  <div class="h-dvh flex-c overflow-hidden">
    <div class="flex-v gap-3"></div>
  </div>
{/if}
