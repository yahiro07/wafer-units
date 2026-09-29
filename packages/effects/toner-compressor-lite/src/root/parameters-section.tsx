import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { CurveGraph } from "@/root/curve-graph";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-controls";
// import { LabeledBox, Knob } from "@lib/toner-ui-dark";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isBipolar?: boolean;
};

const parametersSpecs = {
  inputGain: { key: "inputGain", label: "INPUT" },
  threshold: { key: "threshold", label: "THRESHOLD" },
  ratio: { key: "ratio", label: "RATIO" },
  knee: { key: "knee", label: "KNEE" },
  attack: { key: "attack", label: "ATTACK" },
  release: { key: "release", label: "RELEASE" },
  outputGain: { key: "outputGain", label: "OUTPUT" },
} satisfies Record<keyof EffectParameters, ParameterSpec>;

const ParameterUi = ({ spec }: { spec: ParameterSpec }) => {
  const { parameters } = store.useSnapshot();
  const { key, label, isBipolar } = spec;
  return (
    <LabeledBox key={key} label={label}>
      <Knob
        value={parameters[key] as number}
        onChange={(value) => actions.setParameter(key, value)}
        min={isBipolar ? -1 : 0}
      />
    </LabeledBox>
  );
};

export const ParametersSection = () => {
  return (
    <div class="flex-vc gap-3">
      <div className="flex-ha gap-7">
        <ParameterUi spec={parametersSpecs.inputGain} />
        <ParameterUi spec={parametersSpecs.outputGain} />
        <ParameterUi spec={parametersSpecs.attack} />
        <ParameterUi spec={parametersSpecs.release} />
      </div>
      <div class="flex-ha gap-6">
        <div className="-mt-2">
          <CurveGraph />
        </div>
        <ParameterUi spec={parametersSpecs.threshold} />
        <ParameterUi spec={parametersSpecs.ratio} />
        <ParameterUi spec={parametersSpecs.knee} />
      </div>
    </div>
  );
};
