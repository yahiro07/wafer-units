type SynthParameters = {
  octave: number; //-2,-1,0,1,2
  //other parameters are 0~1
  unisonDetune: number;
  unisonSpread: number;
  unisonMix: number;
  ampRelease: number;
  volume: number;
  phaseRandom: boolean;
};

type Voice = {
  oscillators: OscillatorNode[];
  gains: GainNode[];
  panners: StereoPannerNode[];
  ampEnvelope: GainNode;
  noteNumber: number;
};

export function createSynthesizerSoMono(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
    currentVoice: Voice | null;
  } = {
    parameters: initialParameters,
    currentVoice: null,
  };

  const outputNode = audioContext.createGain();

  const DETUNE_RATIOS = [
    { detune: 0, pan: 0, gain: 1.0 },
    { detune: -10.02, pan: -0.5, gain: 1.0 },
    { detune: 10.02, pan: 0.5, gain: 1.0 },
    { detune: -20.04, pan: -0.75, gain: 1.0 },
    { detune: 20.04, pan: 0.75, gain: 1.0 },
    { detune: -34.97, pan: -1.0, gain: 1.0 },
    { detune: 34.97, pan: 1.0, gain: 1.0 },
  ];

  function createVoice(noteNumber: number, time: number): Voice {
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    const panners: StereoPannerNode[] = [];

    const ampEnvelope = audioContext.createGain();
    ampEnvelope.gain.setValueAtTime(0, time);
    ampEnvelope.gain.linearRampToValueAtTime(state.parameters.volume, time);
    ampEnvelope.connect(outputNode);

    const baseFreq = 440 * Math.pow(2, (noteNumber - 69) / 12);
    const octaveFreq = baseFreq * Math.pow(2, state.parameters.octave);

    DETUNE_RATIOS.forEach((config, index) => {
      const osc = audioContext.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(octaveFreq, time);

      const detuneCents = config.detune * state.parameters.unisonDetune;
      osc.detune.setValueAtTime(detuneCents, time);

      if (!state.parameters.phaseRandom && osc.setPeriodicWave) {
        const real = new Float32Array([0, 0]);
        const imag = new Float32Array([0, 1]);
        const wave = audioContext.createPeriodicWave(real, imag, {
          disableNormalization: false,
        });
        osc.setPeriodicWave(wave);
      }

      const gainNode = audioContext.createGain();
      const gainValue =
        index === 0 ? config.gain : config.gain * state.parameters.unisonMix;
      gainNode.gain.setValueAtTime(gainValue / 7, time);

      const panner = audioContext.createStereoPanner();
      const panValue = config.pan * state.parameters.unisonSpread;
      panner.pan.setValueAtTime(panValue, time);

      osc.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(ampEnvelope);

      osc.start(time);

      oscillators.push(osc);
      gains.push(gainNode);
      panners.push(panner);
    });

    return {
      oscillators,
      gains,
      panners,
      ampEnvelope,
      noteNumber,
    };
  }

  function stopVoice(voice: Voice, time: number) {
    const releaseTime = 0.01 + state.parameters.ampRelease * 2.0;
    const stopTime = time + releaseTime;

    voice.ampEnvelope.gain.cancelScheduledValues(time);
    voice.ampEnvelope.gain.setValueAtTime(voice.ampEnvelope.gain.value, time);
    voice.ampEnvelope.gain.linearRampToValueAtTime(0, stopTime);

    voice.oscillators.forEach((osc) => {
      osc.stop(stopTime + 0.1);
    });

    setTimeout(
      () => {
        voice.oscillators.forEach((osc) => {
          osc.disconnect();
        });
        voice.gains.forEach((gain) => {
          gain.disconnect();
        });
        voice.panners.forEach((panner) => {
          panner.disconnect();
        });
        voice.ampEnvelope.disconnect();
      },
      (stopTime - audioContext.currentTime + 0.2) * 1000,
    );
  }

  return {
    outputNode,
    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;

      if (state.currentVoice) {
        const voice = state.currentVoice;
        const now = audioContext.currentTime;

        voice.ampEnvelope.gain.setValueAtTime(parameters.volume, now);

        DETUNE_RATIOS.forEach((config, index) => {
          const detuneCents = config.detune * parameters.unisonDetune;
          voice.oscillators[index].detune.setValueAtTime(detuneCents, now);

          const gainValue =
            index === 0 ? config.gain : config.gain * parameters.unisonMix;
          voice.gains[index].gain.setValueAtTime(gainValue / 7, now);

          const panValue = config.pan * parameters.unisonSpread;
          voice.panners[index].pan.setValueAtTime(panValue, now);
        });
      }
    },
    noteOn(noteNumber: number, time: number) {
      if (state.currentVoice) {
        stopVoice(state.currentVoice, time);
      }

      state.currentVoice = createVoice(noteNumber, time);
    },
    noteOff(noteNumber: number, time: number) {
      if (state.currentVoice && state.currentVoice.noteNumber === noteNumber) {
        stopVoice(state.currentVoice, time);
        state.currentVoice = null;
      }
    },
    cleanup() {
      if (state.currentVoice) {
        stopVoice(state.currentVoice, audioContext.currentTime);
        state.currentVoice = null;
      }
    },
  };
}
