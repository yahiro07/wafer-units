import { invPower2, power2 } from "@/utils/synth-math-utils";

export function createCompressorUnit(ac: AudioContext) {
  const inputNode = ac.createGain();
  const compressor = ac.createDynamicsCompressor();
  const outputNode = ac.createGain();

  inputNode.connect(outputNode);

  type WireMode = "active" | "bypass" | null;
  let wireMode: WireMode = null;

  function updateConnection(nextWireMode: WireMode) {
    if (nextWireMode === wireMode) return;

    inputNode.disconnect();
    compressor.disconnect();

    if (nextWireMode === "active") {
      inputNode.connect(compressor).connect(outputNode);
    } else if (nextWireMode === "bypass") {
      inputNode.connect(outputNode);
    }
    nextWireMode = wireMode;
  }

  return {
    inputNode,
    outputNode,
    update(level: number) {
      updateConnection(level > 0 ? "active" : "bypass");
      compressor.threshold.value = invPower2(level) * -80;
      compressor.ratio.value = 1 + power2(level) * 18;
      compressor.knee.value = 4;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.04;
      outputNode.gain.value = 1 + power2(level) * 5;
    },
    cleanup() {
      updateConnection(null);
    },
  };
}
