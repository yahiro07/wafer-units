<script lang="ts">
  import Knob from "./components/knob.svelte";
  import type { OscParameterKey, OscParameters } from "./core/definitions";

  type Props = {
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: number) => void;
  };
  let { parameters, setParameter }: Props = $props();

  function bindParameterHandler(key: OscParameterKey) {
    return (value: number) => {
      setParameter(key, value);
    };
  }
  const handlers = {
    wave: bindParameterHandler("wave"),
    shape: bindParameterHandler("shape"),
    dense: bindParameterHandler("dense"),
    mix: bindParameterHandler("mix"),
  };
</script>

<div class="flex-ha gap-0 p-2">
  <Knob
    label="WAVE"
    value={parameters.wave}
    onchange={handlers.wave}
    min={0}
    max={3}
    step={1}
  />
  <Knob label="SHAPE" value={parameters.shape} onchange={handlers.shape} />
  <Knob label="DENSE" value={parameters.dense} onchange={handlers.dense} />
  <Knob label="MIX" value={parameters.mix} onchange={handlers.mix} />
</div>
