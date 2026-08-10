import { createChorusEffect } from "@/logic/chorus-effect";
import { createReverberator } from "@/logic/reverbrator";

export interface EffectParameters {
  chorus: number; // 0.0 ~ 1.0
  delay: number; // 0.0 ~ 1.0
  reverb: number; // 0.0 ~ 1.0
}

export type EffectChain = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  updateParameters(params: Partial<EffectParameters>): void;
  cleanup(): void;
};

type SubEffect = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  setLevel(level: number): void;
  cleanup(): void;
};

function _createChorus(audioContext: AudioContext): SubEffect {
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

function createDelay(audioContext: AudioContext): SubEffect {
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

function _createReverb(audioContext: AudioContext): SubEffect {
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

export function createEffectChain(audioContext: AudioContext): EffectChain {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  // const chorus = createChorus(audioContext);
  const chorus = createChorusEffect(audioContext);
  const delay = createDelay(audioContext);
  // const reverb = createReverb(audioContext);
  const reverb = createReverberator(audioContext);

  inputNode.connect(chorus.inputNode);
  chorus.outputNode.connect(delay.inputNode);
  delay.outputNode.connect(reverb.inputNode);
  reverb.outputNode.connect(outputNode);

  return {
    inputNode,
    outputNode,
    updateParameters(params: Partial<EffectParameters>): void {
      if (params.chorus !== undefined) {
        chorus.setLevel(params.chorus);
      }

      if (params.delay !== undefined) {
        delay.setLevel(params.delay);
      }

      if (params.reverb !== undefined) {
        reverb.setLevel(params.reverb);
      }
    },
    cleanup() {
      chorus.cleanup();
      delay.cleanup();
      reverb.cleanup();
      inputNode.disconnect();
      outputNode.disconnect();
    },
  };
}
