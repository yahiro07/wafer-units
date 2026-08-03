import { pickObjectMembers } from "mofur/ax";
import { PersistState, store } from "@/store/store";
import { LoopBars, StepStride } from "@/types";

const stepCodeMapper = {
  toByte(stepCode: number): number {
    if (stepCode < 0) return 256 + stepCode;
    return stepCode;
  },
  fromByte(byte: number): number {
    if (byte >= 128) return byte - 256;
    return byte;
  },
};

const persistenceCore = {
  emitPersistState(): PersistState {
    return pickObjectMembers(store.state, [
      "loopBars",
      "stepStride",
      "allSteps",
      "octaveShift",
      "stepDuty",
    ]);
  },
  loadPersistState(state: PersistState) {
    store.assign(state);
  },
};

const formatRevision = 1;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { loopBars, stepStride, allSteps, octaveShift, stepDuty } =
      persistenceCore.emitPersistState();
    const stepBytes = allSteps.map(stepCodeMapper.toByte);
    return new Uint8Array([
      formatRevision,
      loopBars,
      stepStride,
      octaveShift + 100,
      (stepDuty * 255) >>> 0,
      ...stepBytes,
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === 5 + 256 && bytes[0] === formatRevision) {
      const loopBars = bytes[1] as LoopBars;
      const stepStride = bytes[2] as StepStride;
      const octaveShift = bytes[3] - 100;
      const stepDuty = bytes[4] / 255;
      const stepBytes = [...bytes.slice(5)];
      const allSteps = stepBytes.map(stepCodeMapper.fromByte);
      persistenceCore.loadPersistState({
        loopBars,
        stepStride,
        allSteps,
        octaveShift,
        stepDuty,
      });
    }
  },
};
