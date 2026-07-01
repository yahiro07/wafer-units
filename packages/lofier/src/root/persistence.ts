import { Persistence } from "wafer-host/unit-types";
import { delayTimeValues } from "@/common/definitions";
import { pickNearestDelayTimeIndex } from "@/common/parameter-helper";
import { store } from "@/root/store";

function floatParameterToByte(value: number): number {
  return (value * 255) >>> 0;
}

function floatParameterFromByte(byte: number): number {
  return byte / 255;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    const delayTimeIndex = pickNearestDelayTimeIndex(parameters.time);
    return new Uint8Array([
      parameters.isOn ? 1 : 0,
      delayTimeIndex,
      floatParameterToByte(parameters.feed),
      floatParameterToByte(parameters.tone),
      floatParameterToByte(parameters.mix),
      parameters.lfoOn ? 1 : 0,
      floatParameterToByte(parameters.lfoRate),
      floatParameterToByte(parameters.lfoDepth),
      parameters.safety ? 1 : 0,
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 9) return;
    const isOn = bytes[0] !== 0;
    const delayTimeIndex = bytes[1];
    const time = delayTimeValues[delayTimeIndex];
    const feed = floatParameterFromByte(bytes[2]);
    const tone = floatParameterFromByte(bytes[3]);
    const mix = floatParameterFromByte(bytes[4]);
    const lfoOn = bytes[5] !== 0;
    const lfoRate = floatParameterFromByte(bytes[6]);
    const lfoDepth = floatParameterFromByte(bytes[7]);
    const safety = bytes[8] !== 0;
    store.assign({
      parameters: {
        isOn,
        time,
        feed,
        tone,
        mix,
        lfoOn,
        lfoRate,
        lfoDepth,
        safety,
      },
    });
  },
};
