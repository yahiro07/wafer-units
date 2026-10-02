<script lang="ts">
  import { setAppModelContext } from "./app-context.ts";
  import { createAppModel } from "./app-model.svelte.ts";
  import OscillatorSection from "./oscillator-section.svelte";

  const appModel = createAppModel();
  setAppModelContext(appModel);

  const { states } = appModel;

  $effect(() => {
    return () => {
      appModel.cleanup();
    };
  });
</script>

{#if states.viewActive}
  <div class="h-dvh flex-c overflow-hidden">
    <div class="flex-ha gap-4">
      <OscillatorSection oscId="osc1" />
      <OscillatorSection oscId="osc2" />
      <OscillatorSection oscId="osc3" />
    </div>
  </div>
{/if}
