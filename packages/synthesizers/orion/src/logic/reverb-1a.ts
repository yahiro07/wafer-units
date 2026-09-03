export function createReverb(audioContext: AudioContext) {
  const now = () => audioContext.currentTime;
  const setTarget = (param: AudioParam, value: number) => {
    param.setTargetAtTime(value, audioContext.currentTime, 0.01);
  };

  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const reverbDry = audioContext.createGain();
  const reverbWet = audioContext.createGain();
  const revDelays = [0.029, 0.037, 0.041, 0.047].map((time) => {
    const delay = audioContext.createDelay(0.1);
    const feedback = audioContext.createGain();
    delay.delayTime.setValueAtTime(time, now());
    feedback.gain.setValueAtTime(0.75, now());
    delay.connect(feedback);
    feedback.connect(delay);
    return { delay, feedback };
  });

  inputNode.connect(reverbDry);
  revDelays.forEach((item) => {
    inputNode.connect(item.delay);
    item.feedback.connect(reverbWet);
  });

  reverbDry.connect(outputNode);
  reverbWet.connect(outputNode);

  reverbWet.gain.setValueAtTime(0.0, now());

  return {
    inputNode,
    outputNode,
    setLevel(level: number): void {
      setTarget(reverbWet.gain, level * 0.45);
    },
    cleanup() {
      reverbWet.disconnect();
      reverbDry.disconnect();
      inputNode.disconnect();
      outputNode.disconnect();
      revDelays.forEach((item) => {
        item.delay.disconnect();
        item.feedback.disconnect();
      });
    },
  };
}
