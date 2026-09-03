const MAX_DELAY_SEC = 0.05;
const WET_LEVEL_SCALE = 0.4;
const DRY_ATTENUATION = 0.3;

export function createChorus5(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const dryNode = audioContext.createGain();
  const wetMasterNode = audioContext.createGain();

  inputNode.connect(dryNode);
  dryNode.connect(outputNode);
  wetMasterNode.gain.value = 0;

  const tapConfigs = [
    { baseDelay: 0.028, lfoFreq: 0.13, modDepth: 0.007, pan: -0.95 },
    { baseDelay: 0.026, lfoFreq: 0.19, modDepth: 0.0065, pan: 0.95 },
    { baseDelay: 0.019, lfoFreq: 0.31, modDepth: 0.0045, pan: -0.6 },
    { baseDelay: 0.022, lfoFreq: 0.23, modDepth: 0.0055, pan: 0.6 },
    { baseDelay: 0.012, lfoFreq: 0.47, modDepth: 0.003, pan: -0.25 },
    { baseDelay: 0.015, lfoFreq: 0.37, modDepth: 0.0035, pan: 0.25 },
    { baseDelay: 0.017, lfoFreq: 0.53, modDepth: 0.0025, pan: 0.0 },
  ];

  const lfos: OscillatorNode[] = [];
  const delayNodes: DelayNode[] = [];
  let wetEnabled = false;

  for (const config of tapConfigs) {
    const delayNode = audioContext.createDelay(MAX_DELAY_SEC);
    const pannerNode = audioContext.createStereoPanner();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    delayNode.delayTime.value = config.baseDelay;
    pannerNode.pan.value = config.pan;
    lfo.type = "sine";
    lfo.frequency.value = config.lfoFreq;
    lfoGain.gain.value = config.modDepth;

    delayNode.connect(pannerNode);
    pannerNode.connect(wetMasterNode);
    lfo.connect(lfoGain);
    lfoGain.connect(delayNode.delayTime);
    lfo.start(audioContext.currentTime + Math.random() * 2.0);

    delayNodes.push(delayNode);
    lfos.push(lfo);
  }

  function setWetEnabled(enabled: boolean) {
    if (enabled === wetEnabled) return;
    wetEnabled = enabled;
    if (enabled) {
      for (const delayNode of delayNodes) {
        inputNode.connect(delayNode);
      }
      wetMasterNode.connect(outputNode);
      return;
    }
    for (const delayNode of delayNodes) {
      inputNode.disconnect(delayNode);
    }
    wetMasterNode.disconnect(outputNode);
  }

  function setLevel(value: number, force?: boolean) {
    const wetGain = value * WET_LEVEL_SCALE;
    const dryGain = 1 - value * DRY_ATTENUATION;
    if (
      !force &&
      wetMasterNode.gain.value === wetGain &&
      dryNode.gain.value === dryGain
    ) {
      setWetEnabled(value > 0);
      return;
    }
    wetMasterNode.gain.value = wetGain;
    dryNode.gain.value = dryGain;
    setWetEnabled(value > 0);
  }
  setLevel(0);

  return {
    inputNode,
    outputNode,
    update: setLevel,
    cleanup() {
      for (const lfo of lfos) {
        lfo.stop();
        lfo.disconnect();
      }
      for (const delayNode of delayNodes) {
        delayNode.disconnect();
      }
      wetMasterNode.disconnect();
    },
  };
}
