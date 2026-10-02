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
    octave: bindParameterHandler("octave"),
    wave: bindParameterHandler("wave"),
    shape: bindParameterHandler("shape"),
    dense: bindParameterHandler("dense"),
    mix: bindParameterHandler("mix"),
    unison: bindParameterHandler("unison"),
    detune: bindParameterHandler("detune"),
    pan: bindParameterHandler("pan"),
    volume: bindParameterHandler("volume"),
  };
</script>

<div class="flex-v">
  <div class="flex-ha gap-4 p-2">
    <Knob
      label="OCTAVE"
      value={parameters.octave}
      onchange={handlers.octave}
      min={-2}
      max={2}
      step={1}
    />
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
  <div class="flex-ha gap-4 p-2 justify-end">
    <Knob
      label="UNISON"
      value={parameters.unison}
      onchange={handlers.unison}
      min={1}
      max={7}
      step={1}
    />
    <Knob
      label="DETUNE"
      value={parameters.detune}
      onchange={handlers.detune}
      min={-1}
      max={1}
      step={0.01}
    />
    <Knob label="PAN" value={parameters.pan} onchange={handlers.pan} min={-1} />
    <Knob label="VOLUME" value={parameters.volume} onchange={handlers.volume} />
  </div>
</div>
