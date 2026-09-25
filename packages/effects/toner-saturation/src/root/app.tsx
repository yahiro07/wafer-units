import { EffectParameters } from "@/core/definitions";
import { store, useStoreSnapshot } from "@/root/store";
import { actions } from "@/root/actions";
import { useSetupDrivers } from "@/root/drivers";
import { LabeledBox, Knob } from "@lib/toner-ui";
import { cz } from "@lib/mu2609/utils/cz";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isBipolar?: boolean;
};

const KnobParams: ParameterSpec[] = [
  { key: "top", label: "TOP" },
  { key: "drive", label: "DRIVE" },
];

const ParameterUis = ({
  specs,
  parameters,
}: {
  specs: ParameterSpec[];
  parameters: EffectParameters;
}) => {
  return specs.map(({ key, label, isBipolar }) => (
    <LabeledBox key={key} label={label}>
      <Knob
        value={parameters[key] as number}
        onChange={(value) => actions.setParameter(key, value)}
        min={isBipolar ? -1 : 0}
      />
    </LabeledBox>
  ));
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div
      className={cz(
        "p-4 flex-c bg-clPanelBg text-clPanelText",
        "w-200px h-100px pb-2",
      )}
    >
      <div className="flex-h gap-5">
        <ParameterUis specs={KnobParams} parameters={parameters} />
      </div>
    </div>
  );
};

export const App = () => {
  const { viewActive } = useStoreSnapshot();
  useSetupDrivers();
  if (!viewActive) return null;
  return <PageRoot />;
};
