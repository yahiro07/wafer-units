<script lang="ts">
  import { startDragSession } from "@lib/mu2609/utils/drag-session";
  import { clampValue } from "@lib/mu2609/utils/helpers";
  import type { Snippet } from "svelte";

  type Props = {
    className?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onchange?: (value: number) => void;
    dragRange?: number;
    content: Snippet;
  };

  let {
    className,
    value,
    min = 0,
    max = 1,
    step = 0.01,
    onchange = () => {},
    dragRange = 100,
    content,
  }: Props = $props();

  function handlePointerDown(e0: PointerEvent) {
    const originalValue = value;
    startDragSession(e0, {
      onMove(e) {
        const deltaY = e.position.y - e.originalPosition.y;
        let newValue = clampValue(
          originalValue - (deltaY * (max - min)) / dragRange,
          min,
          max,
        );
        if (step > 0) {
          newValue = Math.round(newValue / step) * step;
        }
        onchange(newValue);
      },
    });
  }
</script>

<div
  onpointerdown={handlePointerDown}
  class={className}
  style="cursor: pointer;"
>
  {@render content()}
</div>
