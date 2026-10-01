import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { clampValue } from "@lib/mu2609/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 3;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
};

const mappers = {
  serializeParameters(parameters: EffectParameters): number[] {
    const pr = parameters;
    const bs = bytesSerializer;
    return [
      bs.float(pr.reverbTime),
      bs.float(pr.reverbTone),
      bs.float(pr.reverbMix),
    ];
  },
  deserializeParameters(bytes: number[]): EffectParameters {
    const bd = bytesDeserializer;
    return {
      reverbTime: bd.float(bytes[0]),
      reverbTone: bd.float(bytes[1]),
      reverbMix: bd.float(bytes[2]),
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
