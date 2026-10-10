<script lang="ts">
  import { setAppModelContext } from "./app-context.ts";
  import { createAppModel } from "./model/app-model.svelte.ts";
  import EqSection from "./sections/eq-section.svelte";
  import OscillatorSection from "./sections/oscillator-section.svelte";
  import ReverbSection from "./sections/reverb-section.svelte";
  import AmplifierSection from "./sections/amplifier-section.svelte";
  import FilterSection from "./sections/filter-section.svelte";
  import TopBarControlSection from "./sections/top-bar-control-section.svelte";

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
      <div class="h-50px flex-ha bg-#f8f8f8 -mb-1 justify-between">
        <h1 class="text-#889 text-2xl pl-2">Radiant RS</h1>
        <TopBarControlSection />
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
