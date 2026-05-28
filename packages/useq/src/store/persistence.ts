import { StepCode } from "@/sequencer/sequencer-engine";
import { appState, PersistedState, uiActions } from "@/store/store";

const stepCodeMapper = {
  toByte(stepCode: StepCode): number {
    return {
      off: 0,
      on: 1,
      tie: 2,
    }[stepCode];
  },
  fromByte(byte: number): StepCode {
    return (
      (
        {
          0: "off",
          1: "on",
          2: "tie",
        } as const
      )[byte] ?? "off"
    );
  },
};

const persistenceCore = {
  setPersistedState(state: PersistedState) {
    uiActions.setDuty(state.duty);
    uiActions.loadStepCodes(state.stepCodes);
  },
  getPersistedState(): PersistedState {
    return {
      duty: appState.duty,
      stepCodes: appState.stepCodes,
    };
  },
};

export const persistence = {
  emitStateBytes(): Uint8Array {
    const state = persistenceCore.getPersistedState();
    return new Uint8Array([
      (state.duty * 255) >>> 0,
      ...state.stepCodes.map(stepCodeMapper.toByte),
    ]);
  },
  loadStateBytes(bytes: Uint8Array) {
    if (bytes.length === 5) {
      const duty = bytes[0] / 255;
      const stepCodes = [...bytes.slice(1, 5)].map(stepCodeMapper.fromByte);
      persistenceCore.setPersistedState({ duty, stepCodes });
    }
  },
};
