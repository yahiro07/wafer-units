<script lang="ts">
  import { setAppModelContext } from "./app-context.ts";
  import { createAppModel } from "./app-model.svelte.ts";
  import EqSection from "./eq-section.svelte";
  import OscillatorSection from "./oscillator-section.svelte";
  import ReverbSection from "./reverb-section.svelte";
  import AmplifierSection from "./amplifier-section.svelte";
  import FilterSection from "./filter-section.svelte";

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
    <div class="flex-v gap-3">
      <div class="h-50px flex-ha bg-#c0c0c8 -mb-1">
        <h1 class="text-#fff text-2xl pl-2">Radiant RS</h1>
      </div>
      <div class="flex-ha gap-3">
        <OscillatorSection oscId="osc1" />
        <OscillatorSection oscId="osc2" />
        <OscillatorSection oscId="osc3" />
      </div>
      <div class="flex-ha gap-3 justify-end">
        <FilterSection />
        <AmplifierSection />
        <EqSection />
        <ReverbSection />
      </div>
    </div>
  </div>
{/if}
