<script lang="ts">
  import { linearInterpolate } from "@lib/mu2609/utils/helpers";
  import KnobFrame from "./knob-frame.svelte";

  type Props = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onchange?: (value: number) => void;
  };

  let {
    label = "",
    value,
    min = 0,
    max = 1,
    step = 0.01,
    onchange = () => {},
  }: Props = $props();

  const angle = $derived(linearInterpolate(value, min, max, -140, 140));
</script>

{#snippet knobContent()}
  <div class="knob">
    <div class="tick-plane" style="transform: rotate({angle}deg);">
      <div class="tick"></div>
    </div>
  </div>
{/snippet}

<div class="base">
  <KnobFrame {value} {min} {max} {step} {onchange} content={knobContent}
  ></KnobFrame>
  <div class="label">
    {label}
  </div>
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .knob {
    width: 45px;
    height: 45px;
    background: #ddd;
    border: solid 1px #000;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .tick-plane {
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    transform-origin: center;
  }

  .tick {
    width: 3px;
    height: 12px;
    background: #444;
  }

  .label {
    width: 0px;
    display: flex;
    justify-content: center;
    font-size: 13px;
  }
</style>
