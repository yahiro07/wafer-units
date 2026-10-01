import { EffectParameters } from "@/core/definitions";
import { store } from "@/root/store";
import { clampValue } from "@lib/mu2609/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 9;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
  bool: (value: boolean) => (value ? 1 : 0),
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
  bool: (byte: number) => byte !== 0,
};

const mappers = {
  serializeParameters(parameters: EffectParameters): number[] {
    const pr = parameters;
    const bs = bytesSerializer;
    return [
      bs.float(pr.inputGain),
      bs.float(pr.threshold),
      bs.float(pr.ratio),
      bs.float(pr.knee),
      bs.float(pr.attack),
      bs.float(pr.release),
      bs.float(pr.outputGain),
    ];
  },
  deserializeParameters(bytes: number[]): EffectParameters {
    const bd = bytesDeserializer;
    return {
      inputGain: bd.float(bytes[0]),
      threshold: bd.float(bytes[1]),
      ratio: bd.float(bytes[2]),
      knee: bd.float(bytes[3]),
      attack: bd.float(bytes[4]),
      release: bd.float(bytes[5]),
      outputGain: bd.float(bytes[6]),
    };
  },
};

export const persistenceImpl = {
  emitStateBytes(): Uint8Array {
    const { parameters, effectEnabled, sideChain } = store.state;
    const bs = bytesSerializer;
    const paramBytes = mappers.serializeParameters(parameters);
    return new Uint8Array([
      formatRevision,
      ...paramBytes,
      bs.bool(effectEnabled),
      bs.bool(sideChain),
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (
      bytes.length === 1 + parameterByteCount &&
      bytes[0] === formatRevision
    ) {
      const parameters = mappers.deserializeParameters([...bytes.slice(1, 8)]);
      const effectEnabled = bytesDeserializer.bool(bytes[8]);
      const sideChain = bytesDeserializer.bool(bytes[9]);
      store.assign({ parameters, effectEnabled, sideChain });
    } else {
      console.warn(`skipped incompatible data on applyStateBytes`);
    }
  },
};
