import { SynthParameters } from "@/root/synth-common";

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

type SynthesisBus = {
  audioContext: AudioContext;
  voiceDestinationNode: AudioNode;
  parameters: SynthParameters;
};

function createSynthesisBus(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
): SynthesisBus {
  const voiceDestinationNode = audioContext.createGain();
  const parameters = initialParameters;
  return {
    audioContext,
    voiceDestinationNode,
    parameters,
  };
}

function createVoice(bus: SynthesisBus) {
  const { audioContext } = bus;
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const osc1Gain = audioContext.createGain();
  const osc2Gain = audioContext.createGain();
  osc1Gain.gain.value = 0.5;
  osc2Gain.gain.value = 0.5;
  const ampGain = audioContext.createGain();
  ampGain.gain.value = 0;

  const state = {
    noteNumber: -1,
  };

  const internal = {
    applyParameters() {
      if (state.noteNumber === -1) return;
      const pr = bus.parameters;
      const osc1Freq = calcOscFreq(
        state.noteNumber,
        pr.octave,
        pr.osc1Coarse,
        pr.osc1Fine,
      );
      const osc2Freq = calcOscFreq(
        state.noteNumber,
        pr.octave,
        pr.osc2Coarse,
        pr.osc2Fine,
      );
      osc1.type = "sawtooth";
      osc2.type = "sawtooth";
      // const tt = audioContext.currentTime + 0.01;
      osc1.frequency.value = osc1Freq;
      osc2.frequency.value = osc2Freq;
      osc1Gain.gain.value = pr.oscMix;
      osc2Gain.gain.value = 1 - pr.oscMix;
    },
    triggerAttack(time: number) {
      ampGain.gain.cancelScheduledValues(time);
      ampGain.gain.setValueAtTime(1, time);

      const pr = bus.parameters;
      const isSustain = pr.ampDecay === 1;
      if (!isSustain) {
        const decayTime = 0.01 + power2(pr.ampDecay) * 4;
        ampGain.gain.exponentialRampToValueAtTime(1e-3, time + decayTime);
      }
    },
    triggerRelease(time: number) {
      const pr = bus.parameters;
      const releaseTime = 0.01 + power2(pr.ampRelease) * 4;
      // ampGain.gain.cancelScheduledValues(time);
      ampGain.gain.exponentialRampToValueAtTime(1e-3, time + releaseTime);
    },
  };

  return {
    connects() {
      osc1.connect(osc1Gain);
      osc2.connect(osc2Gain);
      osc1Gain.connect(ampGain);
      osc2Gain.connect(ampGain);
      ampGain.connect(bus.voiceDestinationNode);
      osc1.start();
      osc2.start();
    },
    disconnects() {
      osc1.stop();
      osc2.stop();
      osc1.disconnect();
      osc2.disconnect();
      osc1Gain.disconnect();
      osc2Gain.disconnect();
      ampGain.disconnect();
    },
    applyParameters: internal.applyParameters,
    noteOn(noteNumber: number, _time: number) {
      const time = Math.max(_time, audioContext.currentTime);
      state.noteNumber = noteNumber;
      internal.applyParameters();
      internal.triggerAttack(time);
    },
    noteOff(_time: number) {
      const time = Math.max(_time, audioContext.currentTime);
      internal.triggerRelease(time);
      state.noteNumber = -1;
    },
  };
}

export function createSynthesizer(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const bus = createSynthesisBus(audioContext, initialParameters);
  const outputNode = audioContext.createGain();

  const voice = createVoice(bus);

  function affectParameters() {
    const pr = bus.parameters;
    outputNode.gain.value = power2(pr.outputVolume);
    voice.applyParameters();
  }
  affectParameters();

  let latestNoteNumber = -1;

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      Object.assign(bus.parameters, parameters);
      affectParameters();
    },
    noteOn(noteNumber: number, time: number) {
      voice.noteOn(noteNumber, time);
      latestNoteNumber = noteNumber;
    },
    noteOff(noteNumber: number, time: number) {
      if (noteNumber === latestNoteNumber) {
        voice.noteOff(time);
        latestNoteNumber = -1;
      }
    },
    wakeUp() {
      voice.connects();
      bus.voiceDestinationNode.connect(outputNode);
    },
    teardown() {
      voice.disconnects();
      bus.voiceDestinationNode.disconnect();
    },
  };
}
