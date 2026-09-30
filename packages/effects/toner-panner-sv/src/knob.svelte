<script lang="ts">
  import { startDragSession } from "@lib/mu2609/utils/drag-session";
  import { clampValue, linearInterpolate } from "@lib/mu2609/utils/helpers";

  let {
    label = "",
    value = 0.5,
    min = 0,
    max = 1,
    onchange = (value: number) => {},
  } = $props();

  const angle = $derived(linearInterpolate(value, min, max, -140, 140));

  function handlePointerDown(e0: PointerEvent) {
    const newValue = (value + 0.1) % 1;
    const originalValue = value;
    onchange(newValue);
    startDragSession(e0, {
      onMove(e) {
        const deltaY = e.position.y - e.originalPosition.y;
        const newValue = clampValue(originalValue - deltaY * 0.01, min, max);
        onchange(newValue);
      },
    });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="base">
  <div class="knob" onpointerdown={handlePointerDown}>
    <div class="tick-plane" style="transform: rotate({angle}deg);">
      <div class="tick"></div>
    </div>
  </div>
  <div class="label">
    {label}
  </div>
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .knob {
    width: 80px;
    height: 80px;
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
    width: 4px;
    height: 20px;
    background: #444;
  }

  .label {
    width: 80px;
    text-align: center;
  }
</style>
