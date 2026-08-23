export function createChorus(audioContext: AudioContext) {
  const now = () => audioContext.currentTime;
  const setTarget = (param: AudioParam, value: number) => {
    param.setTargetAtTime(value, audioContext.currentTime, 0.01);
  };

  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  const chorusDry = audioContext.createGain();
  const chorusWetL = audioContext.createGain();
  const chorusWetR = audioContext.createGain();
  const delayL = audioContext.createDelay(0.1);
  const delayR = audioContext.createDelay(0.1);
  const chorusLFO = audioContext.createOscillator();
  const lfoGainL = audioContext.createGain();
  const lfoGainR = audioContext.createGain();
  const stereoMixL = audioContext.createGain();
  const stereoMixR = audioContext.createGain();

  inputNode.connect(chorusDry);
  inputNode.connect(delayL);
  inputNode.connect(delayR);

  chorusLFO.frequency.setValueAtTime(0.43, now());
  lfoGainL.gain.setValueAtTime(0.002, now());
  lfoGainR.gain.setValueAtTime(-0.002, now());

  chorusLFO.connect(lfoGainL).connect(delayL.delayTime);
  chorusLFO.connect(lfoGainR).connect(delayR.delayTime);

  delayL.delayTime.setValueAtTime(0.025, now());
  delayR.delayTime.setValueAtTime(0.028, now());

  delayL.connect(chorusWetL);
  delayR.connect(chorusWetR);

  chorusDry.connect(stereoMixL);
  chorusDry.connect(stereoMixR);
  chorusWetL.connect(stereoMixL);
  chorusWetR.connect(stereoMixR);
  stereoMixL.connect(outputNode);
  stereoMixR.connect(outputNode);

  chorusWetL.gain.setValueAtTime(0.0, now());
  chorusWetR.gain.setValueAtTime(0.0, now());
  chorusDry.gain.setValueAtTime(1.0, now());

  chorusLFO.start(now());

  return {
    inputNode,
    outputNode,
    setLevel(level: number): void {
      setTarget(chorusWetL.gain, level * 0.8);
      setTarget(chorusWetR.gain, level * 0.8);
      setTarget(chorusDry.gain, 1.0 - level * 0.2);
    },
    cleanup() {
      chorusLFO.stop();
      chorusLFO.disconnect();
      lfoGainL.disconnect();
      lfoGainR.disconnect();
      delayL.disconnect();
      delayR.disconnect();
    },
  };
}
