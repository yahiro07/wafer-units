<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { AmpParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.amp;

  const setParameter = (key: keyof AmpParameters, value: number) => {
    appModel.dispatchParameterEdit({ amp: { [key]: value } });
  };
</script>

<SectionBox headerLabel="AMP">
  <div class="flex-ha gap-5 p-2 px-5">
    <Knob
      label="ATTACK"
      value={parameters.attack}
      onchange={(v) => setParameter("attack", v)}
    />
    <Knob
      label="DECAY"
      value={parameters.decay}
      onchange={(v) => setParameter("decay", v)}
    />
    <Knob
      label="SUSTAIN"
      value={parameters.sustain}
      onchange={(v) => setParameter("sustain", v)}
    />
    <Knob
      label="RELEASE"
      value={parameters.release}
      onchange={(v) => setParameter("release", v)}
    />
  </div>
</SectionBox>
