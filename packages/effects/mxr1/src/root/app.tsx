import { EffectParameters } from "@/core/definitions";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-controls";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { Slider } from "@/components/slider";
import { cz } from "@/utils/cz";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isSlider?: boolean;
  isBipolar?: boolean;
};

const knobParamsPrimary: ParameterSpec[] = [
  { key: "ch1Pan", label: "PAN", isBipolar: true },
  { key: "ch1FilterFreq", label: "F-FREQ" },
  { key: "ch1FilterQ", label: "Q", isSlider: true },
  { key: "ch1EqTilt", label: "EQ-TILT" },
  { key: "ch1EqFreq", label: "FREQ", isSlider: true },
  { key: "ch1LevelMain", label: "MAIN" },
  { key: "ch1LevelAux", label: "AUX" },
];

const KnobParamsSecondary: ParameterSpec[] = [
  { key: "compThreshold", label: "COMP-TH" },
  { key: "compRatio", label: "RATIO", isSlider: true },
  { key: "compKnee", label: "KNEE", isSlider: true },
  { key: "compAttack", label: "ATK", isSlider: true },
  { key: "compRelease", label: "REL ", isSlider: true },
  { key: "mainGain", label: "MAIN-GAIN" },
  { key: "auxGain", label: "AUX-GAIN" },
];

const ParameterUis = ({
  specs,
  parameters,
}: {
  specs: ParameterSpec[];
  parameters: EffectParameters;
}) => {
  return specs.map(({ key, label, isSlider, isBipolar }) => (
    <LabeledBox
      key={key}
      label={label}
      className={cz(isSlider && "ml-[-14px]")}
    >
      {isSlider ? (
        <Slider
          value={parameters[key] as number}
          onChange={(value) => actions.setParameter(key, value)}
        />
      ) : (
        <Knob
          value={parameters[key] as number}
          onChange={(value) => actions.setParameter(key, value)}
          min={isBipolar ? -1 : 0}
        />
      )}
    </LabeledBox>
  ));
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();

  return (
    <div class="flex-v bg-clControlBg bd-clControlEdge py-2 px-4 gap-3">
      <div class="text-xl font-bold">MXR1</div>
      <div class="flex-ha gap-6">
        <div class="text-20px font-bold">CH1</div>
        <ParameterUis specs={knobParamsPrimary} parameters={parameters} />
      </div>
      <div class="flex-ha gap-8">
        <div class="text-20px font-bold">COMMON</div>
        <ParameterUis specs={KnobParamsSecondary} parameters={parameters} />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
