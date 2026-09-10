import {
  allLoopBars,
  allWaveforms,
  EffectParameters,
} from "@/core/definitions";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-controls";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { Slider } from "@/components/slider";
import { cz } from "@lib/mu2609/utils/cz";

type ParameterSpec = {
  key: keyof EffectParameters;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  isSlider?: boolean;
  isBipolar?: boolean;
};

const KnobParams: ParameterSpec[] = [
  { key: "xOffset", label: "X OFFSET", step: 1 / 16 },
  { key: "curve", label: "CURVE" },
  { key: "v1", label: "V1" },
  { key: "v2", label: "V2" },
];

const ParameterUis = ({
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
      {isSlider ? (
        <Slider
          value={parameters[key] as number}
          onChange={(value) => actions.setParameter(key, value)}
          min={min}
          max={max}
          step={step}
        />
      ) : (
        <Knob
          value={parameters[key] as number}
          onChange={(value) => actions.setParameter(key, value)}
          min={isBipolar ? -1 : min}
          max={max}
          step={step}
        />
      )}
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

const PageRoot = () => {
  const { parameters } = store.useSnapshot();

  return (
    <div class="flex-v bg-clControlBg bd-clControlEdge py-2 px-4 gap-3">
      {/* <div class="text-xl font-bold">SEGMOD</div> */}
      <div class="flex-ha gap-6">
        <WaveformSelectionKnob />
        <LoopBarsSelectionKnob />
        <ParameterUis specs={KnobParams} parameters={parameters} />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
