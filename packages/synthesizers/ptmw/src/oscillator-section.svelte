<script lang="ts">
  import type { OscParameterKey, OscParameters } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";

  type Props = {
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: number) => void;
  };
  let { parameters, setParameter }: Props = $props();
</script>

<div class="flex-vc bd-#888 bg-#bbb p-4">
  <OscillatorWaveformView waveformParameters={parameters} />
  <OscillatorKnobsEditPart {parameters} {setParameter} />
</div>
