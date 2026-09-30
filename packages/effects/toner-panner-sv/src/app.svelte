<script lang="ts">
  import Counter from "./counter.svelte";
  import Knob from "./knob.svelte";

  let pan = $state(0);

  function handlePanChange(newValue: number) {
    pan = newValue;
  }
</script>

<section id="center">
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/App.svelte</code> and save to test <code>HMR</code></p>
  </div>
  <Counter />
  <div class="knobs">
    <Knob label="PAN" value={pan} min={-1} max={1} onchange={handlePanChange} />
  </div>
</section>

<style>
  .knobs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
</style>
