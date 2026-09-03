import { FilterType, SynthParameters } from "@/defs/definitions";
import { allPresetKeys, store } from "@/root/store";
import { clampValue } from "@/utils/helpers";

const formatRevision = 3;
const parameterByteCount = 22;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
  uint: (value: number) => value,
  bool: (value: boolean) => (value ? 1 : 0),
  octave: (value: number) => value + 100,
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
  uint: (byte: number, min: number, max: number) => clampValue(byte, min, max),
  bool: (byte: number) => byte !== 0,
  octave: (byte: number) => clampValue(byte - 100, -2, 2),
};

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    const bs = bytesSerializer;
    return [
      bs.octave(pr.osc1Octave),
      bs.uint(pr.osc1Unison),
      bs.float(pr.osc1Shape),
      bs.bool(pr.osc1Spread),
      bs.float(pr.osc1Detune),
      bs.bool(pr.osc1Sub),
      bs.float(pr.osc1Mix),
      //
      bs.uint(pr.filter1Type),
      bs.float(pr.filter1Cutoff),
      bs.float(pr.filter1Peak),
      bs.float(pr.filter1Env),
      bs.bool(pr.filter1EnvRelease),
      //
      bs.bool(pr.amp1Full),
      bs.float(pr.amp1Attack),
      bs.float(pr.amp1Decay),
      bs.float(pr.amp1Sustain),
      bs.float(pr.amp1Release),
      //
      bs.float(pr.reverbTime),
      bs.float(pr.reverbTone),
      bs.float(pr.reverbMix),
      //
      bs.float(pr.density),
      bs.float(pr.patchVolume),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    const bd = bytesDeserializer;
    return {
      osc1Octave: bd.octave(bytes[0]),
      osc1Unison: bd.uint(bytes[1], 0, 3),
      osc1Shape: bd.float(bytes[2]),
      osc1Spread: bd.bool(bytes[3]),
      osc1Detune: bd.float(bytes[4]),
      osc1Sub: bd.bool(bytes[5]),
      osc1Mix: bd.float(bytes[6]),
      //
      filter1Type: bd.uint(bytes[7], FilterType.LP12, FilterType.LP24),
      filter1Cutoff: bd.float(bytes[8]),
      filter1Peak: bd.float(bytes[9]),
      filter1Env: bd.float(bytes[10]),
      filter1EnvRelease: bd.bool(bytes[11]),
      //
      amp1Full: bd.bool(bytes[12]),
      amp1Attack: bd.float(bytes[13]),
      amp1Decay: bd.float(bytes[14]),
      amp1Sustain: bd.float(bytes[15]),
      amp1Release: bd.float(bytes[16]),
      //
      reverbTime: bd.float(bytes[17]),
      reverbTone: bd.float(bytes[18]),
      reverbMix: bd.float(bytes[19]),
      //
      density: bd.float(bytes[20]),
      patchVolume: bd.float(bytes[21]),
    };
  },
};

export const persistenceImpl = {
  emitStateBytes(): Uint8Array {
    const { presetKey, parameters } = store.state;
    const paramBytes = mappers.serializeParameters(parameters);
    const presetIndex = allPresetKeys.indexOf(presetKey);
    return new Uint8Array([formatRevision, presetIndex, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (
      bytes.length === 2 + parameterByteCount &&
      bytes[0] === formatRevision
    ) {
      const presetIndex = bytes[1];
      const presetKey = allPresetKeys[presetIndex] || allPresetKeys[0];
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      store.assign({ presetKey, parameters });
    } else {
      console.warn(`[ss1] skipped incompatible data on applyStateBytes`);
    }
  },
};
