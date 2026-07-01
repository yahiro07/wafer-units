import { EffectParameters } from "@/common/definitions";

export function createChannelStripEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state: {
    parameters: EffectParameters;
  } = {
    parameters: initialParameters,
  };

  // 1. Input/output and bypass control nodes
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  // Gain nodes for bypass (ON/OFF) switching
  const effectBranch = audioContext.createGain();
  const bypassBranch = audioContext.createGain();

  // 2. Create effect nodes
  const lowCutNode = audioContext.createBiquadFilter();
  lowCutNode.type = "highpass";

  const eqLowNode = audioContext.createBiquadFilter();
  eqLowNode.type = "lowshelf";
  eqLowNode.frequency.value = 200; // Control frequencies below 200Hz

  const eqMidNode = audioContext.createBiquadFilter();
  eqMidNode.type = "peaking";
  eqMidNode.frequency.value = 1000; // 1kHz (center of mid range)
  eqMidNode.Q.value = 1.0; // Moderate bandwidth

  const eqHighNode = audioContext.createBiquadFilter();
  eqHighNode.type = "highshelf";
  eqHighNode.frequency.value = 5000; // Control frequencies above 5kHz

  const compressorNode = audioContext.createDynamicsCompressor();

  // Stereo split/merge nodes for Haas effect
  const splitter = audioContext.createChannelSplitter(2);
  const delayNode = audioContext.createDelay(0.1); // Max delay time (100ms)
  const merger = audioContext.createChannelMerger(2);

  const pannerNode = audioContext.createStereoPanner();
  const volumeGainNode = audioContext.createGain();

  // 3. Basic internal routing (effect chain in series)
  // Input → effect branch
  inputNode.connect(effectBranch);

  // Effect chain connections
  effectBranch.connect(lowCutNode);
  lowCutNode.connect(eqLowNode);
  eqLowNode.connect(eqMidNode);
  eqMidNode.connect(eqHighNode);
  eqHighNode.connect(compressorNode);

  // Haas effect (stereo processing) routing
  compressorNode.connect(splitter);
  splitter.connect(merger, 0, 0); // Left (0) goes directly to merger left (0)
  splitter.connect(delayNode, 1); // Right (1) goes to delay
  delayNode.connect(merger, 0, 1); // Delayed right to merger right (1)

  // Post-stereo merge processing
  merger.connect(pannerNode);
  pannerNode.connect(volumeGainNode);
  volumeGainNode.connect(outputNode);

  // Bypass path (input directly to output)
  inputNode.connect(bypassBranch);
  bypassBranch.connect(outputNode);

  // Apply parameters to audio nodes
  function applyParameters() {
    const p = state.parameters;

    // --- ON/OFF (Bypass) control ---
    if (p.isOn) {
      effectBranch.gain.setValueAtTime(1, audioContext.currentTime);
      bypassBranch.gain.setValueAtTime(0, audioContext.currentTime);
    } else {
      effectBranch.gain.setValueAtTime(0, audioContext.currentTime);
      bypassBranch.gain.setValueAtTime(1, audioContext.currentTime);
    }

    // --- Low Cut (Highpass Filter) ---
    // Map 0~1 logarithmically to 20Hz~600Hz (near-no effect at 0)
    const minHz = 20;
    const maxHz = 600;
    const lowCutFreq = minHz * Math.pow(maxHz / minHz, p.lowCut);
    lowCutNode.frequency.setValueAtTime(lowCutFreq, audioContext.currentTime);

    // --- 3-Band EQ ---
    // Map 0~1 linearly to -12dB~+12dB (0.5 = 0dB / no change)
    const mapToGainDb = (val: number) => (val - 0.5) * 24;
    eqLowNode.gain.setValueAtTime(
      mapToGainDb(p.eqLow),
      audioContext.currentTime,
    );
    eqMidNode.gain.setValueAtTime(
      mapToGainDb(p.eqMid),
      audioContext.currentTime,
    );
    eqHighNode.gain.setValueAtTime(
      mapToGainDb(p.eqHigh),
      audioContext.currentTime,
    );

    // --- Compressor ---
    // Single knob (0~1) lowers threshold (-0dB~-40dB) and raises ratio (1~12)
    const threshold = p.compress * -40;
    const ratio = 1 + p.compress * 11;
    compressorNode.threshold.setValueAtTime(
      threshold,
      audioContext.currentTime,
    );
    compressorNode.ratio.setValueAtTime(ratio, audioContext.currentTime);
    // Attack and release fixed to generic values
    compressorNode.attack.setValueAtTime(0.005, audioContext.currentTime); // 5ms
    compressorNode.release.setValueAtTime(0.2, audioContext.currentTime); // 200ms

    // --- Haas Effect (Stereo Width) ---
    // Map 0~1 to 0ms~30ms (0.03s) delay
    const delayTime = p.haas * 0.03;
    delayNode.delayTime.setValueAtTime(delayTime, audioContext.currentTime);

    // --- Stereo Pan ---
    pannerNode.pan.setValueAtTime(p.pan, audioContext.currentTime);

    // --- Volume ---
    // 0.5 is unity gain (1.0x). Below 0.5 drops steeply; above 0.5 boosts up to 2x (+6dB)
    let volumeGain = 0;
    if (p.volume <= 0.5) {
      volumeGain = p.volume / 0.5; // 0.0 ~ 1.0 (linear)
    } else {
      volumeGain = 1.0 + (p.volume - 0.5) / 0.5; // 1.0 ~ 2.0
    }
    volumeGainNode.gain.setValueAtTime(volumeGain, audioContext.currentTime);
  }

  // Apply initial parameters
  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = parameters;
      applyParameters();
    },
  };
}
