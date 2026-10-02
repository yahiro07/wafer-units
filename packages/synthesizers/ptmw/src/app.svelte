<script lang="ts">
  import { createAppModel } from "./app-model.svelte.ts";
  import type { OscParameterKey } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import type { OscId } from "./core/definitions";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";

  const appModel = createAppModel();

  function bindOscParameterSetter(oscId: OscId) {
    return (key: OscParameterKey, value: number) => {
      appModel.setOscParameter(oscId, key, value);
    };
  }
  const { states } = appModel;
  const parameters = states.parameters;
  const handlers = {
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
    <div class="flex-vc bd-#888 bg-#bbb p-4">
      <OscillatorWaveformView waveformParameters={parameters.osc1} />
      <OscillatorKnobsEditPart
        parameters={parameters.osc1}
        setParameter={handlers.osc1}
      />
    </div>
    <div class="flex-vc bd-#888 bg-#bbb p-4">
      <OscillatorWaveformView waveformParameters={parameters.osc2} />
      <OscillatorKnobsEditPart
        parameters={parameters.osc2}
        setParameter={handlers.osc2}
      />
    </div>
  </div>
{/if}
