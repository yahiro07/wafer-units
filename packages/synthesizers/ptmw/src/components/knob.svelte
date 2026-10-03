<script lang="ts">
  import { linearInterpolate } from "@lib/mu2609/utils/helpers";
  import KnobFrame from "./knob-frame.svelte";
  import LabeledBox from "./labeled-box.svelte";

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
    <div class="knob-inner"></div>
    <div class="tick-plane" style="transform: rotate({angle}deg);">
      <div class="tick"></div>
    </div>
  </div>
{/snippet}

{#snippet controlContent()}
  <KnobFrame {value} {min} {max} {step} {onchange} content={knobContent}
  ></KnobFrame>
{/snippet}

<LabeledBox content={controlContent} {label}></LabeledBox>

<style>
  .knob {
    width: 45px;
    height: 45px;
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to bottom, #fff, #0004);
    padding: 5px;
    border: solid 0.5px #666;

    &:hover {
      opacity: 0.9;
    }
  }

  .knob-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }

  .tick-plane {
    position: absolute;
    top: 0;
    left: 0;
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
    background: #458;
  }
</style>
