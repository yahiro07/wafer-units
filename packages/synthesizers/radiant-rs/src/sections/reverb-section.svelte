<script lang="ts">
  import { getAppModelContext } from "../app-context.ts";
  import type { ReverbParameters } from "../core/definitions.ts";
  import Knob from "../components/knob.svelte";
  import SectionBox from "./section-box.svelte";

  const appModel = getAppModelContext();
  const parameters = appModel.states.parameters.reverb;

  const setParameter = (
    key: keyof ReverbParameters,
    value: number | boolean,
  ) => {
    appModel.dispatchParameterEdit({ reverb: { [key]: value } });
  };
  const toggleEnabled = () => {
    setParameter("enabled", !parameters.enabled);
  };
</script>

<SectionBox>
  {#snippet headerContent()}
    <div class="h-full flex-ha pl-1">
      <button
        class="px-1 flex-ha gap-1 text-#7898 [&.active]:(text-#36f) cursor-pointer"
        class:active={parameters.enabled}
        onclick={toggleEnabled}
      >
        <i class="ri-shut-down-line text-lg"></i>
        <span>REVERB</span>
      </button>
    </div>
  {/snippet}
  <div class="flex-ha gap-5 p-2 px-5">
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
</SectionBox>
