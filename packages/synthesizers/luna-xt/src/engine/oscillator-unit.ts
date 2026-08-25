export function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
) {
  const osc = ac.createOscillator();
  osc.connect(destinationNode);

  let lastWave: OscillatorType | PeriodicWave | undefined;

  return {
    setFrequency(frequency: number) {
      if (osc.frequency.value !== frequency) {
        osc.frequency.value = frequency;
      }
    },
    setWaveform(waveform: OscillatorType | PeriodicWave) {
      if (waveform !== lastWave) {
        if (waveform instanceof PeriodicWave) {
          osc.setPeriodicWave(waveform);
        } else {
          osc.type = waveform;
        }
        lastWave = waveform;
      }
    },
    start(time: number) {
      osc.start(time);
    },
    stop(time: number) {
      osc.stop(time);
    },
    cleanup() {
      osc.disconnect();
    },
  };
}
