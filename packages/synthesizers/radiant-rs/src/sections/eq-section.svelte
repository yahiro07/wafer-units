<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { EqParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.eq;

  const setParameter = (key: keyof EqParameters, value: number) => {
    appModel.dispatchParameterEdit({ eq: { [key]: value } });
  };
</script>

{#snippet bodyContent()}
  <div class="flex-ha gap-5 p-2 px-4.75">
    <Knob
      label="TILT"
      value={parameters.tilt}
      onchange={(v) => setParameter("tilt", v)}
    />
    <Knob
      label="FREQ"
      value={parameters.freq}
      onchange={(v) => setParameter("freq", v)}
    />
  </div>
{/snippet}

<SectionBox headerLabel="EQ" {bodyContent}></SectionBox>
