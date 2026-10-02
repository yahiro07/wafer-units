<script lang="ts">
  import { getAppModelContext } from "./app-context.ts";
  import type { EqParameters, ReverbParameters } from "./core/definitions.ts";
  import Knob from "./components/knob.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.eq;

  const setParameter = (key: keyof EqParameters, value: number) => {
    appModel.dispatchParameterEdit({ eq: { [key]: value } });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">EQ</div>
  <div class="flex-ha gap-4 p-2">
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
</div>
