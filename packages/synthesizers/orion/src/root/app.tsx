import { KnobBox } from "@/components/knob-box";
import { SectionFrame } from "@/components/section-frame";
import { Button } from "@/components/button";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";
import { allPresetKeys, store } from "@/root/store";
import { actions } from "@/root/actions";
import {
  numWaveModes,
  ShapeEnvRange,
  SynthLinearParameters,
  WaveMode,
} from "@/defs/definitions";
import { cx } from "@twind/core";
import { useSetupDrivers } from "@/root/drivers";

const presetOptions = createPlainSelectorOptions(allPresetKeys);

const TitleText = () => {
  return (
    <div class="text-[20px] text-white">
      <i
        class="ri-instance-line text-xl ml-[-2px]"
        onClick={actions.emitPresetData}
      />
      <span class="ml-[2px] whitespace-nowrap">ORION</span>
    </div>
  );
};

const PresetSelectionPart = () => {
  const { presetKey } = store.useSnapshot();
  return (
    <div class="flex-ha gap-1.5">
      <Button asr={1.3} onClick={() => actions.shiftPreset(-1)}>
        <i class="ri-arrow-left-s-line text-2xl" />
      </Button>
      <Selector
        value={presetKey}
        onChange={actions.setPreset}
        options={presetOptions}
        height={44}
      />
      <Button asr={1.3} onClick={() => actions.shiftPreset(1)}>
        <i class="ri-arrow-right-s-line text-2xl" />
      </Button>
    </div>
  );
};

const RandomizerButton = () => {
  return (
    <Button asr={2} onClick={actions.randomizeParameters}>
      <div class="flex-ha gap-1">
        <span>RND</span>
        <i class="ri-dice-3-line text-xl" />
      </div>
    </Button>
  );
};

const TopBar = () => {
  return (
    <div
      class={cx(
        "flex-ha py-2 px-4 justify-between",
        "bg-clTopBarBg rounded-[4px]",
      )}
    >
      <div class="w-[120px] flex-ha pt-1">
        <TitleText />
      </div>
      <PresetSelectionPart />
      <div class="w-[120px] flex-ha justify-end">
        <RandomizerButton />
      </div>
    </div>
  );
};

const ParameterKnob = ({
  paramKey,
  label,
  steps,
  onLabelClick,
}: {
  paramKey: keyof SynthLinearParameters;
  label: string;
  steps?: number;
  onLabelClick?: () => void;
}) => {
  const { parameters } = store.useSnapshot();
  const setParameter = actions.setParameter;
  const min = 0;
  const max = steps ? steps - 1 : 1;
  const step = steps ? 1 : 0.01;
  return (
    <KnobBox
      label={label}
      value={parameters[paramKey]}
      min={min}
      max={max}
      step={step}
      onChange={(v) => setParameter(paramKey, v)}
      onLabelClick={onLabelClick}
    />
  );
};

const ParametersSection = () => {
  const { parameters } = store.useSnapshot();
  const waveName = WaveMode[parameters.waveMode];
  return (
    <div class="flex-v gap-3">
      <div class="flex-h gap-3">
        <SectionFrame header="OSCILLATOR" className="w-[65%]">
          <ParameterKnob
            paramKey="waveMode"
            label={`WAVE:${waveName}`}
            steps={numWaveModes}
          />
          <ParameterKnob paramKey="shape" label="SHAPE" />
          <ParameterKnob
            paramKey="envDecay"
            label={
              parameters.envRange === ShapeEnvRange.High ? "ENV-H†" : "ENV-L†"
            }
            onLabelClick={actions.toggleShapeEnvRange}
          />
          <ParameterKnob
            paramKey="detune"
            label={parameters.sub ? "SUB-DET†" : "DET†"}
            onLabelClick={() => actions.toggleBoolParameter("sub")}
          />
        </SectionFrame>
        <SectionFrame
          header="AMPLIFIER"
          className="grow"
          contentClassName="!px-3"
        >
          <ParameterKnob
            paramKey="decay"
            label={parameters.decayAltAttack ? "Attack†" : "DECAY†"}
            onLabelClick={() => actions.toggleBoolParameter("decayAltAttack")}
          />
          <ParameterKnob paramKey="release" label="RELEASE" />
        </SectionFrame>
      </div>
      <div class="flex-h gap-3">
        <SectionFrame header="EFFECTS" className="w-[65%]">
          <ParameterKnob paramKey="loFi" label="LO-FI" />
          <ParameterKnob paramKey="chorus" label="CHORUS" />
          <ParameterKnob paramKey="delay" label="DELAY" />
          <ParameterKnob paramKey="reverb" label="REVERB" />
        </SectionFrame>
        <SectionFrame header="MASTER" className="grow">
          <ParameterKnob paramKey="drift" label="DRIFT" />
          <ParameterKnob paramKey="patchVolume" label="VOLUME" />
        </SectionFrame>
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return (
    <div class="h-[100dvh] flex-c text-clText bg-clPanelBody">
      <div class="w-[700px] flex-v gap-3 shrink-0">
        <TopBar />
        <ParametersSection />
      </div>
    </div>
  );
};
