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

function getOscWaveType(wave: number): OscillatorType {
  return {
    [0]: "sawtooth",
    [1]: "square",
    [2]: "triangle",
    [3]: "sine",
  }[wave as 0 | 1 | 2 | 3] as OscillatorType;
}

function createEnvelopeGenerator(
  destParam: AudioParam,
  configs: {
    attackSec: number;
    decaySec: number;
    releaseSec: number;
  },
) {
  const egParams = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
    hasNaiveWave: false,
  };

  return {
    setParameters(params: {
      attack: number;
      decay: number;
      sustain: number;
      release: number;
      hasNaiveWave: boolean;
    }) {
      Object.assign(egParams, params);
    },
    triggerAttack(time: number) {
      const prAttack = egParams.attack;
      let prDecay = egParams.decay;
      const prSustain = egParams.sustain;
      if (prDecay === 0 && prSustain === 0) {
        prDecay = 0.01;
      }
      const topLevel = prDecay > 0 ? 1 : egParams.sustain;

      destParam.cancelScheduledValues(time);

      if (destParam.value > 0) {
        const jumpTime = egParams.hasNaiveWave ? 0.03 : 0.005;
        destParam.setValueAtTime(destParam.value, time);
        destParam.linearRampToValueAtTime(0, time + jumpTime);
        time += jumpTime;
      }

      const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.005;
      const attackTime = jumpTime + prAttack * configs.attackSec;
      destParam.setValueAtTime(0, time);
      destParam.linearRampToValueAtTime(topLevel, time + attackTime);
      time += attackTime;
      const decayTime = prDecay * configs.decaySec;
      destParam.setValueAtTime(topLevel, time);
      destParam.exponentialRampToValueAtTime(
        Math.max(prSustain, 1e-3),
        time + decayTime,
      );
    },
    triggerRelease(time: number) {
      const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.005;
      const releaseTime = jumpTime + egParams.release * configs.releaseSec;
      destParam.cancelScheduledValues(time);
      destParam.setValueAtTime(destParam.value, time);
      if (releaseTime === jumpTime) {
        destParam.linearRampToValueAtTime(0, time + releaseTime);
      } else {
        destParam.exponentialRampToValueAtTime(1e-4, time + releaseTime);
        destParam.setValueAtTime(0, time + releaseTime);
      }
    },
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

  const ampEg = createEnvelopeGenerator(ampGain.gain, {
    attackSec: 1.5,
    decaySec: 3,
    releaseSec: 3,
  });

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
      osc1.type = getOscWaveType(pr.osc1Wave);
      osc2.type = getOscWaveType(pr.osc2Wave);
      osc1.frequency.value = osc1Freq;
      osc2.frequency.value = osc2Freq;
      osc1Gain.gain.value = 1 - pr.oscMix;
      osc2Gain.gain.value = pr.oscMix;
      ampEg.setParameters({
        attack: pr.ampAttack,
        decay: pr.ampDecay,
        sustain: pr.ampSustain,
        release: pr.ampRelease,
        hasNaiveWave: pr.osc1Wave === 3 || pr.osc2Wave === 3,
      });
    },
    triggerAttack(time: number) {
      ampEg.triggerAttack(time);
    },
    triggerRelease(time: number) {
      ampEg.triggerRelease(time);
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
