import { invPower2, power2 } from "@/utils/synth-math-utils";

export function createCompressorUnit(ac: AudioContext) {
  const inputNode = ac.createGain();
  const preGain = ac.createGain();
  const compressor = ac.createDynamicsCompressor();
  const makeupGain = ac.createGain();
  const outputNode = ac.createGain();

  inputNode.connect(outputNode);

  type WireMode = "active" | "bypass" | null;
  let wireMode: WireMode = null;

  function updateConnection(nextWireMode: WireMode) {
    if (nextWireMode === wireMode) return;

    inputNode.disconnect();
    preGain.disconnect();
    compressor.disconnect();
    makeupGain.disconnect();

    if (nextWireMode === "active") {
      inputNode
        .connect(preGain)
        .connect(compressor)
        .connect(makeupGain)
        .connect(outputNode);
    } else if (nextWireMode === "bypass") {
      inputNode.connect(outputNode);
    }
    wireMode = nextWireMode;
  }

  return {
    inputNode,
    outputNode,
    update(level: number) {
      updateConnection(level > 0 ? "active" : "bypass");
      if (0) {
        preGain.gain.value = 1;
        compressor.threshold.value = invPower2(level) * -80;
        compressor.ratio.value = 1 + power2(level) * 18;
        compressor.knee.value = 4;
        compressor.attack.value = 0.005;
        compressor.release.value = 0.04;
        makeupGain.gain.value = 1 + power2(level) * 5;
      } else {
        const scaler = 3;
        preGain.gain.value = scaler;
        compressor.threshold.value = invPower2(level) * -40;
        compressor.ratio.value = 1 + power2(level) * 5;
        compressor.knee.value = 8;
        compressor.attack.value = 0.005;
        compressor.release.value = 0.2;
        const makeupGainValue = 1 + power2(level) * 3;
        makeupGain.gain.value = makeupGainValue / scaler;
      }
    },
    cleanup() {
      updateConnection(null);
    },
  };
}
