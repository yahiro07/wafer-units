import { LabeledBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import {
  LinearParameterKeys,
  numOscWaveTypes,
  OscId,
  OscWave,
  oscWaveLabels,
} from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { allPresetKeys, store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";
import { cz } from "@/common/css-realm";
import { Button } from "@/components/button";
import { Selector } from "@/components/selector";
import { oscParameterKeys } from "@/engine/engine-defs";

const presetOptions = createPlainSelectorOptions(allPresetKeys);

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
    <Button asr={1.9} onClick={actions.randomizeParameters}>
      <div class="flex-ha gap-1">
        <span>RND</span>
        <i class="ri-dice-3-line text-xl" />
      </div>
    </Button>
  );
};

const ParameterKnob = ({
  paramKey,
  label,
  min,
  max,
  step,
  onLabelClick,
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  onLabelClick?: () => void;
}) => {
  const { parameters } = store.useSnapshot();
  return (
    <LabeledBox label={label} onLabelClick={onLabelClick}>
      <Knob
        value={parameters[paramKey]}
        min={min}
        max={max}
        step={step}
        onChange={(v) => actions.setParameter(paramKey, v)}
      />
    </LabeledBox>
  );
};

const ParameterSlider = ({
  paramKey,
  label,
  min,
  max,
  step,
  onLabelClick,
  invertY,
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  onLabelClick?: () => void;
  invertY?: boolean;
}) => {
  const { parameters } = store.useSnapshot();
  return (
    <LabeledBox label={label} onLabelClick={onLabelClick}>
      <Slider
        value={parameters[paramKey]}
        min={min}
        max={max}
        step={step}
        onChange={(v) => actions.setParameter(paramKey, v)}
        invertY={invertY}
      />
    </LabeledBox>
  );
};

const SectionFrame = ({
  header,
  children,
  onHeaderClick,
  headerInnerContent,
}: {
  header: string;
  children: ComponentChildren;
  onHeaderClick?: () => void;
  headerInnerContent?: ComponentChildren;
}) => {
  return (
    <div class="flex-v gap-5">
      <div
        class={cz(
          "flex-c text-xl bg-#79c text-white font-bold px-2 py-1",
          headerInnerContent ? "justify-between" : undefined,
          onHeaderClick && "cursor-pointer",
        )}
        onClick={onHeaderClick}
      >
        {header}
        {headerInnerContent}
      </div>
      <div class="flex-c gap-4">{children}</div>
    </div>
  );
};

const TextButton = ({
  label,
  active,
  onClick,
  asr = 1.6,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  asr?: number;
}) => {
  return (
    <Button height={28} asr={asr} onClick={onClick}>
      <span class={cz(active ? "text-#08f" : "text-#888")}>{label}</span>
    </Button>
  );
};

const HeaderTextButton = ({
  label,
  active = true,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => {
  const height = 28;
  return (
    <button
      onClick={onClick}
      style={{ height }}
      class={cz(
        "text-[19px] font-500 cursor-pointer",
        "hover:opacity-90",
        active ? "text-#fff" : "text-#abc",
      )}
    >
      <span>{label}</span>
    </button>
  );
};

const OscSection = ({ oscId }: { oscId: OscId }) => {
  const { parameters } = store.useSnapshot();
  const pk = oscParameterKeys[oscId];
  const mixLabel = { 0: "1", 1: "2", 2: "F" }[parameters[pk.mix]] ?? "";

  return (
    <SectionFrame
      header={oscId === "osc1" ? "OSCILLATOR 1" : "OSCILLATOR 2"}
      headerInnerContent={
        <div class="flex-ha gap-4">
          <HeaderTextButton
            label="SPR"
            active={parameters[pk.spread]}
            onClick={() => actions.toggleBoolParameter(pk.spread)}
          />
          <HeaderTextButton
            label="SUB"
            active={parameters[pk.sub]}
            onClick={() => actions.toggleBoolParameter(pk.sub)}
          />
          <HeaderTextButton
            label={`MIX-${mixLabel}`}
            onClick={() => actions.shiftOscMix(oscId)}
          />
        </div>
      }
    >
      <ParameterSlider
        label="OCT"
        paramKey={pk.octave}
        min={-2}
        max={2}
        step={1}
      />
      <ParameterSlider
        label="UNI"
        paramKey={pk.unison}
        min={1}
        max={5}
        step={1}
      />
      <ParameterKnob
        label={`WAVE:${oscWaveLabels[parameters[pk.wave] as OscWave]}`}
        paramKey={pk.wave}
        max={numOscWaveTypes - 1}
        step={1}
      />
      <ParameterKnob label="DETUNE" paramKey={pk.detune} />
    </SectionFrame>
  );
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div class="flex-v gap-4 bg-clPageBg text-clPageText py-6 px-10">
      <div class="flex-ha gap-3 justify-between">
        <div class="flex-ha font-bold gap-4">
          <h1 class="text-5xl" onClick={actions.emitPresetData}>
            LUNA
          </h1>
          <div class="text-4xl">TRS-MINI</div>
        </div>
        <div class="flex-ha gap-5">
          <PresetSelectionPart />
          <RandomizerButton />
        </div>
      </div>
      <div class="flex-h gap-8">
        <div class="flex-h gap-6">
          <OscSection oscId="osc1" />
          <SectionFrame
            header="FILTER"
            // headerInnerContent={
            //   <div class="flex-ha gap-3">
            //     <HeaderTextButton
            //       label={parameters.lpfSteep ? "LP24" : "LP12"}
            //       active
            //       onClick={() => actions.toggleBoolParameter("lpfSteep")}
            //     />
            //   </div>
            // }
          >
            <ParameterKnob label="CUTOFF" paramKey="lpfCutoff" />
            <ParameterSlider label="PEAK" paramKey="lpfPeak" />
            <ParameterSlider label="DECAY" paramKey="lpfDecay" />
          </SectionFrame>
          <SectionFrame header="AMPLIFIER">
            {/* <ParameterSlider label="PUNCH" paramKey="ampHead" /> */}
            <ParameterKnob
              label={parameters.ampDecayAltAttack ? "ATTACK†" : "DECAY†"}
              paramKey="ampDecay"
              onLabelClick={() =>
                actions.toggleBoolParameter("ampDecayAltAttack")
              }
            />
            <ParameterKnob label="RELEASE" paramKey="ampRelease" />
          </SectionFrame>
        </div>
      </div>
      <div class="flex-h gap-6">
        <OscSection oscId="osc2" />
        <SectionFrame header="CONTROL">
          <div class="flex-h gap-7">
            <ParameterSlider label="OSCMIX" paramKey="oscMix" invertY />
            <ParameterSlider label="DENSE" paramKey="density" />
            <ParameterSlider label="VOLUME" paramKey="patchVolume" />
            {/* <ParameterKnob label="VOLUME" paramKey="patchVolume" /> */}
          </div>
        </SectionFrame>
        <div class="grow" />
        <SectionFrame header="REVERB">
          <div class="flex-h gap-5">
            <ParameterSlider label="TIME" paramKey="reverbTime" />
            <ParameterSlider label="TONE" paramKey="reverbTone" />
            <ParameterSlider label="MIX" paramKey="reverbMix" />
          </div>
        </SectionFrame>
      </div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
