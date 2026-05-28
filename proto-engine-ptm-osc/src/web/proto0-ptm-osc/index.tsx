import { createMemo, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { getHostInterface } from "wus-unit-types";
import { ModuleHeader } from "@/components/module-header";
import { SliderParameter } from "@/components/slider-parameter";
import { seqNumbers } from "@/utils/array-utils";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { mountAppRoot } from "@/utils/mount-app-root";
import { highClip } from "@/utils/number-utils";
import {
  readBufferInterpolated,
  removeDcOffsetInBuffer,
} from "@/utils/synth-buffer-utils";
import {
  midiToFrequency,
  power2,
  tunableSigmoid,
} from "@/utils/synth-math-utils";
import { createChorusEffectEx1 } from "@/web/proto0-ptm-osc/chrous-effect-ex1";
import { createDensityShaperBlock } from "@/web/proto0-ptm-osc/density-shaper";
import { createEnvelopeGeneratorADSR } from "@/web/proto0-ptm-osc/envelope-generator-adsr";
import {
  createHighPassFilterBlock,
  createLowPassFilterBlock,
} from "@/web/proto0-ptm-osc/filters";
import {
  createFoldingShaperBlock,
  numFoldingShaperWaves,
} from "@/web/proto0-ptm-osc/folding-shaper";
import { getOscWaveformPdSaw } from "@/web/proto0-ptm-osc/pd-saw";
import { phaseTweakers } from "@/web/proto0-ptm-osc/phase-tweakers";
import { createReverberator } from "@/web/proto0-ptm-osc/reverbrator";
import { createShaperCurveBufferCache } from "@/web/proto0-ptm-osc/shaper-curve-buffer-cache";
import { createAudioNodeChain } from "@/web/proto0-ptm-osc/webaudio-helper";

const hostInterface = getHostInterface();

type SynthParameters = {
  oscWave: number;
  oscOctave: number;
  oscShape: number;
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  chorusLevel: number;
  reverbLevel: number;
  hpfOn: boolean;
  hpfCutoff: number;
  hpfPeak: number;
  filterOn: boolean;
  filterCutoff: number;
  filterPeak: number;
  foldingShaperOn: boolean;
  foldingShaperWave: number;
  foldingShaperLevel: number;
  densityShaperLevel: number;
  masterVolume: number;
};
function createSynthParameters(): SynthParameters {
  return {
    oscWave: 3,
    oscOctave: 0,
    oscShape: 0,
    ampAttack: 0,
    ampDecay: 0,
    ampSustain: 1,
    ampRelease: 0,
    chorusLevel: 0,
    reverbLevel: 0,
    hpfOn: false,
    hpfCutoff: 0,
    hpfPeak: 0,
    filterOn: false,
    filterCutoff: 1,
    filterPeak: 0,
    foldingShaperOn: false,
    foldingShaperWave: 0,
    foldingShaperLevel: 0,
    densityShaperLevel: 0,
    masterVolume: 0.8,
  };
}
type NumberParameterKeys = {
  [K in keyof SynthParameters]: SynthParameters[K] extends number ? K : never;
}[keyof SynthParameters];
type BooleanParameterKeys = {
  [K in keyof SynthParameters]: SynthParameters[K] extends boolean ? K : never;
}[keyof SynthParameters];

function getNoteFrequency(noteNumber: number, oscOctave: number): number {
  const modNoteNumber = noteNumber + oscOctave * 12;
  return midiToFrequency(modNoteNumber);
}

enum OscWave {
  sawToRect = 0,
  rectPw,
  pdSaw,
  sawSpeed,
  sawAccel,
  sawSfm,
  sawDrill,
  sawSdm,
  sawCreep,
  sawCreep2,
  sawSquash,
  sawSinus,
  sawRidge,
  sawScrew,
  count,
}

const pmtKeyMap: Partial<Record<OscWave, keyof typeof phaseTweakers>> = {
  [OscWave.sawSfm]: "sfm",
  [OscWave.sawSpeed]: "speed",
  [OscWave.sawAccel]: "accel",
  [OscWave.sawDrill]: "drill",
  [OscWave.sawSdm]: "sdm",
  [OscWave.sawCreep]: "creep",
  [OscWave.sawCreep2]: "creep2",
  [OscWave.sawSquash]: "squash",
  [OscWave.sawSinus]: "sinus",
  [OscWave.sawRidge]: "ridge",
  [OscWave.sawScrew]: "screw",
};

function getShapeCurveFn(wave: number, shape: number): (pp: number) => number {
  if (wave === 0) {
    //saw comp
    const k = -shape * 0.9;
    return (pp) => {
      const y = 1 - pp * 2;
      return tunableSigmoid(y, k);
    };
  } else if (wave === 1) {
    //rect pw
    const bp = 0.5 - shape * 0.4;
    return (pp) => (pp < bp ? 1 : -1);
  } else if (wave === 2) {
    //pd saw
    return (pp) => {
      return getOscWaveformPdSaw(pp, shape);
    };
  } else {
    function applyPtm(key: keyof typeof phaseTweakers) {
      return (pp: number) => {
        let [phase] = phaseTweakers[key](pp, shape);
        phase -= Math.floor(phase);
        return 1 - phase * 2;
      };
    }
    const ptmKey = pmtKeyMap[wave as OscWave];
    if (ptmKey) {
      return applyPtm(ptmKey);
    } else {
      //fallback
      return (pp) => Math.sin(pp * Math.PI * 2);
    }
  }
}

function fillShaperCurveBuffer(
  curveBuffer: Float32Array,
  wave: number,
  shape: number,
) {
  const sz = curveBuffer.length;
  const shapeCurveFn = getShapeCurveFn(wave, shape);
  for (let i = 0; i < sz; i++) {
    const pp = i / sz;
    const y = shapeCurveFn(pp);
    curveBuffer[i] = y;
  }
  return curveBuffer;
}
function fillShaperCurveBufferWithDcOffsetRemoval(
  curveBuffer: Float32Array,
  wave: number,
  shape: number,
) {
  fillShaperCurveBuffer(curveBuffer, wave, shape);
  removeDcOffsetInBuffer(curveBuffer);
  return curveBuffer;
}

type SynthesisBus = {
  audioContext: AudioContext;
  voiceDestinationNode: AudioNode;
  synthParameters: SynthParameters;
  finalDestinationNode: AudioNode;
};

function createSynthesisBus(): SynthesisBus {
  const audioContext = hostInterface?.audioContext ?? new AudioContext();
  const voiceDestinationNode = audioContext.createGain();
  const synthParameters = createSynthParameters();
  const finalDestinationNode =
    hostInterface?.audioDestinationNode ?? audioContext.destination;
  return {
    audioContext,
    voiceDestinationNode,
    synthParameters,
    finalDestinationNode,
  };
}

type Voice = {
  start(): void;
  stop(): void;
  updateNodeParameters(): void;
};

const shaper1CurveBufferCache = createShaperCurveBufferCache(
  1024,
  fillShaperCurveBufferWithDcOffsetRemoval,
);

function createOscillatorBlock(audioContext: AudioContext, noteNumber: number) {
  const oscillatorNode = audioContext.createOscillator();
  oscillatorNode.type = "sawtooth";
  const oscShaperNode = audioContext.createWaveShaper();
  oscShaperNode.oversample = "2x";
  const dcBlockerNode = audioContext.createBiquadFilter();
  dcBlockerNode.type = "highpass";
  dcBlockerNode.frequency.value = 10;
  dcBlockerNode.Q.value = Math.SQRT1_2;
  let lastAssignedCurve: Float32Array | null;

  return {
    outputNode: dcBlockerNode,
    setupNodes() {
      oscillatorNode.connect(oscShaperNode);
      oscShaperNode.connect(dcBlockerNode);
      oscillatorNode.start();
    },
    cleanupNodes() {
      oscillatorNode.disconnect();
      oscShaperNode.disconnect();
      oscillatorNode.stop();
    },
    updateNodeParameters(params: {
      wave: number;
      octave: number;
      shape: number;
    }) {
      const freq = getNoteFrequency(noteNumber, params.octave);
      if (oscillatorNode.frequency.value !== freq) {
        oscillatorNode.frequency.value = freq;
      }
      const curve = shaper1CurveBufferCache.update(params.wave, params.shape);
      if (curve !== lastAssignedCurve) {
        oscShaperNode.curve = curve;
        lastAssignedCurve = curve;
      }
    },
  };
}

function createVoice(bus: SynthesisBus, noteNumber: number): Voice {
  const { audioContext, voiceDestinationNode } = bus;
  const oscillators = createOscillatorBlock(audioContext, noteNumber);
  const highPassFilter = createHighPassFilterBlock(audioContext, noteNumber);
  const lowPassFilter = createLowPassFilterBlock(audioContext, noteNumber);
  const foldingShaper = createFoldingShaperBlock(audioContext);
  const masterGainNode = audioContext.createGain();

  const sp = bus.synthParameters;
  const ampEg = createEnvelopeGeneratorADSR(
    audioContext,
    {
      attack: sp.ampAttack,
      decay: sp.ampDecay,
      sustain: sp.ampSustain,
      release: sp.ampRelease,
    },
    {
      attackMaxSec: 2,
      decayMaxSec: 3,
      releaseMaxSec: 3,
    },
  );

  function updateNodeParameters() {
    const { synthParameters: sp } = bus;
    oscillators.updateNodeParameters({
      wave: sp.oscWave,
      octave: sp.oscOctave,
      shape: sp.oscShape,
    });
    highPassFilter.updateNodeParameters({
      enabled: sp.hpfOn,
      cutoff: sp.hpfCutoff,
      peak: sp.hpfPeak,
    });
    lowPassFilter.updateNodeParameters({
      enabled: sp.filterOn,
      cutoff: sp.filterCutoff,
      peak: sp.filterPeak,
    });
    foldingShaper.updateNodeParameters({
      enabled: sp.foldingShaperOn,
      wave: sp.foldingShaperWave,
      level: sp.foldingShaperLevel,
    });
    const vol = power2(sp.masterVolume);
    if (masterGainNode.gain.value !== vol) {
      masterGainNode.gain.value = vol;
    }
  }

  const nodesChain = createAudioNodeChain(
    oscillators,
    highPassFilter,
    lowPassFilter,
    foldingShaper,
    ampEg.node,
    masterGainNode,
    voiceDestinationNode,
  );

  return {
    start() {
      updateNodeParameters();
      nodesChain.connects();
      ampEg.triggerAttack();
    },
    stop() {
      ampEg.triggerRelease();
      setTimeout(
        () => {
          nodesChain.disconnects();
        },
        ampEg.getReleaseTime() * 1000 + 100,
      );
    },
    updateNodeParameters,
  };
}

function createEffectChain(bus: SynthesisBus) {
  const { audioContext } = bus;
  const chorus = createChorusEffectEx1(audioContext);
  const reverb = createReverberator(audioContext);
  const densityShaper = createDensityShaperBlock(audioContext);

  const nodesChain = createAudioNodeChain(
    bus.voiceDestinationNode,
    densityShaper,
    chorus,
    reverb,
    bus.finalDestinationNode,
  );

  return {
    setupNodes() {
      nodesChain.connects();
    },
    cleanupNodes() {
      nodesChain.disconnects();
    },
    updateNodeParameters() {
      const sp = bus.synthParameters;
      densityShaper.updateNodeParameters({
        enabled: sp.densityShaperLevel > 0,
        level: sp.densityShaperLevel,
      });
      chorus.setLevel(sp.chorusLevel);
      reverb.setLevel(sp.reverbLevel);
    },
  };
}

function createSynthesizerEngine() {
  const bus = createSynthesisBus();
  const voices: Record<number, Voice> = {};
  const effects = createEffectChain(bus);
  effects.setupNodes();

  const internal = {
    addNote(noteNumber: number) {
      const voice = createVoice(bus, noteNumber);
      voice.updateNodeParameters();
      voice.start();
      voices[noteNumber] = voice;
    },
    removeNote(noteNumber: number) {
      const voice = voices[noteNumber];
      if (voice) {
        voice.stop();
        delete voices[noteNumber];
      }
    },
    updateNodeParameters() {
      for (const voice of Object.values(voices)) {
        voice.updateNodeParameters();
      }
      effects.updateNodeParameters();
    },
  };

  return {
    async resumeIfNeeded() {
      if (bus.audioContext.state === "suspended") {
        await bus.audioContext.resume();
      }
    },
    setParameter<K extends keyof SynthParameters>(
      param: K,
      value: SynthParameters[K],
    ) {
      bus.synthParameters[param] = value;
      internal.updateNodeParameters();
    },
    noteOn(noteNumber: number) {
      internal.removeNote(noteNumber);
      internal.addNote(noteNumber);
    },
    noteOff(noteNumber: number) {
      internal.removeNote(noteNumber);
    },
  };
}
const synthEngine = createSynthesizerEngine();

const [appState, setAppState] = createStore<{
  synthParams: SynthParameters;
  notes: number[];
}>({
  synthParams: createSynthParameters(),
  notes: [],
});

const uiActions = {
  async noteOn(noteNumber: number) {
    await synthEngine.resumeIfNeeded();
    synthEngine.noteOn(noteNumber);
    setAppState("notes", (prev) => [...prev, noteNumber]);
  },
  async noteOff(noteNumber: number) {
    synthEngine.noteOff(noteNumber);
    setAppState("notes", (prev) => prev.filter((n) => n !== noteNumber));
  },
  setSynthParam<K extends keyof SynthParameters>(
    paramKey: K,
    value: SynthParameters[K],
  ) {
    setAppState("synthParams", paramKey, value);
    synthEngine.setParameter(paramKey, value);
  },
};

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

function mapCurveBufferToPathData(
  curveBuffer: Float32Array,
  nx: number,
  ny: number,
): string {
  const points = [
    [0, ny / 2],
    ...seqNumbers(nx).map((i) => {
      const pp = i / (nx - 1);
      const sample = readBufferInterpolated(
        curveBuffer,
        highClip(pp * curveBuffer.length, curveBuffer.length - 1),
      );
      const y = -sample * 0.5 + 0.5;
      return [i, y * ny];
    }),
    [nx - 1, ny / 2],
  ];

  const pathData = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`),
    "",
  );
  return `${pathData}`;
}

function WaveformView(props: { wave: number; shape: number }) {
  const curveBufferCache = createShaperCurveBufferCache(
    64,
    fillShaperCurveBuffer,
  );
  const nx = 160;
  const ny = 90;
  const pathData = createMemo(() => {
    const curveBuffer = curveBufferCache.update(props.wave, props.shape);
    return mapCurveBufferToPathData(curveBuffer, nx, ny);
  });
  return (
    <div class="bg-[#222]">
      <svg viewBox={`0 0 ${nx} ${ny}`} width={nx} height={ny}>
        <path d={pathData()} stroke="#08f" fill="#08f4" />
      </svg>
    </div>
  );
}

function App() {
  if (hostInterface) {
    hostInterface.setupUnitAgent({
      type: "instrument",
      categoryHint: "synthesizer",
      noteInput: {
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
      },
    });
  } else {
    const closeMidiIn = setupMidiKeyboardInput({
      noteOn(noteNumber) {
        uiActions.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        uiActions.noteOff(noteNumber);
      },
    });
    onCleanup(closeMidiIn);
  }

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

mountAppRoot(() => <App />);
