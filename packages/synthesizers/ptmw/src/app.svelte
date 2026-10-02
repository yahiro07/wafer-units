<script lang="ts">
  import Knob from "./components/knob.svelte";
  import { createAppModel } from "./app-model.svelte.ts";
  import type { SynthParameterKey } from "./core/definitions";

  const appModel = createAppModel();

  function bindParameterHandler(key: SynthParameterKey) {
    return (value: number) => {
      appModel.setParameter(key, value);
    };
  }
  const { states } = appModel;
  const parameters = states.parameters;
  const handlers = {
    wave: bindParameterHandler("wave"),
    shape: bindParameterHandler("shape"),
  };
</script>

{#if states.viewActive}
  <div class="h-dvh flex-c overflow-hidden">
    <div class="w-240px h-160px flex-c bd-#888 bg-#bbb">
      <div class="flex-ha gap-5 p-2">
        <Knob label="WAVE" value={parameters.wave} onchange={handlers.wave} />
        <Knob
          label="SHAPE"
          value={parameters.shape}
          onchange={handlers.shape}
        />
      </div>
    </div>
  </div>
{/if}
