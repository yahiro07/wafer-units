import { KnobBox } from "@/components/knob-box";
import { SectionFrame } from "@/components/section-frame";
import { Button } from "@/components/button";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Selector } from "@/components/selector";
import { allPresetKeys, store } from "@/root/store";
import { actions } from "@/root/actions";
import { SynthParameters } from "@/core/definitions";
import { useEffect } from "preact/hooks";
import { setupSynchronization, setupUnit } from "@/root/drivers";
import { cx } from "@twind/core";

const presetOptions = createPlainSelectorOptions(allPresetKeys);

const TitleText = () => {
  return (
    <div class="text-[18px]">
      <i class="ri-instance-line text-xl ml-[-2px]" />
      <span class="ml-[2px]">MiniSynth</span>
      <span class="text-clPrimary">2</span>
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
        <span class="text-clPrimary">RND</span>
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
        "bg-clTopBarBg bd-clSectionEdge rounded-[4px]",
      )}
    >
      <div class="w-[120px]">
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
}: {
  paramKey: keyof SynthParameters;
  label: string;
  steps?: number;
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
    />
  );
};

const ParametersSection = () => {
  return (
    <div class="flex-v gap-3">
      <div class="flex-h gap-3">
        <SectionFrame header="OSCILLATOR" className="w-[60%]">
          <ParameterKnob paramKey="oscWave" label="wave" steps={3} />
          <ParameterKnob paramKey="oscDetune" label="detune" />
          <ParameterKnob paramKey="oscSub" label="sub" />
          <ParameterKnob paramKey="oscDrift" label="drift" />
        </SectionFrame>
        <SectionFrame
          header="AMPLIFIER"
          className="grow"
          contentClassName="!px-3"
        >
          <ParameterKnob paramKey="ampDecay" label="decay" />
          <ParameterKnob paramKey="ampRelease" label="release" />
        </SectionFrame>
      </div>
      <div class="flex-h gap-3">
        <SectionFrame header="FILTER" className="grow">
          <ParameterKnob paramKey="filterCutoff" label="cutoff" />
          <ParameterKnob paramKey="filterPeak" label="peak" />
          <ParameterKnob paramKey="filterEnvMod" label="envmod" />
        </SectionFrame>
        <SectionFrame header="MASTER" className="grow">
          <ParameterKnob paramKey="fxChorus" label="chorus" />
          <ParameterKnob paramKey="fxReverb" label="reverb" />
          <ParameterKnob paramKey="masterVolume" label="volume" />
        </SectionFrame>
      </div>
    </div>
  );
};

export const App = () => {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
  return (
    <div class="h-[100dvh] flex-c text-clText bg-clPanelBody">
      <div class="w-[700px] flex-v gap-3 shrink-0">
        <TopBar />
        <ParametersSection />
      </div>
    </div>
  );
};
