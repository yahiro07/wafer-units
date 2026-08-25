export function createOscillatorUnit(
  ac: AudioContext,
  destinationNode: AudioNode,
) {
  const osc = ac.createOscillator();
  osc.connect(destinationNode);

  return {
    setFrequency(frequency: number) {
      osc.frequency.value = frequency;
    },
    setWaveform(waveform: OscillatorType) {
      osc.type = waveform;
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
