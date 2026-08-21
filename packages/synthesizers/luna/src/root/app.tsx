import { ButtonsSelector } from "@/components/buttons-selector";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import {
  LabeledKnob,
  LabeledSlider,
  SideLabelBox,
} from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { LinearParameterKeys, numOscWaveTypes } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Button } from "@/components/button";

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
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const { parameters } = store.useSnapshot();
  return (
    <LabeledKnob
      label={label}
      value={parameters[paramKey]}
      min={min}
      max={max}
      step={step}
      onChange={(v) => actions.setParameter(paramKey, v)}
    />
  );
};

const ParameterSlider = ({
  paramKey,
  label,
  min,
  max,
  step,
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const { parameters } = store.useSnapshot();
  return (
    <LabeledSlider
      label={label}
      value={parameters[paramKey]}
      min={min}
      max={max}
      step={step}
      onChange={(v) => actions.setParameter(paramKey, v)}
    />
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
      </div>
      <div class="flex-h gap-8">
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
        <ParameterKnob
          label="OCT2"
          paramKey="osc2Octave"
          min={-2}
          max={2}
          step={1}
        />
        <ParameterKnob label="VOL2" paramKey="osc2Volume" />
      </div>
      <div class="flex-h gap-8">
        <ParameterKnob label="HPF" paramKey="hpfCutoff" />
        <ParameterKnob label="Q" paramKey="hpfQ" />
        <ParameterKnob label="LPF" paramKey="lpfCutoff" />
        <ParameterKnob label="Q" paramKey="lpfQ" />
        <Button
          active={parameters.lpfSteep}
          onClick={() => actions.setParameter("lpfSteep", !parameters.lpfSteep)}
        >
          LP24
        </Button>
        <ParameterKnob label="ENV" paramKey="lpfEnvMod" />
      </div>
      <div class="flex-h gap-8">
        <Button
          active={parameters.attackAltPunch}
          onClick={() =>
            actions.setParameter("attackAltPunch", !parameters.attackAltPunch)
          }
        >
          P
        </Button>
        <ParameterKnob label="A" paramKey="ampAttack" />
        <ParameterKnob label="D" paramKey="ampDecay" />
        <ParameterKnob label="S" paramKey="ampSustain" />
        <ParameterKnob label="R" paramKey="ampRelease" />
      </div>
      <div class="flex-h gap-8">
        <Button
          active={parameters.pitchLfoAltPitchEg}
          onClick={() =>
            actions.setParameter(
              "pitchLfoAltPitchEg",
              !parameters.pitchLfoAltPitchEg,
            )
          }
        >
          P-EG
        </Button>
        <ParameterKnob label="P-LFO" paramKey="pitchLfoDepth" />
        <ParameterKnob label="F" paramKey="pitchLfoRate" />
        <ParameterKnob label="F-LFO" paramKey="filterLfoDepth" />
        <ParameterKnob label="F" paramKey="filterLfoRate" />
        <ParameterKnob label="DENSE" paramKey="density" />
        <ParameterKnob label="VOL" paramKey="globalVolume" />
      </div>
      <div class="flex-h gap-8">
        <ParameterKnob label="CHORUS" paramKey="chorusLevel" />
        <ParameterKnob label="REVERB" paramKey="reverbMix" />
        <ParameterKnob label="TIME" paramKey="reverbDecay" />
        <ParameterKnob label="TONE" paramKey="reverbDamp" />
        <ParameterKnob label="PRESENCE" paramKey="presence" />
        <ParameterSlider label="A" paramKey="ampAttack" />
      </div>
    </div>
  );
};
