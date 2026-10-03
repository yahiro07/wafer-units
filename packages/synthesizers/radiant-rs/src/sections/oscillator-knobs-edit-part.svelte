<script lang="ts">
  import Knob from "../components/knob.svelte";
  import NumberSliderBox from "../components/number-slider-box.svelte";
  import Slider from "../components/slider.svelte";
  import type { OscParameterKey, OscParameters } from "../core/definitions";
  import { numWaveformSpecs } from "../core/waveforms/core-waveform-generator";
  import { getAppModelContext } from "../app-context.ts";

  type Props = {
    parameters: OscParameters;
    setParameter: (key: OscParameterKey, value: number) => void;
  };
  let { parameters, setParameter }: Props = $props();

  const appModel = getAppModelContext();
  const toggleMixPreview = () => {
    appModel.states.affectMixForPreview = !appModel.states.affectMixForPreview;
  };
</script>

<div class="flex-v gap-2 pt-1 pb-3">
  <div class="flex-ha gap-4">
    <Slider
      label="OCT"
      value={parameters.octave}
      onchange={(v) => setParameter("octave", v)}
      min={-1}
      max={1}
      step={1}
    />
    <Knob
      label="WAVE"
      value={parameters.wave}
      onchange={(v) => setParameter("wave", v)}
      min={0}
      max={numWaveformSpecs - 1}
      step={1}
    />
    <Knob
      label="SHAPE"
      value={parameters.shape}
      onchange={(v) => setParameter("shape", v)}
    />
    <Knob
      label="DENSE"
      value={parameters.dense}
      onchange={(v) => setParameter("dense", v)}
    />
    <div class="relative">
      <Knob
        label="MIX"
        value={parameters.mix}
        onchange={(v) => setParameter("mix", v)}
      />
      <div
        class="absolute bottom-0 left-0 w-full h-18px"
        onclick={toggleMixPreview}
      ></div>
    </div>
  </div>
  <div class="flex-ha gap-4 justify-end">
    <NumberSliderBox
      label="UNISON"
      value={parameters.unison}
      onchange={(v) => setParameter("unison", v)}
      min={1}
      max={7}
      step={1}
    />
    <Knob
      label="DETUNE"
      value={parameters.detune}
      onchange={(v) => setParameter("detune", v)}
    />
    <Knob
      label="PAN"
      value={parameters.pan}
      onchange={(v) => setParameter("pan", v)}
      min={-1}
    />
    <Knob
      label="VOLUME"
      value={parameters.volume}
      onchange={(v) => setParameter("volume", v)}
    />
  </div>
</div>
