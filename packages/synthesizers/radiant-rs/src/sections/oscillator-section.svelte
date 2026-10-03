<script lang="ts">
  import type { OscId, OscParameterKey } from "../core/definitions.ts";
  import OscillatorWaveformView from "./oscillator-waveform-view.svelte";
  import OscillatorKnobsEditPart from "./oscillator-knobs-edit-part.svelte";
  import { getAppModelContext } from "../app-context.ts";
  import OscillatorHeaderEditPart from "./oscillator-header-edit-part.svelte";
  import SectionBox from "./section-box.svelte";

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

{#snippet headerContent()}
  <OscillatorHeaderEditPart {oscId} {parameters} {setParameter} />
{/snippet}

{#snippet bodyContent()}
  <div class="flex-vc gap-2.5">
    <OscillatorWaveformView waveformParameters={parameters} />
    <OscillatorKnobsEditPart {parameters} {setParameter} />
  </div>
{/snippet}

<SectionBox {headerContent} {bodyContent}></SectionBox>
