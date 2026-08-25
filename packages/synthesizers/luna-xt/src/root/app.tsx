import { LabeledBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { LinearParameterKeys, numOscWaveTypes } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { allPresetKeys, store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";
import { cz } from "@/common/css-realm";
import { Button } from "@/components/button";
import { Selector } from "@/components/selector";

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
      <Slider
        value={parameters[paramKey]}
        min={min}
        max={max}
        step={step}
        onChange={(v) => actions.setParameter(paramKey, v)}
      />
    </LabeledBox>
  );
};

const SectionFrame = ({
  header,
  children,
  onHeaderClick,
  headerInnerContext,
}: {
  header: string;
  children: ComponentChildren;
  onHeaderClick?: () => void;
  headerInnerContext?: ComponentChildren;
}) => {
  return (
    <div class="flex-v gap-5">
      <div
        class={cz(
          "flex-c text-xl bg-#79c text-white font-bold py-1 relative",
          onHeaderClick && "cursor-pointer",
        )}
        onClick={onHeaderClick}
      >
        {header}
        {headerInnerContext}
      </div>
      <div class="flex-c gap-4">{children}</div>
    </div>
  );
};

const TextButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Button height={28} asr={1.6} onClick={onClick}>
      <span class={cz(active ? "text-#08f" : "text-#888")}>{label}</span>
    </Button>
  );
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div class="flex-v gap-4 bg-clPageBg text-clPageText p-8">
      <div class="flex-ha gap-3 justify-between">
        <div class="flex-vc font-bold ">
          <h1 class="text-6xl" onClick={actions.emitPresetData}>
            LUNA
          </h1>
          <div class="text-[22px] mt-[-8px]">SYNTHESIZER</div>
        </div>
        <div class="flex-ha gap-5">
          <PresetSelectionPart />
          <RandomizerButton />
        </div>
        {/* <div class="self-start mt-1.5px">
          <OctaveShiftContainer />
        </div> */}
        <ParameterKnob label="VOLUME" paramKey="patchVolume" />
      </div>
      <div class="flex-h gap-8">
        <div class="flex-h gap-6">
          <SectionFrame header="OSC1">
            <ParameterKnob
              label="WAVE1"
              paramKey="osc1Wave"
              max={numOscWaveTypes - 1}
              step={1}
            />
            <ParameterKnob label="DECAY" paramKey="osc1Decay" />
            {/* <ParameterKnob label="DET" paramKey="osc1Detune" /> */}
          </SectionFrame>

          <SectionFrame header="AMP">
            <ParameterSlider label="HEAD" paramKey="ampHead" />
            <ParameterKnob label="RELEASE" paramKey="ampRelease" />
            <div class="flex-v gap-1 self-start">
              <TextButton
                label="LIN"
                active={!parameters.ampExponential}
                onClick={() =>
                  actions.setBoolParameter("ampExponential", false)
                }
              />
              <TextButton
                label="EXP"
                active={parameters.ampExponential}
                onClick={() => actions.setBoolParameter("ampExponential", true)}
              />
              <TextButton
                label="LAST"
                active={parameters.ampReleaseLastOnly}
                onClick={() =>
                  actions.toggleBoolParameter("ampReleaseLastOnly")
                }
              />
            </div>
            {/* <ParameterKnob
              label={parameters.ampReleaseLastOnly ? "R-LAST†" : "R†"}
              paramKey="ampRelease"
              onLabelClick={() =>
                actions.toggleBoolParameter("ampReleaseLastOnly")
              }
            /> */}
          </SectionFrame>
        </div>
      </div>

      <div class="flex-h gap-8 justify-between"></div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
