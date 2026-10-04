<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { EqParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";
  import { sectionCommonStyles } from "./section-common-styles";
  import { cz } from "@lib/mu2609/utils/cz";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.eq;

  const setParameter = (key: keyof EqParameters, value: number) => {
    appModel.dispatchParameterEdit({ eq: { [key]: value } });
  };
</script>

<SectionBox headerLabel="EQ">
  <div class={cz(sectionCommonStyles.knobsBox, "!px-4.75")}>
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
</SectionBox>
