export function createDelay(audioContext: AudioContext) {
  const now = () => audioContext.currentTime;
  const setTarget = (param: AudioParam, value: number) => {
    param.setTargetAtTime(value, audioContext.currentTime, 0.01);
  };

  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const delayDry = audioContext.createGain();
  const delayWet = audioContext.createGain();
  const delayNode = audioContext.createDelay(1.0);
  const delayFeedback = audioContext.createGain();

  inputNode.connect(delayDry);
  inputNode.connect(delayNode);

  // Dotted eighth at 120 BPM as the default.
  delayNode.delayTime.setValueAtTime(0.375, now());
  delayNode.connect(delayFeedback);
  delayFeedback.connect(delayNode);
  delayNode.connect(delayWet);

  delayDry.connect(outputNode);
  delayWet.connect(outputNode);

  delayFeedback.gain.setValueAtTime(0.0, now());
  delayWet.gain.setValueAtTime(0.0, now());

  return {
    inputNode,
    outputNode,
    setLevel(level: number): void {
      setTarget(delayWet.gain, level * 0.5);
      setTarget(delayFeedback.gain, level * 0.65);
    },
    setDelayTime(seconds: number): void {
      setTarget(delayNode.delayTime, seconds);
    },
    cleanup() {
      delayNode.disconnect();
      delayFeedback.disconnect();
      delayWet.disconnect();
      delayDry.disconnect();
      inputNode.disconnect();
      outputNode.disconnect();
    },
  };
}
