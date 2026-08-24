import { LabeledKnob, LabeledSlider } from "@/components/labeled-controls";
import { allOscWaveTypes, OscWaveType } from "@/defs/definitions";
import { actions } from "@/root/actions";
import { store } from "@/root/store";

const allRatios = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
];

const RatioSelectionKnob = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (ratio: number) => void;
}) => {
  const index = allRatios.indexOf(value);
  const handleChange = (newIndex: number) => {
    onChange(allRatios[newIndex]);
  };
  return (
    <LabeledKnob
      label={label}
      value={index}
      onChange={handleChange}
      min={0}
      max={allRatios.length - 1}
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

export const App = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div class="flex-v gap-2">
      <div class="flex-ha gap-5">
        <WaveSelectionSlider
          label="WAVE1"
          value={parameters.osc1Wave}
          onChange={(wave) => actions.patchParameter("osc1Wave", wave)}
        />
        <RatioSelectionKnob
          label={`RATIO: ${parameters.osc1Ratio}`}
          value={parameters.osc1Ratio}
          onChange={(value) => actions.patchParameter("osc1Ratio", value)}
        />
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
