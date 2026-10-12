<script lang="ts">
  import LabeledBox from "./labeled-box.svelte";
  import Knob from "./knob.svelte";

  type Props = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onchange?: (value: number) => void;
    size?: number;
  };

  let { label, value, min, max, step, onchange, size }: Props = $props();
</script>

<LabeledBox {label}>
  <Knob {value} {min} {max} {step} {onchange} {size}></Knob>
</LabeledBox>
