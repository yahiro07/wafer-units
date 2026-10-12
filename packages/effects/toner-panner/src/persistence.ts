import type { SynthParameters } from "./core/definitions";
import { clampValue } from "@lib/mu2609/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 1;

const bytesSerializer = {
  bipolar: (value: number) => (((value + 1) / 2) * 255) >>> 0,
};
const bytesDeserializer = {
  bipolar: (byte: number) => clampValue((byte / 255) * 2 - 1, -1, 1),
};

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    return [bytesSerializer.bipolar(parameters.pan)];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    return {
      pan: bytesDeserializer.bipolar(bytes[0]),
    };
  },
};

export function createPersistence(options: {
  getParameters: () => SynthParameters;
  applyParameters: (parameters: SynthParameters) => void;
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
