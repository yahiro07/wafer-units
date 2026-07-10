import { SynthParameters } from "@/root/synth-common";
import { mapUnaryTo } from "@/utils/helpers";

function midiNoteToFrequency(noteNumber: number) {
  return 440 * Math.pow(2, (noteNumber - 69) / 12);
}

const power2 = (x: number) => x * x;

function calcOscFreq(
  noteNumber: number,
  octave: number,
  oscCoarse: number,
  oscFine: number,
) {
  const relNote = octave * 12 + oscCoarse + oscFine;
  return midiNoteToFrequency(noteNumber + relNote);
}

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state = {
    parameters: { ...initialParameters },
  };
  const outputNode = audioContext.createGain();

  function affectParameters() {
    const pr = state.parameters;
    outputNode.gain.value = power2(pr.outputVolume);
  }
  affectParameters();

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;
      affectParameters();
    },
    noteOn(noteNumber: number, _time: number) {
      const time = Math.max(_time, audioContext.currentTime);
      const pr = state.parameters;
      const osc1Freq = calcOscFreq(
        noteNumber,
        pr.octave,
        pr.osc1Coarse,
        pr.osc1Fine,
      );
      const osc2Freq = calcOscFreq(
        noteNumber,
        pr.octave,
        pr.osc2Coarse,
        pr.osc2Fine,
      );
      const decayTime = mapUnaryTo(power2(pr.ampDecay), 0.01, 2);
      const ampGain = audioContext.createGain();

      const osc1 = audioContext.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.value = osc1Freq;
      osc1.start(time);
      osc1.connect(ampGain);

      const osc2 = audioContext.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.value = osc2Freq;
      osc2.start(time);
      osc2.connect(ampGain);

      ampGain.gain.setValueAtTime(1, time);
      const endTime = time + decayTime;
      ampGain.gain.exponentialRampToValueAtTime(0.6, endTime);
      ampGain.connect(outputNode);

      setTimeout(() => {
        const now = audioContext.currentTime;
        ampGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc1.stop(now + 0.1);
        osc2.stop(now + 0.1);
      }, decayTime * 1000);
    },
    noteOff(noteNumber: number, time: number) {},
    cleanup() {},
  };
}
