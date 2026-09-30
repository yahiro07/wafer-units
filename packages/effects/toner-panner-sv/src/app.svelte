<script lang="ts">
  import Knob from "./knob.svelte";
  import { createAppModel } from "./app-model";
  const appModel = createAppModel();

  function handlePanChange(newValue: number) {
    appModel.setParameter("pan", newValue);
  }
</script>

<div class="page-root">
  <div class="panel">
    <div class="knobs">
      <Knob
        label="VOLUME"
        value={appModel.parameters.volume}
        onchange={handlePanChange}
      />
      <Knob
        label="PAN"
        value={appModel.parameters.pan}
        min={-1}
        max={1}
        onchange={handlePanChange}
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
    width: 160px;
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
    gap: 10px;
  }
</style>
