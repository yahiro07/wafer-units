import type { JSXElement } from "solid-js";
import { For } from "solid-js";
import type { SynthParams } from "@/audio/synth-params";
import { waveNames } from "@/audio/synth-params";
import { ParamSlider } from "@/components/param-slider";
import { appState, uiActions } from "@/store/app-store";

interface ParamDef {
  label: string;
  key: keyof SynthParams;
  min: number;
  max: number;
  step: number;
  formatValue?: (v: number) => string;
}

export const leftColumnParams: ParamDef[] = [
  {
    label: "Wave",
    key: "oscWave",
    min: 0,
    max: 3,
    step: 1,
    formatValue: (v) =>
      waveNames[Math.round(v) as keyof typeof waveNames] ?? "Saw",
  },
  { label: "Detune", key: "oscDetune", min: 0, max: 1, step: 0.001 },
  { label: "Sub", key: "subLevel", min: 0, max: 1, step: 0.001 },
  { label: "Drift", key: "drift", min: 0, max: 1, step: 0.001 },
  { label: "Chorus", key: "chorus", min: 0, max: 1, step: 0.001 },
  { label: "Reverb", key: "reverb", min: 0, max: 1, step: 0.001 },
];

export const rightColumnParams: ParamDef[] = [
  { label: "Cutoff", key: "filterCutoff", min: 0, max: 1, step: 0.001 },
  { label: "Peak", key: "filterPeak", min: 0, max: 1, step: 0.001 },
  { label: "EnvMod", key: "filterEnvMod", min: 0, max: 1, step: 0.001 },
  { label: "Decay", key: "ampDecay", min: 0, max: 1, step: 0.001 },
  { label: "Release", key: "ampRelease", min: 0, max: 1, step: 0.001 },
  { label: "Master", key: "masterVolume", min: 0, max: 1, step: 0.001 },
];

interface ParamColumnProps {
  params: ParamDef[];
}

export const ParamColumn = (props: ParamColumnProps): JSXElement => {
  return (
    <div class="flex-v flex-1 justify-around py-2">
      <For each={props.params}>
        {(param) => (
          <ParamSlider
            label={param.label}
            value={appState.parameters[param.key] as number}
            min={param.min}
            max={param.max}
            step={param.step}
            formatValue={param.formatValue}
            onChange={(v) =>
              uiActions.setParameter(
                param.key,
                param.step === 1
                  ? (Math.round(v) as SynthParams[typeof param.key])
                  : (v as SynthParams[typeof param.key]),
              )
            }
          />
        )}
      </For>
    </div>
  );
};
