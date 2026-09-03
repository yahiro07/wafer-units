import { Button } from "@/components/button";
import { LabeledKnob, LabeledSlider } from "@/components/labeled-controls";
import {
  allOsc1Ratios,
  allOscWaveTypes,
  OscWaveType,
} from "@/defs/definitions";
import { actions } from "@/root/actions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";

const RatioSelectionKnob = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (ratio: number) => void;
}) => {
  const index = allOsc1Ratios.indexOf(value);
  const handleChange = (newIndex: number) => {
    onChange(allOsc1Ratios[newIndex]);
  };
  return (
    <LabeledKnob
      label={label}
      value={index}
      onChange={handleChange}
      min={0}
      max={allOsc1Ratios.length - 1}
      step={1}
    />
  );
};

const WaveSelectionSlider = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: OscWaveType;
  onChange: (value: OscWaveType) => void;
}) => {
  const index = allOscWaveTypes.indexOf(value);
  const handleChange = (newIndex: number) => {
    onChange(allOscWaveTypes[newIndex]);
  };
  return (
    <LabeledSlider
      label={label}
      value={index}
      onChange={handleChange}
      min={0}
      max={allOscWaveTypes.length - 1}
      step={1}
    />
  );
};

const ParametersSection = () => {
  const { parameters } = store.useSnapshot();
  const mode = parameters.osc2ModAltMix ? "mix" : "fm";
  return (
    <div class="flex-v gap-2">
      <div class="flex-ha gap-5">
        <WaveSelectionSlider
          label="WAVE1"
          value={parameters.osc1Wave}
          onChange={(wave) => actions.patchParameter("osc1Wave", wave)}
        />
        {mode === "fm" && (
          <RatioSelectionKnob
            label={`RATIO: ${parameters.osc1Ratio}`}
            value={parameters.osc1Ratio}
            onChange={(value) => actions.patchParameter("osc1Ratio", value)}
          />
        )}
        {mode === "mix" && (
          <LabeledKnob
            label="OCTAVE"
            value={parameters.osc1Octave}
            onChange={(value) => actions.patchParameter("osc1Octave", value)}
            min={-2}
            max={2}
            step={1}
          />
        )}
        <LabeledKnob
          label="DECAY1"
          value={parameters.osc1Decay}
          onChange={(value) => actions.patchParameter("osc1Decay", value)}
        />
        <LabeledKnob
          label={parameters.chorusAltReverb ? "REVERB†" : "CHORUS†"}
          value={parameters.chorusLevel}
          onChange={(value) => actions.patchParameter("chorusLevel", value)}
          onLabelClick={() => actions.toggleBoolParameter("chorusAltReverb")}
        />
        <LabeledSlider
          label="OCT"
          value={parameters.patchOctave}
          onChange={(value) => actions.patchParameter("patchOctave", value)}
          min={-2}
          max={2}
          step={1}
        />
      </div>
      <div class="flex-ha gap-5">
        <WaveSelectionSlider
          label="WAVE2"
          value={parameters.osc2Wave}
          onChange={(wave) => actions.patchParameter("osc2Wave", wave)}
        />
        <LabeledKnob
          label={parameters.osc2ModAltMix ? "MIX†" : "FM†"}
          value={parameters.osc2Mod}
          onChange={(value) => actions.patchParameter("osc2Mod", value)}
          onLabelClick={() => actions.toggleBoolParameter("osc2ModAltMix")}
        />
        <LabeledKnob
          label="DECAY2"
          value={parameters.osc2Decay}
          onChange={(value) => actions.patchParameter("osc2Decay", value)}
        />
        <LabeledKnob
          label="RELEASE"
          value={parameters.ampRelease}
          onChange={(value) => actions.patchParameter("ampRelease", value)}
        />
        <LabeledSlider
          label="VOL"
          value={parameters.patchVolume}
          onChange={(value) => actions.patchParameter("patchVolume", value)}
        />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return (
    <div class="flex-v gap-2 bg-clPageBg pt-1.5 text-clPageText">
      <div class="flex-h justify-between">
        <h1 class="text-xl" onClick={actions.copyParametersToClipboard}>
          Capella Synthesizer
        </h1>
        <div class="flex-ha gap-2">
          <Button height={26} asr={2.5} onClick={actions.resetParameters}>
            INIT
          </Button>
          <Button height={26} asr={2.5} onClick={actions.randomizeParameters}>
            RND
          </Button>
        </div>
      </div>
      <ParametersSection />
    </div>
  );
};
