<script lang="ts">
  import { getAppModelContext } from "./app-context.ts";
  import type { FilterParameters } from "./core/definitions.ts";
  import Knob from "./components/knob.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.filter;

  const setParameter = (key: keyof FilterParameters, value: number) => {
    appModel.dispatchParameterEdit({ filter: { [key]: value } });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">
    FILTER
  </div>
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
</div>
