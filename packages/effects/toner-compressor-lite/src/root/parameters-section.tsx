import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { CurveGraph } from "@/root/curve-graph";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-controls";
import { parameterMapper } from "@/core/parameter-mapper";
import { resultOf } from "@lib/mu2609/utils/helpers";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  isBipolar?: boolean;
  formatValue?: (value: number) => string;
};

function levelToDb(level: number) {
  return 20 * Math.log10(level);
}
function mapLevelToDbText(level: number) {
  const db = levelToDb(level);
  if (db < -100) return "-∞ dB";
  return `${db.toFixed(0)} dB`;
}

const mapper = parameterMapper;
const parametersSpecs = {
  inputGain: {
    key: "inputGain",
    label: "INPUT",
    formatValue: (value) => {
      const level = mapKnobCurveCenterUnity(value);
      return mapLevelToDbText(level);
    },
  },
  threshold: {
    key: "threshold",
    label: "THRESHOLD",
    formatValue: (value) => {
      const threshold = mapper.mapThreshold(value);
      return `${threshold.toFixed(0)} dB`;
    },
  },
  ratio: {
    key: "ratio",
    label: "RATIO",
    formatValue: (value) => {
      const ratio = mapper.mapRatio(value);
      const numerator = resultOf(() => {
        if (ratio === 1) {
          return "1";
        } else if (ratio < 1.001) {
          return "1.001";
        } else if (ratio < 1.01) {
          return `${ratio.toFixed(3)}`;
        } else if (ratio < 1.1) {
          return `${ratio.toFixed(2)}`;
        } else if (ratio < 10) {
          return `${ratio.toFixed(1)}`;
        } else {
          return `${ratio.toFixed(0)}`;
        }
      });
      return `${numerator} : 1`;
    },
  },
  knee: {
    key: "knee",
    label: "KNEE",
    formatValue: (value) => {
      const knee = mapper.mapKnee(value);
      return `${knee.toFixed(0)} dB`;
    },
  },
  attack: {
    key: "attack",
    label: "ATTACK",
    formatValue: (value) => {
      const attack = mapper.mapAttack(value);
      return `${(attack * 1000).toFixed(0)} ms`;
    },
  },
  release: {
    key: "release",
    label: "RELEASE",
    formatValue: (value) => {
      const release = mapper.mapRelease(value);
      return `${(release * 1000).toFixed(0)} ms`;
    },
  },
  outputGain: {
    key: "outputGain",
    label: "OUTPUT",
    formatValue: (value) => {
      const level = mapKnobCurveCenterUnity(value);
      return mapLevelToDbText(level);
    },
  },
} satisfies Record<keyof EffectParameters, ParameterSpec>;

const ParameterUi = ({ spec }: { spec: ParameterSpec }) => {
  const { parameters } = store.useSnapshot();
  const { key, label, isBipolar, formatValue } = spec;
  const value = parameters[key];
  return (
    <LabeledBox
      key={key}
      label={label}
      valueText={formatValue?.(value) ?? value.toString()}
    >
      <Knob
        value={value}
        onChange={(value) => actions.setParameter(key, value)}
        min={isBipolar ? -1 : 0}
      />
    </LabeledBox>
  );
};

export const ParametersSection = () => {
  return (
    <div class="flex-vc gap-3">
      <div className="flex-ha gap-9">
        <ParameterUi spec={parametersSpecs.inputGain} />
        <ParameterUi spec={parametersSpecs.outputGain} />
        <ParameterUi spec={parametersSpecs.attack} />
        <ParameterUi spec={parametersSpecs.release} />
      </div>
      <div class="flex-ha gap-8">
        <div className="mt-2">
          <CurveGraph />
        </div>
        <ParameterUi spec={parametersSpecs.threshold} />
        <ParameterUi spec={parametersSpecs.ratio} />
        <ParameterUi spec={parametersSpecs.knee} />
      </div>
    </div>
  );
};
