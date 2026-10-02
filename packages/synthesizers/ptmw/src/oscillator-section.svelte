<script lang="ts">
  import type {
    OscId,
    OscParameterKey,
    OscParameters,
  } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";

  type Props = {
    oscId: OscId;
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: number) => void;
  };
  let { oscId, parameters, setParameter }: Props = $props();
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">
    {oscId.toUpperCase()}
  </div>
  <OscillatorWaveformView waveformParameters={parameters} />
  <OscillatorKnobsEditPart {parameters} {setParameter} />
</div>
