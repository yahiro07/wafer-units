import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/core/definitions";
import { connectNodes, disconnectNodes } from "@/core/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@/core/volume-curve";
import { mapUnaryTo, power2 } from "@/utils/synth-math-utils";

function makeDriveCurve(drive: number): Float32Array<ArrayBuffer> {
  const n = 2048;
  const curve = new Float32Array(n) as Float32Array<ArrayBuffer>;
  const amount = Math.min(1, Math.max(0, drive));
  if (amount === 0) {
    for (let i = 0; i < n; i++) {
      curve[i] = (i / (n - 1)) * 2 - 1;
    }
    return curve;
  }
  const inputGain = 1 + amount * 0.5;
  const outputGain = 1 / Math.sqrt(inputGain);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * inputGain) * outputGain;
  }
  return curve;
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;

  const inputGainNode = ac.createGain();
  const glueCompNode = ac.createDynamicsCompressor();
  const glueMakeupNode = ac.createGain();
  const driveShaper = ac.createWaveShaper();
  const limitCompNode = ac.createDynamicsCompressor();
  const outputGainNode = ac.createGain();

  glueCompNode.ratio.value = 4;
  glueCompNode.knee.value = 8;
  driveShaper.oversample = "2x";
  driveShaper.curve = makeDriveCurve(0);
  limitCompNode.knee.value = 0;
  limitCompNode.attack.value = 0.002;

  connectNodes(
    inputNode,
    inputGainNode,
    glueCompNode,
    glueMakeupNode,
    driveShaper,
    limitCompNode,
    outputGainNode,
    outputNode,
  );

  return {
    setParameters(pr: EffectParameters) {
      const now = ac.currentTime;
      inputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.inputGain),
        now,
      );
      outputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.outputGain),
        now,
      );

      glueCompNode.threshold.setValueAtTime(
        mapUnaryTo(pr.compThreshold, -40, 0),
        now,
      );
      glueCompNode.attack.setValueAtTime(
        mapUnaryTo(pr.compAttack, 0.001, 0.08),
        now,
      );
      glueCompNode.release.setValueAtTime(
        mapUnaryTo(pr.compRelease, 0.05, 0.5),
        now,
      );
      glueMakeupNode.gain.setValueAtTime(
        1 + power2(1 - pr.compThreshold) * 1,
        now,
      );

      driveShaper.curve = makeDriveCurve(power2(pr.drive));

      const limit = Math.min(1, Math.max(0, pr.limit));
      limitCompNode.ratio.setValueAtTime(mapUnaryTo(limit, 1, 20), now);
      limitCompNode.threshold.setValueAtTime(mapUnaryTo(limit, 0, -12), now);
      limitCompNode.release.setValueAtTime(0.08, now);
    },
    cleanup() {
      disconnectNodes(
        inputNode,
        inputGainNode,
        glueCompNode,
        driveShaper,
        limitCompNode,
        outputGainNode,
      );
    },
  };
}
