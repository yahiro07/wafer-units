import { EffectParameters } from "@/core/definitions";
import { store, useStoreSnapshot } from "@/root/store";
import { actions } from "@/root/actions";
import { useSetupDrivers } from "@/root/drivers";
import { LabeledBox, Knob } from "@lib/toner-ui-dark";
import { cz } from "@lib/mu2609/utils/cz";
import { GraphRoot } from "@/root/graph";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isBipolar?: boolean;
  enumMax?: number;
};

const KnobParams: ParameterSpec[] = [
  { key: "curveType", label: "TYPE", enumMax: 3 },
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
  return specs.map(({ key, label, isBipolar, enumMax }) => (
    <LabeledBox key={key} label={label}>
      <Knob
        value={parameters[key] as number}
        onChange={(value) => actions.setParameter(key, value)}
        min={isBipolar ? -1 : 0}
        max={enumMax ?? 1}
        step={enumMax ? 1 : 0.01}
      />
    </LabeledBox>
  ));
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div className={cz("bg-clPanelBg text-clPanelText p-4 pb-2")}>
      <div className="flex-vc gap-4">
        <GraphRoot />
        <div className="flex-h gap-6">
          <ParameterUis specs={KnobParams} parameters={parameters} />
        </div>
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
