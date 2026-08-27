import { LabeledBox } from "@/components/labeled-controls";
import { actions } from "@/root/actions";
import { LinearParameterKeys } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { Slider } from "@/components/slider";
import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";
import { cz } from "@/common/css-realm";
import { Button } from "@/components/button";
import { appEnvs } from "@/common/app-envs";
import { PatternEditor } from "@/root/pattern-editor";
import { ScalerBoxSC } from "@/components/headless/scaler-box-sc";

// const presetOptions = createPlainSelectorOptions(allPresetKeys);

// const PresetSelectionPart = () => {
//   const { presetKey } = store.useSnapshot();
//   return (
//     <div class="flex-ha gap-1.5">
//       <Button asr={1.3} onClick={() => actions.shiftPreset(-1)}>
//         <i class="ri-arrow-left-s-line text-2xl" />
//       </Button>
//       <Selector
//         value={presetKey}
//         onChange={actions.setPreset}
//         options={presetOptions}
//         height={44}
//       />
//       <Button asr={1.3} onClick={() => actions.shiftPreset(1)}>
//         <i class="ri-arrow-right-s-line text-2xl" />
//       </Button>
//     </div>
//   );
// };

const RandomizerButton = () => {
  return (
    <Button asr={1.9} onClick={actions.randomizeParameters}>
      <div class="flex-ha gap-1">
        <span>RND</span>
        <i class="ri-dice-3-line text-xl" />
      </div>
    </Button>
  );
};

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

const SectionFrame = ({
  header,
  children,
  onHeaderClick,
  headerInnerContent,
}: {
  header: string;
  children: ComponentChildren;
  onHeaderClick?: () => void;
  headerInnerContent?: ComponentChildren;
}) => {
  return (
    <div class="flex-v gap-5">
      <div
        class={cz(
          "flex-c text-xl bg-#79c text-white font-bold px-2 py-1",
          headerInnerContent ? "justify-between" : undefined,
          onHeaderClick && "cursor-pointer",
        )}
        onClick={onHeaderClick}
      >
        {header}
        {headerInnerContent}
      </div>
      <div class="flex-c gap-4">{children}</div>
    </div>
  );
};

const TextButton = ({
  label,
  active,
  onClick,
  asr = 1.6,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  asr?: number;
}) => {
  return (
    <Button height={28} asr={asr} onClick={onClick}>
      <span class={cz(active ? "text-#08f" : "text-#888")}>{label}</span>
    </Button>
  );
};

const HeaderTextButton = ({
  label,
  active = true,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => {
  const height = 28;
  return (
    <button
      onClick={onClick}
      style={{ height }}
      class={cz(
        "text-[19px] font-500 cursor-pointer",
        "hover:opacity-90",
        active ? "text-#fff" : "text-#abc",
      )}
    >
      <span>{label}</span>
    </button>
  );
};

// function useOscParamKeys(oscId: OscId): {
//   octave: LinearParameterKeys;
//   wave: LinearParameterKeys;
//   unison: LinearParameterKeys;
//   spread: BoolParameterKeys;
//   detune: LinearParameterKeys;
//   decay: LinearParameterKeys;
//   sub: BoolParameterKeys;
//   mix: LinearParameterKeys;
// } {
//   if (oscId === "osc1") {
//     return {
//       octave: "osc1Octave",
//       wave: "osc1Wave",
//       unison: "osc1Unison",
//       spread: "osc1Spread",
//       detune: "osc1Detune",
//       decay: "osc1Decay",
//       sub: "osc1Sub",
//       mix: "osc1Mix",
//     };
//   } else {
//     return {
//       octave: "osc2Octave",
//       wave: "osc2Wave",
//       unison: "osc2Unison",
//       spread: "osc2Spread",
//       detune: "osc2Detune",
//       decay: "osc2Decay",
//       sub: "osc2Sub",
//       mix: "osc2Mix",
//     };
//   }
// }

// const OscSection = ({ oscId }: { oscId: OscId }) => {
//   const { parameters } = store.useSnapshot();
//   const pk = useOscParamKeys(oscId);
//   const mixLabel = { 0: "1", 1: "2", 2: "F" }[parameters[pk.mix]] ?? "";

//   return (
//     <SectionFrame
//       header={oscId === "osc1" ? "OSCILLATOR 1" : "OSCILLATOR 2"}
//       headerInnerContent={
//         <div class="flex-ha gap-4">
//           <HeaderTextButton
//             label="SPR"
//             active={parameters[pk.spread]}
//             onClick={() => actions.toggleBoolParameter(pk.spread)}
//           />
//           <HeaderTextButton
//             label="SUB"
//             active={parameters[pk.sub]}
//             onClick={() => actions.toggleBoolParameter(pk.sub)}
//           />
//           <HeaderTextButton
//             label={`MIX-${mixLabel}`}
//             onClick={() => actions.shiftOscMix(oscId)}
//           />
//         </div>
//       }
//     >
//       <ParameterSlider
//         label="OCT"
//         paramKey={pk.octave}
//         min={-2}
//         max={2}
//         step={1}
//       />
//       <ParameterSlider
//         label="UNI"
//         paramKey={pk.unison}
//         min={1}
//         max={5}
//         step={1}
//       />
//       <ParameterKnob label="WAVE" paramKey={pk.wave} max={2} step={1} />
//       <ParameterKnob
//         label="DETUNE"
//         // label={parameters[pk.spread] ? "DET-SP†" : "DET†"}
//         paramKey={pk.detune}
//         // onLabelClick={() => actions.toggleBoolParameter(pk.spread)}
//       />
//       <ParameterKnob label="DECAY" paramKey={pk.decay} />
//     </SectionFrame>
//   );
// };

// const PageRoot = () => {
//   const { parameters } = store.useSnapshot();
//   const isDebug = appEnvs.isDevelopment;
//   return (
//     <div class="flex-v gap-4 bg-clPageBg text-clPageText p-8">
//       <div class="flex-ha gap-3 justify-between">
//         <div class="flex-vc font-bold ">
//           <h1 class="text-6xl" onClick={actions.emitPresetData}>
//             LUNA XT
//           </h1>
//           <div class="text-[22px] mt-[-8px]">SYNTHESIZER</div>
//         </div>
//         <div class="flex-ha gap-5">
//           <PresetSelectionPart />
//           <RandomizerButton />
//         </div>
//         <ParameterKnob label="VOLUME" paramKey="patchVolume" />
//       </div>
//       <div class="flex-h gap-8">
//         <div class="flex-h gap-6">
//           <OscSection oscId="osc1" />

//           <SectionFrame
//             header="AMP"
//             headerInnerContent={
//               <div class="flex-ha gap-3">
//                 <HeaderTextButton
//                   label={parameters.ampExponential ? "EXP" : "LIN"}
//                   onClick={() => actions.toggleBoolParameter("ampExponential")}
//                 />
//               </div>
//             }
//           >
//             <ParameterSlider label="PUNCH" paramKey="ampHead" />
//             <ParameterKnob label="RELEASE" paramKey="ampRelease" />
//             {false && (
//               <div class="flex-v gap-1 self-start">
//                 <TextButton
//                   label="LIN"
//                   active={!parameters.ampExponential}
//                   onClick={() =>
//                     actions.setBoolParameter("ampExponential", false)
//                   }
//                 />
//                 <TextButton
//                   label="EXP"
//                   active={parameters.ampExponential}
//                   onClick={() =>
//                     actions.setBoolParameter("ampExponential", true)
//                   }
//                 />
//                 <TextButton
//                   label="LAST"
//                   active={parameters.ampReleaseLastOnly}
//                   onClick={() =>
//                     actions.toggleBoolParameter("ampReleaseLastOnly")
//                   }
//                 />
//               </div>
//             )}
//           </SectionFrame>
//           <SectionFrame
//             header="FILTER"
//             headerInnerContent={
//               <div class="flex-ha gap-3">
//                 <HeaderTextButton
//                   label={parameters.lpfSteep ? "LP24" : "LP12"}
//                   active
//                   onClick={() => actions.toggleBoolParameter("lpfSteep")}
//                 />
//               </div>
//             }
//           >
//             <ParameterKnob label="CUTOFF" paramKey="lpfCutoff" />
//             <ParameterSlider label="Q" paramKey="lpfPeak" />
//             <ParameterSlider label="DECAY" paramKey="lpfDecay" />
//           </SectionFrame>
//         </div>
//       </div>
//       <div class="flex-h gap-6">
//         <OscSection oscId="osc2" />
//         <SectionFrame header="CONTROL">
//           <div class="flex-h gap-7">
//             <ParameterSlider label="OSCMIX" paramKey="oscMix" invertY />
//             <ParameterSlider label="DENSE" paramKey="density" />
//           </div>
//         </SectionFrame>
//         {isDebug && (
//           <SectionFrame header="DEBUG">
//             <ParameterSlider
//               label="SAT"
//               paramKey="_saturation"
//               min={0}
//               max={2}
//               step={1}
//             />
//             <ParameterSlider label="PRESS" paramKey="press" />
//           </SectionFrame>
//         )}
//       </div>

//       <div class="flex-h gap-8 justify-between"></div>
//     </div>
//   );
// };

const ParametersSection = () => {
  const { standalonePlaying } = store.useSnapshot();
  const isDebug = appEnvs.isDevelopment;
  return (
    <div class="flex-c gap-8">
      <Button
        children="Play"
        active={standalonePlaying}
        onClick={actions.togglePlayState}
        height={50}
        asr={1.5}
      />
      <ScalerBoxSC scale={0.9}>
        <div class="flex-ha gap-8">
          <ParameterSlider label="WAVE" paramKey="oscWave" max={1} step={1} />
          <ParameterKnob label="CUTOFF" paramKey="filterCutoff" />
          <ParameterKnob label="PEAK" paramKey="filterPeak" />
          <ParameterKnob label="ENV MOD" paramKey="filterEnvMod" />
          <ParameterKnob label="DECAY" paramKey="ampDecay" />
          <ParameterKnob label="DRIVE" paramKey="density" />
          <ParameterKnob label="VOLUME" paramKey="patchVolume" />
          {isDebug && (
            <ParameterSlider
              label="SAT"
              paramKey="_saturation"
              min={0}
              max={2}
              step={1}
            />
          )}
        </div>
      </ScalerBoxSC>
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-3 bg-clPageBg text-clPageText p-8">
      <ParametersSection />
      <PatternEditor />
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
