<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { EqParameters, MiscParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.misc;

  const setParameter = (key: keyof MiscParameters, value: number) => {
    appModel.dispatchParameterEdit({ misc: { [key]: value } });
  };
</script>

<div class="flex-ha gap-1.5 px-2">
  <div class="text-clKnobText text-13px">VOLUME</div>
  <Knob
    value={parameters.patchVolume}
    onchange={(v) => setParameter("patchVolume", v)}
    size={42}
  />
</div>
