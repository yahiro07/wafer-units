<script lang="ts">
  import type { OscId, OscParameterKey } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";
  import { getAppModelContext } from "./app-context.ts";

  type Props = {
    oscId: OscId;
  };
  let { oscId }: Props = $props();
  const appModel = getAppModelContext();
  const parameters = $derived(appModel.states.parameters[oscId]);

  const setParameter = (key: OscParameterKey, value: number) => {
    appModel.dispatchParameterEdit({ [oscId]: { [key]: value } });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">
    {oscId.toUpperCase()}
  </div>
  <OscillatorWaveformView waveformParameters={parameters} />
  <OscillatorKnobsEditPart {parameters} {setParameter} />
</div>
