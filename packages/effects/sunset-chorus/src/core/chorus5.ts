import { IChorusEffect } from "@/core/effect-types";

export function createChorus5(audioContext: AudioContext): IChorusEffect {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  // 1. Dry signal route
  const dryNode = audioContext.createGain();
  inputNode.connect(dryNode);
  dryNode.connect(outputNode);

  // 2. Precise parameter design for 7 taps
  // Using deeper delay (wider modulation width) for outer taps,
  // and spread across different prime-like ratios to avoid LFO synchronization.
  const tapConfigs = [
    // --- Outer layer (responsible for wide stereo spread and deep detune) ---
    { baseDelay: 0.028, lfoFreq: 0.13, modDepth: 0.007, pan: -0.95 }, // Tap 1: Far left
    { baseDelay: 0.026, lfoFreq: 0.19, modDepth: 0.0065, pan: 0.95 }, // Tap 2: Far right

    // --- Middle layer (responsible for dense unison feel and shimmering) ---
    { baseDelay: 0.019, lfoFreq: 0.31, modDepth: 0.0045, pan: -0.6 }, // Tap 3: Left-mid
    { baseDelay: 0.022, lfoFreq: 0.23, modDepth: 0.0055, pan: 0.6 }, // Tap 4: Right-mid

    // --- Inner layer (responsible for smooth connection with dry signal and thickening the core) ---
    { baseDelay: 0.012, lfoFreq: 0.47, modDepth: 0.003, pan: -0.25 }, // Tap 5: Left-inner
    { baseDelay: 0.015, lfoFreq: 0.37, modDepth: 0.0035, pan: 0.25 }, // Tap 6: Right-inner

    // --- Center layer (reinforcing center detune components) ---
    { baseDelay: 0.017, lfoFreq: 0.53, modDepth: 0.0025, pan: 0.0 }, // Tap 7: Center
  ];

  // Node to manage overall volume of all taps
  const wetMasterNode = audioContext.createGain();
  wetMasterNode.connect(outputNode);

  // 3. Generation and connection of each tap
  const lfos: OscillatorNode[] = [];

  tapConfigs.forEach((config) => {
    const delayNode = audioContext.createDelay();
    const pannerNode = audioContext.createStereoPanner();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    // Audio route connections
    inputNode.connect(delayNode);
    delayNode.connect(pannerNode);
    pannerNode.connect(wetMasterNode);

    // Parameter settings
    delayNode.delayTime.value = config.baseDelay;
    pannerNode.pan.value = config.pan;

    // Modulation settings
    lfo.type = "sine";
    lfo.frequency.value = config.lfoFreq;
    lfoGain.gain.value = config.modDepth;

    lfo.connect(lfoGain);
    lfoGain.connect(delayNode.delayTime);

    // Phase randomization (allow more than one period)
    lfo.start(audioContext.currentTime + Math.random() * 2.0);
    lfos.push(lfo);
  });

  // 4. Mix balance adjustment function
  function setLevel(value: number, force?: boolean) {
    // value: 0.0 to 1.0
    if (force || wetMasterNode.gain.value !== value) {
      // When as many as 7 signals overlap, the overall volume increases significantly (risk of clipping),
      // so we correct it using a multiplier (around 0.35 to 0.45) based on 1/7 (~0.14) while maintaining presence.
      // * Adjust as needed according to the input signal level.
      wetMasterNode.gain.value = value * 0.4;

      // Maintain attack clarity by keeping some of the centered dry signal core
      dryNode.gain.value = 1.0 - value * 0.3;
    }
  }
  setLevel(0);

  return {
    inputNode,
    outputNode,
    setLevel,
    cleanupNodes() {
      for (const lfo of lfos) {
        lfo.stop();
      }
    },
  };
}
