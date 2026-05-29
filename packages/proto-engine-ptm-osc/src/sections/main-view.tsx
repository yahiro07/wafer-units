export function MainPanel() {}
import "./page.css";
import "beams/ax-ui/utility-classes.css";
import { uiActions } from "@/actions";
import { SliderParameter } from "@/components/slider-parameter";
import {
  BooleanParameterKeys,
  NumberParameterKeys,
  OscWave,
} from "@/definitions/parameters";
import { ModuleHeader } from "@/organisms/module-header";
import { WaveformView } from "@/organisms/waveform-view";
import { appState } from "@/store";
import { numFoldingShaperWaves } from "@/synthesis/folding-shaper";

function LinearSlider(props: { paramKey: NumberParameterKeys; label: string }) {
  return (
    <SliderParameter
      label={props.label}
      value={appState.synthParams[props.paramKey]}
      onChange={(v) => uiActions.setSynthParam(props.paramKey, v)}
    />
  );
}

function IntegerSlider(props: {
  paramKey: NumberParameterKeys;
  label: string;
  min: number;
  max: number;
}) {
  return (
    <SliderParameter
      label={props.label}
      value={appState.synthParams[props.paramKey]}
      onChange={(v) => uiActions.setSynthParam(props.paramKey, v)}
      min={props.min}
      max={props.max}
      step={1}
    />
  );
}

function SteppedSlider(props: {
  paramKey: NumberParameterKeys;
  label: string;
  count: number;
}) {
  return (
    <SliderParameter
      label={props.label}
      value={appState.synthParams[props.paramKey]}
      onChange={(v) => uiActions.setSynthParam(props.paramKey, v)}
      min={0}
      max={props.count - 1}
      step={1}
    />
  );
}

function ModuleHeaderWithIndicator(props: {
  title: string;
  paramKey: BooleanParameterKeys;
}) {
  return (
    <ModuleHeader
      title={props.title}
      enabled={appState.synthParams[props.paramKey]}
      withIndicator
      onToggleIndicator={() =>
        uiActions.setSynthParam(
          props.paramKey,
          !appState.synthParams[props.paramKey],
        )
      }
    />
  );
}

export function MainView() {
  return (
    <div class="w-dvw h-dvh flex-c gap-4 bg-gray-700">
      <div class="flex-vc gap-4 bg-zinc-900 w-[800px] h-[380px]">
        <div class="flex-h gap-6">
          <div class="flex-vc gap-1 mb-[-20px]">
            <ModuleHeader title="oscillator" />
            <div class="pt-2 pb-1">
              <WaveformView
                wave={appState.synthParams.oscWave}
                shape={appState.synthParams.oscShape}
              />
            </div>
            <SteppedSlider
              paramKey="oscWave"
              label="osc_wave"
              count={OscWave.count}
            />
            <LinearSlider paramKey="oscShape" label="osc_shape" />
            <IntegerSlider
              paramKey="oscOctave"
              label="osc_octave"
              min={-2}
              max={2}
            />
          </div>
          <div class="flex-vl gap-1">
            <ModuleHeaderWithIndicator title="hpf" paramKey="hpfOn" />
            <LinearSlider paramKey="hpfCutoff" label="hpf_cutoff" />
            <LinearSlider paramKey="hpfPeak" label="hpf_peak" />
            <div class="h-2" />
            <ModuleHeaderWithIndicator title="filter" paramKey="filterOn" />
            <LinearSlider paramKey="filterCutoff" label="filter_cutoff" />
            <LinearSlider paramKey="filterPeak" label="filter_peak" />
          </div>
          <div class="flex-vl gap-1">
            <ModuleHeader title="amplifier" />
            <LinearSlider paramKey="ampAttack" label="amp_attack" />
            <LinearSlider paramKey="ampDecay" label="amp_decay" />
            <LinearSlider paramKey="ampSustain" label="amp_sustain" />
            <LinearSlider paramKey="ampRelease" label="amp_release" />
          </div>
        </div>
        <div class="flex-h gap-6 ">
          <div class="w-[240px] flex-v text-white gap-1 pt-2 justify-end">
            <div class="flex-vc">
              <div>proto-engine-ptm-osc</div>
              <div class="text-white">
                {appState.notes.length > 0
                  ? `${appState.notes.length}voices active`
                  : "--"}
              </div>
            </div>

            <LinearSlider paramKey="masterVolume" label="master" />
          </div>
          <div class="flex-vl gap-1">
            <ModuleHeaderWithIndicator
              title="folding shaper"
              paramKey="foldingShaperOn"
            />
            <SteppedSlider
              paramKey="foldingShaperWave"
              label="shaper_wave"
              count={numFoldingShaperWaves}
            />
            <LinearSlider paramKey="foldingShaperLevel" label="shaper_level" />
          </div>
          <div class="flex-vl gap-1 mt-[-36px]">
            <ModuleHeader title="effects" />
            <LinearSlider paramKey="densityShaperLevel" label="density_level" />
            <LinearSlider paramKey="chorusLevel" label="chorus_level" />
            <LinearSlider paramKey="reverbLevel" label="reverb_level" />
          </div>
        </div>
      </div>
    </div>
  );
}
