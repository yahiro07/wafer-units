<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { ReverbParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.reverb;

  const setParameter = (key: keyof ReverbParameters, value: number) => {
    appModel.dispatchParameterEdit({ reverb: { [key]: value } });
  };
</script>

{#snippet bodyContent()}
  <div class="flex-ha gap-5 p-2 px-5">
    <Knob
      label="TIME"
      value={parameters.time}
      onchange={(v) => setParameter("time", v)}
    />
    <Knob
      label="TONE"
      value={parameters.tone}
      onchange={(v) => setParameter("tone", v)}
    />
    <Knob
      label="MIX"
      value={parameters.mix}
      onchange={(v) => setParameter("mix", v)}
    />
  </div>
{/snippet}

<SectionBox headerLabel="REVERB" {bodyContent}></SectionBox>
