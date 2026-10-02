<script lang="ts">
  import { getAppModelContext } from "./app-context.ts";
  import type { AmpParameters } from "./core/definitions.ts";
  import Knob from "./components/knob.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.amp;

  const setParameter = (key: keyof AmpParameters, value: number) => {
    appModel.dispatchParameterEdit({ amp: { [key]: value } });
  };
</script>

<div class="flex-vc bd-#888 bg-#bbb gap-2">
  <div class="w-full h-40px bg-#444 flex-ha pl-2 text-white font-600">AMP</div>
  <div class="flex-ha gap-4 p-2">
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
</div>
