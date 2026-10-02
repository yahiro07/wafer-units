<script lang="ts">
  import { createAppModel } from "./app-model.svelte.ts";
  import type { OscParameterKey } from "./core/definitions";
  import type { OscId } from "./core/definitions";
  import OscillatorSection from "./oscillator-section.svelte";

  const appModel = createAppModel();

  function bindOscParameterSetter(oscId: OscId) {
    return (key: OscParameterKey, value: number) => {
      appModel.setOscParameter(oscId, key, value);
    };
  }
  const { states } = appModel;
  const parameters = states.parameters;
  const parameterSetters = {
    osc1: bindOscParameterSetter("osc1"),
    osc2: bindOscParameterSetter("osc2"),
  };

  $effect(() => {
    return () => {
      appModel.cleanup();
    };
  });
</script>

{#if states.viewActive}
  <div class="h-dvh flex-c overflow-hidden">
    <div class="flex-ha gap-4">
      <OscillatorSection
        parameters={parameters.osc1}
        setParameter={parameterSetters.osc1}
      />
      <OscillatorSection
        parameters={parameters.osc2}
        setParameter={parameterSetters.osc2}
      />
      <OscillatorSection
        parameters={parameters.osc2}
        setParameter={parameterSetters.osc2}
      />
    </div>
  </div>
{/if}
