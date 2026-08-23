const PARAM_SMOOTHING_SECONDS = 0.01;

export function createLoFi(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const workletNode = new AudioWorkletNode(audioContext, "lofi-processor", {
    numberOfInputs: 1,
    numberOfOutputs: 1,
    outputChannelCount: [1],
  });

  inputNode.connect(workletNode);

  return {
    inputNode,
    outputNode: workletNode as AudioNode,
    setLevel(level: number): void {
      const amountParam = workletNode.parameters.get("amount");
      if (!amountParam) return;
      amountParam.setTargetAtTime(
        level,
        audioContext.currentTime,
        PARAM_SMOOTHING_SECONDS,
      );
    },
    cleanup() {
      workletNode.port.postMessage({ type: "stop" });
      try {
        inputNode.disconnect();
        workletNode.disconnect();
      } finally {
        workletNode.port.close();
      }
    },
  };
}
