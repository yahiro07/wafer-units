import { Button } from "@/components/button";
import { LabeledKnob } from "@/components/labeled-controls";
import { createStore } from "snap-store";
import { useEffect } from "preact/hooks";

type SynthParameters = {
  noteNumber: number;
  ratio: number;
  modDepth: number;
  feedback: number;
  decay1: number;
  decay2: number;
};
const defaultParameters: SynthParameters = {
  noteNumber: 57,
  ratio: 1,
  modDepth: 0.5,
  feedback: 0,
  decay1: 1,
  decay2: 1,
};

function createOperatorEg(destParam: AudioParam) {
  return {
    trigger(time: number, decayTime: number) {
      destParam.setValueAtTime(1, time);
      destParam.exponentialRampToValueAtTime(1e-3, time + decayTime);
      destParam.linearRampToValueAtTime(0, time + decayTime + 0.01);
    },
  };
}

function createVoice(audioContext: AudioContext, parameters: SynthParameters) {
  const pr = parameters;

  const ac = audioContext;
  const carrier = ac.createOscillator();
  carrier.type = "sine";
  const carrierGain = ac.createGain();
  const carrierEg = createOperatorEg(carrierGain.gain);
  carrier.connect(carrierGain);
  carrierGain.connect(ac.destination);

  const modulator = ac.createOscillator();
  modulator.type = "sine";

  const modulatorGain = ac.createGain();
  modulator.connect(modulatorGain);

  const modulatorEgGain = ac.createGain();
  const modulatorEg = createOperatorEg(modulatorEgGain.gain);
  modulatorGain.connect(modulatorEgGain);
  modulatorEgGain.connect(carrier.frequency);

  const feedbackGain = ac.createGain();

  const fbDelay = ac.createDelay(1 / ac.sampleRate);
  fbDelay.delayTime.value = 1 / ac.sampleRate;
  modulatorEgGain.connect(feedbackGain);
  feedbackGain.connect(fbDelay);
  fbDelay.connect(modulator.frequency);

  return {
    affectParameters() {
      const noteFrequency = 440 * 2 ** ((pr.noteNumber - 69) / 12);
      carrier.frequency.value = noteFrequency;
      const modulatorFrequency = noteFrequency * pr.ratio;
      modulator.frequency.value = modulatorFrequency;
      modulatorGain.gain.value = pr.modDepth ** 2 * modulatorFrequency * 4;
      feedbackGain.gain.value = pr.feedback * modulatorFrequency * 2;
    },
    start() {
      modulator.start();
      carrier.start();
      const now = audioContext.currentTime;
      modulatorEg.trigger(now, pr.decay1 * 2);
      carrierEg.trigger(now, pr.decay2 * 2);
    },
    stop() {
      modulator.stop();
      carrier.stop();
    },
  };
}
type Voice = ReturnType<typeof createVoice>;

function createEngine() {
  const audioContext = new AudioContext();
  const parameters = { ...defaultParameters };
  let voice: Voice | null = null;

  return {
    applyParameters(newParameters: SynthParameters) {
      Object.assign(parameters, newParameters);
      voice?.affectParameters();
    },
    play() {
      voice = createVoice(audioContext, parameters);
      voice.affectParameters();
      voice.start();
      return () => {
        voice?.stop();
      };
    },
  };
}
const engine = createEngine();

const store = createStore<{
  parameters: SynthParameters;
  playing: boolean;
}>({
  parameters: { ...defaultParameters },
  playing: false,
});

const actions = {
  patchParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  togglePlaying() {
    store.togglePlaying();
  },
};

export const App = () => {
  const { parameters, playing } = store.useSnapshot();
  useEffect(() => {
    if (playing) {
      return engine.play();
    }
  }, [playing]);
  useEffect(() => {
    engine.applyParameters(parameters);
  }, [parameters]);
  return (
    <div class="flex-v gap-2">
      <div class="flex-ha gap-2">
        <LabeledKnob
          label={`Ratio: ${parameters.ratio}`}
          value={parameters.ratio}
          onChange={(value) => actions.patchParameter("ratio", value)}
          min={1}
          max={10}
          step={0.5}
        />
        <LabeledKnob
          label="FBK"
          value={parameters.feedback}
          onChange={(value) => actions.patchParameter("feedback", value)}
        />
        <LabeledKnob
          label="Decay 1"
          value={parameters.decay1}
          onChange={(value) => actions.patchParameter("decay1", value)}
        />
      </div>
      <div class="flex-ha gap-2">
        <LabeledKnob
          label="MOD"
          value={parameters.modDepth}
          onChange={(value) => actions.patchParameter("modDepth", value)}
        />
        <LabeledKnob
          label="Decay 2"
          value={parameters.decay2}
          onChange={(value) => actions.patchParameter("decay2", value)}
        />
      </div>
      <Button onClick={actions.togglePlaying} active={playing}>
        play
      </Button>
    </div>
  );
};
