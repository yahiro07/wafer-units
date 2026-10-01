import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { clampValue } from "@lib/mu2609/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 3;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
  uint: (value: number) => value,
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
  uint: (byte: number, min: number, max: number) => {
    return clampValue(byte, min, max);
  },
};

const mappers = {
  serializeParameters(parameters: EffectParameters): number[] {
    const pr = parameters;
    const bs = bytesSerializer;
    return [bs.uint(pr.curveType), bs.float(pr.top), bs.float(pr.drive)];
  },
  deserializeParameters(bytes: number[]): EffectParameters {
    const bd = bytesDeserializer;
    return {
      curveType: bd.uint(bytes[0], 0, 3),
      top: bd.float(bytes[1]),
      drive: bd.float(bytes[2]),
    };
  },
};

export const persistenceImpl = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    const paramBytes = mappers.serializeParameters(parameters);
    return new Uint8Array([formatRevision, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (
      bytes.length === 1 + parameterByteCount &&
      bytes[0] === formatRevision
    ) {
      const parameters = mappers.deserializeParameters([...bytes.slice(1)]);
      store.assign({ parameters });
    } else {
      console.warn(`skipped incompatible data on applyStateBytes`);
    }
  },
};
