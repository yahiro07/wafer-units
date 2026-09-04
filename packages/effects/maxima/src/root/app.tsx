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

const KnobParams: ParameterSpec[] = [{ key: "level", label: "LEVEL" }];

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
      <div class="text-xl font-bold">MXR2</div>
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
