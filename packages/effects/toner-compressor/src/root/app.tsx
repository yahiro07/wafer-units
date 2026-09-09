import { EffectParameters } from "@/core/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { LabeledBox, Knob, Slider } from "@lib/toner-ui";
import { cz } from "@lib/mu2609/utils/cz";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isSlider?: boolean;
  isBipolar?: boolean;
};

const KnobParams: ParameterSpec[] = [
  { key: "inputGain", label: "INPUT" },
  { key: "compThreshold", label: "THRESHOLD" },
  { key: "compAttack", label: "ATTACK" },
  { key: "compRelease", label: "RELEASE" },
  { key: "outputGain", label: "OUTPUT" },
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
      <div class="text-xl font-bold">COMPRESSOR</div>
      <div class="flex-ha gap-6">
        <ParameterUis specs={KnobParams} parameters={parameters} />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
