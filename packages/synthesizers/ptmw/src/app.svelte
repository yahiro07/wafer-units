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
    pan: bindParameterHandler("pan"),
    volume: bindParameterHandler("volume"),
  };
</script>

{#if states.viewActive}
  <div class="page-root">
    <div class="panel">
      <div class="knobs">
        <Knob
          label="VOLUME"
          value={parameters.volume}
          onchange={handlers.volume}
        />
        <Knob
          label="PAN"
          value={parameters.pan}
          min={-1}
          max={1}
          onchange={handlers.pan}
        />
      </div>
    </div>
  </div>
{/if}

<style>
  .page-root {
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .panel {
    width: 240px;
    height: 160px;
    background: #bbb;
    border: solid 1px #888;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .knobs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
</style>
