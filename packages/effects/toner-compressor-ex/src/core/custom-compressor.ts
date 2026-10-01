import workletUrl from "./custom-compressor-worklet?worker&url";

const moduleLoads = new WeakMap<AudioContext, Promise<void>>();

function loadCompressorModule(audioContext: AudioContext) {
  let pending = moduleLoads.get(audioContext);
  if (!pending) {
    pending = audioContext.audioWorklet.addModule(workletUrl).catch((error) => {
      moduleLoads.delete(audioContext);
      throw error;
    });
    moduleLoads.set(audioContext, pending);
  }
  return pending;
}

function createDeferredParam(initialValue: number) {
  let audioParam: AudioParam | null = null;
  let pendingValue = initialValue;
  let pendingTime = 0;
  let hasPending = false;

  return {
    setValueAtTime(value: number, time: number) {
      if (audioParam) {
        audioParam.setValueAtTime(value, time);
        return;
      }
      pendingValue = value;
      pendingTime = time;
      hasPending = true;
    },
    bind(next: AudioParam, currentTime: number) {
      audioParam = next;
      if (!hasPending) return;
      audioParam.setValueAtTime(pendingValue, Math.max(pendingTime, currentTime));
    },
  };
}

export function createCustomCompressor(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();
  const detectorNode = audioContext.createGain();
  const threshold = createDeferredParam(0);
  const ratio = createDeferredParam(1);
  const knee = createDeferredParam(0);
  const attack = createDeferredParam(0.003);
  const release = createDeferredParam(0.25);

  let workletNode: AudioWorkletNode | null = null;
  let disposed = false;
  let passthroughConnected = true;

  inputNode.connect(outputNode);

  loadCompressorModule(audioContext)
    .then(() => {
      if (disposed) return;

      workletNode = new AudioWorkletNode(audioContext, "custom-compressor", {
        numberOfInputs: 2,
        numberOfOutputs: 1,
        outputChannelCount: [2],
        channelCount: 2,
        channelCountMode: "explicit",
        channelInterpretation: "speakers",
      });

      const now = audioContext.currentTime;
      threshold.bind(requiredParam(workletNode, "threshold"), now);
      ratio.bind(requiredParam(workletNode, "ratio"), now);
      knee.bind(requiredParam(workletNode, "knee"), now);
      attack.bind(requiredParam(workletNode, "attack"), now);
      release.bind(requiredParam(workletNode, "release"), now);

      if (passthroughConnected) {
        inputNode.disconnect(outputNode);
        passthroughConnected = false;
      }
      inputNode.connect(workletNode, 0, 0);
      detectorNode.connect(workletNode, 0, 1);
      workletNode.connect(outputNode);
    })
    .catch((error) => {
      console.error("Failed to load custom compressor AudioWorklet:", error);
    });

  return {
    inputNode,
    outputNode,
    detectorNode,
    threshold,
    ratio,
    knee,
    attack,
    release,
    cleanup() {
      disposed = true;
      inputNode.disconnect();
      detectorNode.disconnect();
      workletNode?.disconnect();
      passthroughConnected = false;
    },
  };
}

function requiredParam(workletNode: AudioWorkletNode, name: string) {
  const param = workletNode.parameters.get(name);
  if (!param) throw new Error(`Missing AudioParam: ${name}`);
  return param;
}
