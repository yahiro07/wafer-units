import { Button } from "@/components/button";
import { LabeledKnob } from "@/components/labeled-controls";
import { createStore } from "snap-store";

type SynthParameters = {
  noteNumber: number;
  ratio: number;
  modDepth: number;
  feedback: number;
};

function createEngine() {
  const audioContext = new AudioContext();

  return {
    play(parameters: SynthParameters) {
      const pr = parameters;
      const noteFrequency = 440 * 2 ** ((pr.noteNumber - 69) / 12);

      const ac = audioContext;
      const modulator = ac.createOscillator();

      const modulatorGain = ac.createGain();
      modulator.type = "sine";
      modulator.frequency.value = noteFrequency * pr.ratio;
      modulator.connect(modulatorGain);

      modulatorGain.gain.value = pr.modDepth * 1000;

      const carrier = ac.createOscillator();
      carrier.type = "sine";
      carrier.frequency.value = noteFrequency;

      modulatorGain.connect(carrier.frequency);

      carrier.connect(ac.destination);
      modulator.start();
      carrier.start();

      setTimeout(() => {
        modulator.stop();
        carrier.stop();
      }, 1000);
    },
  };
}
const engine = createEngine();

const store = createStore<{
  parameters: SynthParameters;
}>({
  parameters: {
    noteNumber: 57,
    ratio: 1,
    modDepth: 0.5,
    feedback: 0,
  },
});

const actions = {
  patchParameter<K extends keyof SynthParameters>(
    key: K,
    value: SynthParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  playTestTone() {
    engine.play(store.state.parameters);
  },
};

export const App = () => {
  const { parameters } = store.useSnapshot();
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
      </div>

      <LabeledKnob
        label="MOD"
        value={parameters.modDepth}
        onChange={(value) => actions.patchParameter("modDepth", value)}
      />
      <Button onClick={actions.playTestTone}>play</Button>
    </div>
  );
};
