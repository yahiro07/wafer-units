import { ButtonsSelector } from "@/components/buttons-selector";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import { LabeledBox, SideLabelBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { LinearParameterKeys, numOscWaveTypes } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";
import { cz } from "@/common/css-realm";

const octaveShiftOptions = createPlainSelectorOptions([-2, -1, 0, 1, 2]);

const OctaveShiftContainer = () => {
  const {
    parameters: { voiceOctave },
  } = store.useSnapshot();
  return (
    <SideLabelBox label="OCTAVE">
      <ButtonsSelector
        options={octaveShiftOptions}
        value={voiceOctave}
        onChange={(v) => actions.setParameter("voiceOctave", v)}
        size="narrow"
      />
    </SideLabelBox>
  );
};

const RandomizeButtonContainer = () => {
  return (
    <IconButton
      icon={Icons.Exchange}
      size={24}
      onClick={actions.randomizeParameters}
    />
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
}: {
  header: string;
  children: ComponentChildren;
  onHeaderClick?: () => void;
}) => {
  return (
    <div class="flex-v gap-5">
      <div
        class={cz(
          "flex-c text-xl bg-#79c text-white font-bold py-1",
          onHeaderClick && "cursor-pointer",
        )}
        onClick={onHeaderClick}
      >
        {header}
      </div>
      <div class="flex-c gap-4">{children}</div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  const { parameters } = store.useSnapshot();
  return (
    <div class="flex-v gap-4 bg-clPageBg text-clPageText p-8">
      <div class="flex-ha gap-3 justify-between">
        <h1 class="text-2xl font-bold">LUNA</h1>
        <RandomizeButtonContainer />
        <OctaveShiftContainer />
        <ParameterKnob label="VOL" paramKey="globalVolume" />
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
            <ParameterKnob label="DET" paramKey="oscDetune" />
          </SectionFrame>
          <SectionFrame header="OSC2">
            <ParameterKnob
              label="WAVE2"
              paramKey="osc2Wave"
              max={numOscWaveTypes - 1}
              step={1}
            />
            <ParameterSlider
              label="OCT2"
              paramKey="osc2Octave"
              min={-2}
              max={2}
              step={1}
            />
            {/* <ParameterKnob label="VOL2" paramKey="osc2Volume" /> */}
          </SectionFrame>
        </div>
        <div class="flex-h gap-6">
          <SectionFrame header="HP">
            <ParameterKnob label="CUTOFF" paramKey="hpfCutoff" />
            <ParameterSlider label="Q" paramKey="hpfQ" />
          </SectionFrame>
          <SectionFrame
            header="LP12†"
            onHeaderClick={() => actions.toggleBoolParameter("lpfSteep")}
          >
            <ParameterKnob label="CUTOFF" paramKey="lpfCutoff" />
            <ParameterSlider label="Q" paramKey="lpfQ" />
            <ParameterSlider label="ENV" paramKey="lpfEnvMod" />
          </SectionFrame>
        </div>

        <SectionFrame header="EFFECTS">
          <ParameterKnob label="CHORUS" paramKey="chorusLevel" />
          <ParameterKnob label="DENSE" paramKey="density" />
          <ParameterKnob label="PRESENCE" paramKey="presence" />
        </SectionFrame>
      </div>

      <div class="flex-h gap-8 justify-between">
        <SectionFrame header="AMPLIFIER">
          <ParameterSlider
            label={parameters.attackAltPunch ? "PUNCH†" : "ATTACK†"}
            paramKey="ampAttack"
            onLabelClick={() => actions.toggleBoolParameter("attackAltPunch")}
          />
          <ParameterKnob label="DECAY" paramKey="ampDecay" />
          <ParameterKnob label="SUSTAIN" paramKey="ampSustain" />
          <ParameterKnob label="RELEASE" paramKey="ampRelease" />
        </SectionFrame>

        <SectionFrame header="MODULATION">
          <div class="flex-h gap-6">
            <ParameterKnob
              label={parameters.pitchLfoAltPitchEg ? "P-LFO†" : "P-DOWN†"}
              onLabelClick={() =>
                actions.toggleBoolParameter("pitchLfoAltPitchEg")
              }
              paramKey="pitchLfoDepth"
            />
            <ParameterSlider label="RATE" paramKey="pitchLfoRate" />
            <div />
            <ParameterKnob label="F-LFO" paramKey="filterLfoDepth" />
            <ParameterSlider label="RATE" paramKey="filterLfoRate" />
          </div>
        </SectionFrame>

        <SectionFrame header="REVERB">
          <ParameterKnob label="TIME" paramKey="reverbDecay" />
          <ParameterKnob label="TONE" paramKey="reverbDamp" />
          <ParameterKnob label="MIX" paramKey="reverbMix" />
        </SectionFrame>
      </div>
    </div>
  );
};
