import { Persistence } from "wafer-host/unit-types";
import { DelayTime } from "@/common/types";
import { store } from "@/root/store";

const delayTimeValues = [0.333, 0.5, 0.666, 0.75, 1, 1.5, 2, 2.5, 3];

function pickNearestDelayTime(time: number): DelayTime {
  const distances = delayTimeValues.map((value) => Math.abs(value - time));
  const minDistance = Math.min(...distances);
  return (delayTimeValues[distances.indexOf(minDistance)] ?? 1) as DelayTime;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.isOn ? 1 : 0,
      parameters.time * 64,
      parameters.feed,
      parameters.tone,
      parameters.mix,
      parameters.lfoOn ? 1 : 0,
      parameters.lfoRate,
      parameters.lfoDepth,
      parameters.safety ? 1 : 0,
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 8) return;
    const isOn = bytes[0] !== 0;
    const time = pickNearestDelayTime(bytes[1] / 64);
    const feed = bytes[2];
    const tone = bytes[3];
    const mix = bytes[4];
    const lfoOn = bytes[5] !== 0;
    const lfoRate = bytes[6];
    const lfoDepth = bytes[7];
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
