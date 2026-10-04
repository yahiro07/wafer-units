<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { FilterParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";
  import { sectionCommonStyles } from "./section-common-styles";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.filter;

  const setParameter = (key: keyof FilterParameters, value: number) => {
    appModel.dispatchParameterEdit({ filter: { [key]: value } });
  };
</script>

<SectionBox headerLabel="FILTER">
  <div class={sectionCommonStyles.knobsBox}>
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
</SectionBox>
