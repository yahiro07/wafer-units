<script lang="ts">
  import Knob from "./components/knob.svelte";
  import { createAppModel } from "./app-model.svelte.ts";
  import type { SynthParameterKey } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";

  const appModel = createAppModel();

  function bindParameterHandler(key: SynthParameterKey) {
    return (value: number) => {
      appModel.setParameter(key, value);
    };
  }
  const { states } = appModel;
  const parameters = states.parameters;
  const handlers = {
    wave: bindParameterHandler("wave"),
    shape: bindParameterHandler("shape"),
    dense: bindParameterHandler("dense"),
    mix: bindParameterHandler("mix"),
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
      <OscillatorWaveformView
        waveformParameters={{
          wave: parameters.wave,
          shape: parameters.shape,
          dense: parameters.dense,
          mix: parameters.mix,
        }}
      />
      <div class="flex-ha gap-5 p-2">
        <Knob
          label="WAVE"
          value={parameters.wave}
          onchange={handlers.wave}
          min={0}
          max={3}
          step={1}
        />
        <Knob
          label="SHAPE"
          value={parameters.shape}
          onchange={handlers.shape}
        />
        <Knob
          label="DENSE"
          value={parameters.dense}
          onchange={handlers.dense}
        />
        <Knob label="MIX" value={parameters.mix} onchange={handlers.mix} />
      </div>
    </div>
  </div>
{/if}
