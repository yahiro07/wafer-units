import { LabeledBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { FilterType, LaneId, LinearParameterKeys } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { allPresetKeys, store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";
import { cz } from "@/common/css-realm";
import { Button } from "@/components/button";
import { Selector } from "@/components/selector";
import {
  ampParameterKeys,
  filterParameterKeys,
  oscParameterKeys,
} from "@/engine/engine-defs";

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
  bodyClassName,
}: {
  header: string;
  children: ComponentChildren;
  onHeaderClick?: () => void;
  headerInnerContent?: ComponentChildren;
  bodyClassName?: string;
}) => {
  return (
    <div class="flex-v">
      <div
        class={cz(
          "flex-c text-xl bg-clHeaderBg text-white font-600 px-3 py-1",
          headerInnerContent ? "justify-between" : undefined,
          onHeaderClick && "cursor-pointer",
        )}
        onClick={onHeaderClick}
      >
        {header}
        {headerInnerContent}
      </div>
      <div
        class={cz(
          "flex-c gap-7 bg-clSectionBg pt-6 px-7 pb-3",
          "bd-clHeaderBg",
          "text-clSectionText",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const _TextButton = ({
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
        active ? "text-#fff" : "text-#789",
      )}
    >
      <span>{label}</span>
    </button>
  );
};

const OscSection = ({ laneId }: { laneId: LaneId }) => {
  const { parameters } = store.useSnapshot();
  const pk = oscParameterKeys[laneId];

  return (
    <SectionFrame
      header={`OSCILLATOR`}
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
        min={0}
        max={3}
        step={1}
      />
      <ParameterKnob label="TONE" paramKey={pk.shape} />
      <ParameterKnob label="DETUNE" paramKey={pk.detune} />
      <ParameterKnob label="MIX" paramKey={pk.mix} />
    </SectionFrame>
  );
};

const FilterSection = ({ laneId }: { laneId: LaneId }) => {
  const { parameters } = store.useSnapshot();
  const pk = filterParameterKeys[laneId];
  return (
    <SectionFrame
      header={`FILTER`}
      headerInnerContent={
        <div class="flex-ha gap-3">
          <HeaderTextButton
            label={parameters[pk.type] === FilterType.LP24 ? "LP24" : "LP12"}
            onClick={actions.shiftFilterType}
          />
          <HeaderTextButton
            label="ENV-R"
            active={parameters[pk.envRelease]}
            onClick={() => actions.toggleBoolParameter(pk.envRelease)}
          />
        </div>
      }
    >
      <ParameterKnob label="CUTOFF" paramKey={pk.cutoff} />
      <ParameterKnob label="PEAK" paramKey={pk.peak} />
      <ParameterSlider label="ENV" paramKey={pk.env} />
    </SectionFrame>
  );
};

const AmplifierSection = ({ laneId }: { laneId: LaneId }) => {
  const { parameters } = store.useSnapshot();
  const pk = ampParameterKeys[laneId];
  const isFull = parameters[pk.full];
  return (
    <SectionFrame
      header={`AMPLIFIER`}
      headerInnerContent={
        <div class="flex-ha gap-3">
          <HeaderTextButton
            label="FULL"
            active={isFull}
            onClick={() => actions.toggleBoolParameter(pk.full)}
          />
        </div>
      }
    >
      <div class="w-200px flex-h justify-between">
        {isFull ? (
          <>
            <ParameterSlider label="A" paramKey={pk.attack} />
            <ParameterSlider label="D" paramKey={pk.decay} />
            <ParameterSlider label="S" paramKey={pk.sustain} />
            <ParameterSlider label="R" paramKey={pk.release} />
          </>
        ) : (
          <>
            <ParameterKnob label="DECAY-SUS" paramKey={pk.decay} />
            <ParameterKnob label="RELEASE" paramKey={pk.release} />
          </>
        )}
      </div>
    </SectionFrame>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-4 bg-clPageBg text-clPageText py-6 px-10">
      <div class="flex-ha gap-3 justify-between">
        <h1
          class="text-[48px] font-[var(--font-app-title)] font-400 line-height-1 mt-1"
          onClick={actions.emitPresetData}
        >
          Altair
        </h1>
        <div class="flex-ha gap-5">
          <PresetSelectionPart />
          <RandomizerButton />
        </div>
        {/* <ParameterKnob label="VOLUME" paramKey="patchVolume" /> */}
      </div>
      <div class="flex-h gap-5">
        <OscSection laneId="lane1" />
        <FilterSection laneId="lane1" />
      </div>
      <div class="flex-h gap-4 justify-between">
        <AmplifierSection laneId="lane1" />
        {/* <DebugSection /> */}
        <SectionFrame header="REVERB">
          <ParameterSlider label="TIME" paramKey="reverbTime" />
          <ParameterSlider label="TONE" paramKey="reverbTone" />
          <ParameterKnob label="MIX" paramKey="reverbMix" />
        </SectionFrame>
        <SectionFrame header="OUTPUT">
          <ParameterKnob label="DRIVE" paramKey="density" />
          <ParameterKnob label="VOLUME" paramKey="patchVolume" />
        </SectionFrame>
      </div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
