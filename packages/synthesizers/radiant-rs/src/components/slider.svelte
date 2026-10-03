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

  const d = 9.5;
  let transY = $derived(linearInterpolate(value, min, max, d, -d));
</script>

<LabeledBox {label}>
  <KnobFrame {value} {min} {max} {step} {onchange}>
    <div class="w-20px h-40px flex-c bg-#ccc bd-#2228 border-0.5px">
      <div
        class="w-20px h-20px bg-#eee"
        style="transform: translateY({transY}px);"
      ></div>
    </div>
  </KnobFrame>
</LabeledBox>
