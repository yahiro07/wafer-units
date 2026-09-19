import {
  allLoopBars,
  allWaveforms,
  EffectParameters,
  Waveform,
} from "@/core/definitions";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-controls";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { cz } from "@lib/mu2609/utils/cz";
import { CurveGraph } from "@/root/curve-graph";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  isSlider?: boolean;
  isBipolar?: boolean;
};

const _KnobParams: ParameterSpec[] = [
  { key: "xOffset", label: "X OFFSET", step: 1 / 16 },
  { key: "curve", label: "CURVE" },
  { key: "v1", label: "V1" },
  { key: "v2", label: "V2" },
];

const LabeledKnob = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <LabeledBox label={label}>
      <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
    </LabeledBox>
  );
};

const _ParameterUis = ({
  specs,
  parameters,
}: {
  specs: ParameterSpec[];
  parameters: EffectParameters;
}) => {
  return specs.map(({ key, label, min, max, step, isSlider, isBipolar }) => (
    <LabeledBox
      key={key}
      label={label}
      className={cz(isSlider && "ml-[-14px]")}
    >
      <Knob
        value={parameters[key] as number}
        onChange={(value) => actions.setParameter(key, value)}
        min={isBipolar ? -1 : min}
        max={max}
        step={step}
      />
    </LabeledBox>
  ));
};

const WaveformSelectionKnob = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = actions.setParameter;
  const { waveform } = parameters;
  let index = allWaveforms.indexOf(waveform);
  if (index === -1) {
    index = 0;
  }
  const setIndex = (index: number) => {
    setParameter("waveform", allWaveforms[index]);
  };
  return (
    <LabeledBox label="WAVE">
      <Knob
        value={index}
        onChange={setIndex}
        min={0}
        max={allWaveforms.length - 1}
        step={1}
      />
    </LabeledBox>
  );
};

const LoopBarsSelectionKnob = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = actions.setParameter;
  const { loopBars } = parameters;
  let index = allLoopBars.indexOf(loopBars);
  if (index === -1) {
    index = 0;
  }
  const setIndex = (index: number) => {
    setParameter("loopBars", allLoopBars[index]);
  };
  return (
    <LabeledBox
      label={`BARS-${loopBars >= 1 ? loopBars : `1/${1 / loopBars}`}`}
    >
      <Knob
        value={index}
        onChange={setIndex}
        min={0}
        max={allLoopBars.length - 1}
        step={1}
      />
    </LabeledBox>
  );
};

const exParamNamesMap: Record<Waveform, [string, string]> = {
  ramp: ["X OFFSET", "CURVE"],
  ramp2: ["X OFFSET", "CURVE"],
  tri: ["X OFFSET", "CURVE"],
  sine: ["X OFFSET", "CURVE"],
  rect: ["X OFFSET", "CURVE"],
  sh: ["X OFFSET", "DIV"],
};

const PageRoot = () => {
  const { parameters } = store.useSnapshot();
  const exParamNames = exParamNamesMap[parameters.waveform];

  return (
    <div class="flex-vc bg-clControlBg bd-clControlEdge p-4 gap-4">
      {/* <div class="text-xl font-bold">SEGMOD</div> */}
      <div>
        <CurveGraph parameters={parameters} />
      </div>
      <div class="flex-ha gap-6">
        <LoopBarsSelectionKnob />
        <WaveformSelectionKnob />
        {/* <ParameterUis specs={KnobParams} parameters={parameters} /> */}
        <LabeledKnob
          label={exParamNames[0]}
          value={parameters.xOffset}
          onChange={(value) => actions.setParameter("xOffset", value)}
          step={1 / 16}
        />
        <LabeledKnob
          label={exParamNames[1]}
          value={parameters.curve}
          onChange={(value) => actions.setParameter("curve", value)}
        />
        <LabeledKnob
          label="V1"
          value={parameters.v1}
          onChange={(value) => actions.setParameter("v1", value)}
        />
        <LabeledKnob
          label="V2"
          value={parameters.v2}
          onChange={(value) => actions.setParameter("v2", value)}
        />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
