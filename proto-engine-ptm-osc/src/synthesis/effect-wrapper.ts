export function createEffectWrapper(
  audioContext: AudioContext,
  effectNode: AudioNode,
  effectOutputNode?: AudioNode,
) {
  effectOutputNode ??= effectNode;
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const dryNode = audioContext.createGain();
  const wetNode = audioContext.createGain();

  function setEnabled(enabled: boolean, force?: boolean) {
    const effectGain = enabled ? 1 : 0;
    if (wetNode.gain.value !== effectGain || force) {
      wetNode.gain.value = effectGain;
      dryNode.gain.value = effectGain === 1 ? 0 : 1;
    }
  }
  setEnabled(false, true);
  return {
    inputNode,
    outputNode,
    setupNodes() {
      inputNode.connect(effectNode);
      effectOutputNode.connect(wetNode);
      wetNode.connect(outputNode);

      inputNode.connect(dryNode);
      dryNode.connect(outputNode);
    },
    cleanupNodes() {
      inputNode.disconnect();
      effectNode.disconnect();
      effectOutputNode.disconnect();
      wetNode.disconnect();
      dryNode.disconnect();
    },
    setEnabled,
  };
}
