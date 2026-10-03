<script lang="ts">
  import type { OscId, OscParameterKey } from "./core/definitions";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";
  import { getAppModelContext } from "./app-context.ts";
  import OscillatorHeaderEditPart from "./oscillator-header-edit-part.svelte";

  type Props = {
    oscId: OscId;
  };
  let { oscId }: Props = $props();
  const appModel = getAppModelContext();
  const parameters = $derived(appModel.states.parameters[oscId]);

  const setParameter = (key: OscParameterKey, value: number | boolean) => {
    appModel.dispatchParameterEdit({ [oscId]: { [key]: value } });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb">
  <OscillatorHeaderEditPart {oscId} {parameters} {setParameter} />
  <div class="flex-vc p-2px pt-3px gap-1">
    <OscillatorWaveformView waveformParameters={parameters} />
    <OscillatorKnobsEditPart {parameters} {setParameter} />
  </div>
</div>
