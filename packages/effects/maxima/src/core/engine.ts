import { UnitInterface } from "wafer-host/unit-types";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";
import workletUrl from "./maxima-processor?worker&url";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? audioContext.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? audioContext.destination;
  let parameters = { ...defaultEffectParameters };
  let workletNode: AudioWorkletNode | undefined;
  let isConnected = false;
  let isPassthroughConnected = false;
  let isWorkletModuleLoaded = false;
  let isDisposed = false;

  const createWorklet = () => {
    if (
      !isConnected ||
      !isWorkletModuleLoaded ||
      isDisposed ||
      workletNode
    ) {
      return;
    }

    workletNode = new AudioWorkletNode(audioContext, "maxima-processor");
    if (isPassthroughConnected) {
      inputNode.disconnect(outputNode);
      isPassthroughConnected = false;
    }
    inputNode.connect(workletNode);
    workletNode.connect(outputNode);
    applyParameters();
  };

  void audioContext.audioWorklet
    .addModule(workletUrl)
    .then(() => {
      isWorkletModuleLoaded = true;
      createWorklet();
    })
    .catch((error: unknown) => {
      console.error("Failed to load Maxima AudioWorklet:", error);
    });

  function applyParameters() {
    if (!workletNode) return;

    const now = audioContext.currentTime;
    setSmoothValue(workletNode.parameters.get("drive"), parameters.drive, now);
    setSmoothValue(
      workletNode.parameters.get("ceiling"),
      parameters.ceiling,
      now,
    );
    setSmoothValue(
      workletNode.parameters.get("lookahead"),
      parameters.lookahead,
      now,
    );
  }

  return {
    connects() {
      if (isConnected || isDisposed) return;
      isConnected = true;
      inputNode.connect(outputNode);
      isPassthroughConnected = true;
      createWorklet();
    },
    setParameters(nextParameters: EffectParameters) {
      parameters = { ...nextParameters };
      applyParameters();
    },
    cleanup() {
      isDisposed = true;
      if (isPassthroughConnected) inputNode.disconnect(outputNode);
      if (workletNode) {
        inputNode.disconnect(workletNode);
        workletNode.disconnect(outputNode);
      }
      isPassthroughConnected = false;
      isConnected = false;
    },
  };
}

function setSmoothValue(
  parameter: AudioParam | undefined,
  value: number,
  now: number,
) {
  if (!parameter) return;
  parameter.cancelScheduledValues(now);
  parameter.setTargetAtTime(value, now, 0.015);
}
