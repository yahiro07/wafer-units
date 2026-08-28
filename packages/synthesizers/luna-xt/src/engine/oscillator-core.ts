export type OscillatorCore = {
  start(time: number): void;
  stop(): void;
  setFrequency(frequency: number): void;
  setWaveform(waveform: OscillatorType | PeriodicWave): void;
  setVolume(volume: number): void;
  setPanning(panning: number): void;
};

export function createOscillatorCore(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorCore {
  const oscNode = ac.createOscillator();
  const gainNode = ac.createGain();
  const pannerNode = ac.createStereoPanner();

  oscNode.connect(gainNode).connect(pannerNode).connect(destinationNode);

  let lastWave: OscillatorType | PeriodicWave | undefined;

  return {
    start(time: number) {
      oscNode.start(time);
    },
    stop() {
      oscNode.stop();
      oscNode.disconnect();
      gainNode.disconnect();
      pannerNode.disconnect();
    },
    setFrequency(frequency: number) {
      if (oscNode.frequency.value !== frequency) {
        oscNode.frequency.value = frequency;
      }
    },
    setWaveform(waveform: OscillatorType | PeriodicWave) {
      if (waveform !== lastWave) {
        if (typeof waveform === "object") {
          oscNode.setPeriodicWave(waveform);
        } else {
          oscNode.type = waveform;
        }
        lastWave = waveform;
      }
    },
    setVolume(volume: number) {
      gainNode.gain.value = volume;
    },
    setPanning(panning: number) {
      pannerNode.pan.value = panning;
    },
  };
}
