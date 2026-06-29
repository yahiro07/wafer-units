import { EffectParameters } from "@/common/types";

export function createPingPongDelayEffect(audioContext: AudioContext) {
  const state: {
    bpm: number;
    parameters: EffectParameters;
  } = {
    bpm: 120,
    parameters: {
      isOn: true,
      time: 0.5,
      tone: 0.5,
      lfoOn: true,
      lfoRate: 0.5,
      lfoDepth: 0.5,
      feed: 0.5,
      mix: 0.5,
    },
  };

  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  const splitter = audioContext.createChannelSplitter(2);
  const merger = audioContext.createChannelMerger(2);

  const delayL = audioContext.createDelay(4.0);
  const delayR = audioContext.createDelay(4.0);

  const feedbackGain = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();
  filterNode.type = "lowpass";

  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();

  const lfoNode = audioContext.createOscillator();
  lfoNode.type = "sine";
  const lfoGainL = audioContext.createGain();
  const lfoGainR = audioContext.createGain();

  inputNode.connect(dryGain);
  dryGain.connect(outputNode);

  inputNode.connect(splitter);
  splitter.connect(delayL, 0);
  splitter.connect(delayR, 1);

  delayL.connect(filterNode);
  delayR.connect(filterNode);
  filterNode.connect(feedbackGain);

  //feedback cross connection
  feedbackGain.connect(delayR);
  feedbackGain.connect(delayL);

  delayL.connect(merger, 0, 0);
  delayR.connect(merger, 0, 1);
  merger.connect(wetGain);
  wetGain.connect(outputNode);

  //LFO modulates delay time
  lfoNode.connect(lfoGainL);
  lfoNode.connect(lfoGainR);
  lfoGainL.connect(delayL.delayTime);
  lfoGainR.connect(delayR.delayTime);

  lfoNode.start();

  function applyParameters() {
    const now = audioContext.currentTime;
    const { parameters, bpm } = state;

    if (!parameters.isOn) {
      dryGain.gain.setTargetAtTime(1, now, 0.01);
      wetGain.gain.setTargetAtTime(0, now, 0.01);
      feedbackGain.gain.setTargetAtTime(0, now, 0.01);
      return;
    }

    const beatDuration = 60 / bpm;
    const baseDelayTime = beatDuration * parameters.time;

    delayL.delayTime.setTargetAtTime(baseDelayTime, now, 0.1);
    //delay R is 20ms later than delay L
    delayR.delayTime.setTargetAtTime(baseDelayTime + 0.02, now, 0.1);

    const targetFeed = parameters.feed * 0.96;
    feedbackGain.gain.setTargetAtTime(targetFeed, now, 0.05);

    const targetFreq = 200 * Math.pow(10000 / 200, parameters.tone);
    filterNode.frequency.setTargetAtTime(targetFreq, now, 0.05);

    dryGain.gain.setTargetAtTime(1 - parameters.mix, now, 0.05);
    wetGain.gain.setTargetAtTime(parameters.mix, now, 0.05);

    // LFO modulation
    if (parameters.lfoOn) {
      const targetRate = 0.05 * Math.pow(3 / 0.05, parameters.lfoRate);
      lfoNode.frequency.setTargetAtTime(targetRate, now, 0.1);

      const targetDepth = parameters.lfoDepth * 0.004;
      lfoGainL.gain.setTargetAtTime(targetDepth, now, 0.1);
      //invert the phase of the LFO for the right channel to create a more stereo effect
      lfoGainR.gain.setTargetAtTime(-targetDepth, now, 0.1);
    } else {
      lfoGainL.gain.setTargetAtTime(0, now, 0.1);
      lfoGainR.gain.setTargetAtTime(0, now, 0.1);
    }
  }

  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = parameters;
      applyParameters();
    },
    setBpm(bpm: number) {
      state.bpm = bpm;
      applyParameters();
    },
  };
}
