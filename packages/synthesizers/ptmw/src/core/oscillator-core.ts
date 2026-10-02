type OscillatorCoreSpec = {
  frequency?: number;
  waveform?: PeriodicWave;
  isPlaying?: boolean;
  volume?: number;
  pan?: number;
};

type OscillatorCore = {
  update(spec: OscillatorCoreSpec): void;
};

export function createOscillatorCore(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorCore {
  let osc: OscillatorNode | null = null;
  let lastSetWaveform: PeriodicWave | null = null;
  return {
    update(spec) {
      let oscCreated = false;
      if (!osc && spec.isPlaying) {
        osc = ac.createOscillator();
        oscCreated = true;
        lastSetWaveform = null;
      }
      if (osc) {
        if (spec.frequency) {
          if (osc.frequency.value !== spec.frequency) {
            osc.frequency.value = spec.frequency;
          }
        }
        if (spec.waveform && spec.waveform !== lastSetWaveform) {
          osc.setPeriodicWave(spec.waveform);
          lastSetWaveform = spec.waveform;
        }
        if (oscCreated) {
          osc.connect(destinationNode);
          osc.start();
        }
        if (spec.isPlaying === false) {
          osc.stop();
          osc.disconnect();
          osc = null;
        }
      }
    },
  };
}
