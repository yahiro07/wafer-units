import { EffectParameters } from "@/effect";
import { clampValue } from "@lib/mu2609/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 1;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
};

const mappers = {
  serializeParameters(parameters: EffectParameters): number[] {
    return [bytesSerializer.float(parameters.volume)];
  },
  deserializeParameters(bytes: number[]): EffectParameters {
    return {
      volume: bytesDeserializer.float(bytes[0]),
    };
  },
};

export function createPersistence(options: {
  getParameters: () => EffectParameters;
  applyParameters: (parameters: EffectParameters) => void;
}) {
  return {
    emitStateBytes(): Uint8Array {
      const paramBytes = mappers.serializeParameters(options.getParameters());
      return new Uint8Array([formatRevision, ...paramBytes]);
    },
    applyStateBytes(bytes: Uint8Array) {
      if (
        bytes.length === 1 + parameterByteCount &&
        bytes[0] === formatRevision
      ) {
        const parameters = mappers.deserializeParameters([...bytes.slice(1)]);
        options.applyParameters(parameters);
      } else {
        console.warn(`skipped incompatible data on applyStateBytes`);
      }
    },
  };
}
