import { LabeledBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { LinearParameterKeys } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { Button } from "@/components/button";
import { ParametersLockButton, PatternEditor } from "@/root/pattern-editor";
import { ScalerBoxSC } from "@/components/headless/scaler-box-sc";

const ParameterKnob = ({
  paramKey,
  label,
  min,
  max,
  step,
  onLabelClick,
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  onLabelClick?: () => void;
}) => {
  const { synthParameters } = store.useSnapshot();
  return (
    <LabeledBox label={label} onLabelClick={onLabelClick}>
      <Knob
        value={synthParameters[paramKey]}
        min={min}
        max={max}
        step={step}
        onChange={(v) => actions.setParameter(paramKey, v)}
      />
    </LabeledBox>
  );
};

const ParameterSlider = ({
  paramKey,
  label,
  min,
  max,
  step,
  onLabelClick,
  invertY,
}: {
  paramKey: LinearParameterKeys;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  onLabelClick?: () => void;
  invertY?: boolean;
}) => {
  const { synthParameters } = store.useSnapshot();
  return (
    <LabeledBox label={label} onLabelClick={onLabelClick}>
      <Slider
        value={synthParameters[paramKey]}
        min={min}
        max={max}
        step={step}
        onChange={(v) => actions.setParameter(paramKey, v)}
        invertY={invertY}
      />
    </LabeledBox>
  );
};

const ParametersSection = () => {
  const { standalonePlaying } = store.useSnapshot();
  return (
    <div class="flex-c">
      {false && (
        <Button
          children="Play"
          active={standalonePlaying}
          onClick={actions.togglePlayState}
          height={50}
          asr={1.5}
        />
      )}
      <div class="flex-ha gap-10">
        <div class="flex-vc">
          <h1 class="text-5xl font-bold" onClick={actions.emitPresetData}>
            BS-03
          </h1>
          <span class="text-[20px] mt-[-8px]">ACID BASSLINE</span>
        </div>

        <div class="flex-ha gap-7">
          <ScalerBoxSC scale={0.9}>
            <div class="flex-ha gap-8">
              <ParameterSlider
                label="WAVE"
                paramKey="oscWave"
                max={1}
                step={1}
              />
              <ParameterKnob label="CUTOFF" paramKey="filterCutoff" />
              <ParameterKnob label="PEAK" paramKey="filterPeak" />
              <ParameterKnob label="ENV MOD" paramKey="filterEnvMod" />
              <ParameterKnob label="DECAY" paramKey="ampDecay" />
              <ParameterKnob label="DRIVE" paramKey="drive" />
              <ParameterKnob label="VOLUME" paramKey="patchVolume" />
            </div>
          </ScalerBoxSC>
          <div class="mb-4">
            <ParametersLockButton />
          </div>
        </div>
      </div>
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-3 bg-clPageBg text-clPageText px-10 py-8">
      <ParametersSection />
      <PatternEditor />
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
