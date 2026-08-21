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
        <div class="flex-h gap-4">
          <ParameterKnob
            label="WAVE1"
            paramKey="osc1Wave"
            max={numOscWaveTypes - 1}
            step={1}
          />
          <ParameterKnob label="DET" paramKey="oscDetune" />
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
        </div>
        <div class="flex-h gap-4">
          <ParameterKnob label="CUTOFF" paramKey="hpfCutoff" />
          <ParameterSlider label="Q" paramKey="hpfQ" />
          <ParameterKnob
            label="CUTOFF"
            // label={parameters.lpfSteep ? "LP12†" : "LP24†"}
            paramKey="lpfCutoff"
            // onLabelClick={() => actions.toggleBoolParameter("lpfSteep")}
          />
          <ParameterSlider label="Q" paramKey="lpfQ" />
          <ParameterSlider label="ENV" paramKey="lpfEnvMod" />
        </div>

        <div class="flex-h gap-4">
          <ParameterKnob label="CHORUS" paramKey="chorusLevel" />
          <ParameterKnob label="DENSE" paramKey="density" />
          <ParameterKnob label="PRESENCE" paramKey="presence" />
        </div>
      </div>

      <div class="flex-h gap-8 justify-between">
        <div class="flex-h gap-4">
          <ParameterSlider
            label={parameters.attackAltPunch ? "PUNCH†" : "ATTACK†"}
            paramKey="ampAttack"
            onLabelClick={() => actions.toggleBoolParameter("attackAltPunch")}
          />
          <ParameterKnob label="DECAY" paramKey="ampDecay" />
          <ParameterKnob label="SUSTAIN" paramKey="ampSustain" />
          <ParameterKnob label="RELEASE" paramKey="ampRelease" />
        </div>

        <div class="flex-h gap-4">
          <ParameterKnob
            label={parameters.pitchLfoAltPitchEg ? "P-LFO†" : "P-DOWN†"}
            onLabelClick={() =>
              actions.toggleBoolParameter("pitchLfoAltPitchEg")
            }
            paramKey="pitchLfoDepth"
          />
          <ParameterSlider label="RATE" paramKey="pitchLfoRate" />
          <ParameterKnob label="F-LFO" paramKey="filterLfoDepth" />
          <ParameterSlider label="RATE" paramKey="filterLfoRate" />
        </div>

        <div class="flex-h gap-4">
          <ParameterKnob label="REVERB" paramKey="reverbMix" />
          <ParameterKnob label="TIME" paramKey="reverbDecay" />
          <ParameterKnob label="TONE" paramKey="reverbDamp" />
        </div>
      </div>
    </div>
  );
};
