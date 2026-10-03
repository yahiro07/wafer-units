<script lang="ts">
  import { getAppModelContext } from "./app-context.ts";
  import type { FilterParameters } from "./core/definitions.ts";
  import Knob from "./components/knob.svelte";
  import SectionBox from "./section-box.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.filter;

  const setParameter = (key: keyof FilterParameters, value: number) => {
    appModel.dispatchParameterEdit({ filter: { [key]: value } });
  };
</script>

{#snippet bodyContent()}
  <div class="flex-ha gap-4 p-2">
    <Knob
      label="CUTOFF"
      value={parameters.cutoff}
      onchange={(v) => setParameter("cutoff", v)}
    />
    <Knob
      label="PEAK"
      value={parameters.peak}
      onchange={(v) => setParameter("peak", v)}
    />
    <Knob
      label="ENV"
      value={parameters.env}
      onchange={(v) => setParameter("env", v)}
    />
  </div>
{/snippet}

<SectionBox headerLabel="FILTER" {bodyContent}></SectionBox>
