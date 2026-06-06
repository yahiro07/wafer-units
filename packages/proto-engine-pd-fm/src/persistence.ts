import { uiActions } from "@/actions";
import { SynthParameters } from "@/state";
import { appState } from "@/store";

function unaryToByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value * 255)));
}

function unaryFromByte(byte: number): number {
  return Math.max(0, Math.min(1, byte / 255));
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      pr.waveMode, //0
      unaryToByte(pr.shape),
      unaryToByte(pr.envMod),
      unaryToByte(pr.detune),
      unaryToByte(pr.sub),
      unaryToByte(pr.decay),
      unaryToByte(pr.release),
      unaryToByte(pr.drift),
      unaryToByte(pr.loFi),
      unaryToByte(pr.chorus),
      unaryToByte(pr.delay),
      unaryToByte(pr.reverb),
      unaryToByte(pr.master), //12
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    return {
      waveMode: bytes[0],
      shape: unaryFromByte(bytes[1]),
      envMod: unaryFromByte(bytes[2]),
      detune: unaryFromByte(bytes[3]),
      sub: unaryFromByte(bytes[4]),
      decay: unaryFromByte(bytes[5]),
      release: unaryFromByte(bytes[6]),
      drift: unaryFromByte(bytes[7]),
      loFi: unaryFromByte(bytes[8]),
      chorus: unaryFromByte(bytes[9]),
      delay: unaryFromByte(bytes[10]),
      reverb: unaryFromByte(bytes[11]),
      master: unaryFromByte(bytes[12]),
    };
  },
};

const formatRevision = 1;
const stateByteLength = 1 + 13;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { synthParams } = appState;
    const paramBytes = mappers.serializeParameters(synthParams);
    return new Uint8Array([formatRevision, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === stateByteLength && bytes[0] === formatRevision) {
      const synthParams = mappers.deserializeParameters([...bytes.slice(1)]);
      uiActions.loadStates({ synthParams });
    }
  },
};
