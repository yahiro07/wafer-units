<script lang="ts">
  import Knob from "./knob.svelte";
  import {
    createAppModel,
    type SynthParameterKey,
  } from "./app-model.svelte.ts";

  const appModel = createAppModel();

  function bindParameterHandler(key: SynthParameterKey) {
    return (value: number) => {
      appModel.setParameter(key, value);
    };
  }
</script>

<div class="page-root">
  <div class="panel">
    <div class="knobs">
      <Knob
        label="VOLUME"
        value={appModel.parameters.volume}
        onchange={bindParameterHandler("volume")}
      />
      <Knob
        label="PAN"
        value={appModel.parameters.pan}
        min={-1}
        max={1}
        onchange={bindParameterHandler("pan")}
      />
    </div>
  </div>
</div>

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
