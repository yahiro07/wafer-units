import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { CurveGraph } from "@/root/curve-graph";
import { Knob, LabeledBox } from "@lib/toner-ui-dark";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isBipolar?: boolean;
};

const KnobParams: ParameterSpec[] = [
  { key: "inputGain", label: "INPUT" },
  { key: "threshold", label: "THRESHOLD" },
  { key: "ratio", label: "RATIO" },
  { key: "knee", label: "KNEE" },
  { key: "attack", label: "ATTACK" },
  { key: "release", label: "RELEASE" },
  { key: "outputGain", label: "OUTPUT" },
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

export const ParametersSection = () => {
  const { parameters } = store.useSnapshot();
  return (
    <div class="flex-v px-4 gap-2 flex-c">
      <div className="flex-ha gap-8">
        <div className="-mt-3">
          <CurveGraph />
        </div>
        <div class="flex-ha gap-8">
          <ParameterUis specs={KnobParams} parameters={parameters} />
        </div>
      </div>
    </div>
  );
};
