<script lang="ts">
  import Knob from "./knob.svelte";
  import { appModel } from "./app-model";

  let pan = $state(0);

  function handlePanChange(newValue: number) {
    pan = newValue;
    appModel.setPan(newValue);
  }
</script>

<div class="page-root">
  <div class="panel">
    <div class="knobs">
      <Knob
        label="PAN"
        value={pan}
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
