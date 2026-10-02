<script lang="ts">
  import { getAppModelContext } from "./app-context.ts";
  import type { ReverbParameters } from "./core/definitions.ts";
  import Knob from "./components/knob.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.reverb;

  const setParameter = (key: keyof ReverbParameters, value: number) => {
    appModel.editOperator.patchReverbParameters({
      [key]: value,
    });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">
    REVERB
  </div>
  <div class="flex-ha gap-4 p-2">
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
</div>
