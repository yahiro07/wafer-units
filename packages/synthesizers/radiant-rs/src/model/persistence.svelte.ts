import { clampValue } from "@lib/mu2609/utils/helpers";
import {
  FilterType,
  IEditParametersReceiver,
  type OscParameters,
  type SynthParameters,
} from "../core/definitions";
import { numWaveformSpecs } from "../core/waveforms/core-waveform-generator";

const formatRevision = 1;
const oscByteCount = 14;
const parameterByteCount = oscByteCount * 3 + 6 + 5 + 3 + 4 + 1;

const bytesSerializer = {
  float: (value: number) => (value * 255) >>> 0,
  uint: (value: number) => value,
  bool: (value: boolean) => (value ? 1 : 0),
  octave: (value: number) => value + 100,
  bipolar: (value: number) => (((value + 1) / 2) * 255) >>> 0,
};
const bytesDeserializer = {
  float: (byte: number) => clampValue(byte / 255, 0, 1),
  uint: (byte: number, min: number, max: number) => clampValue(byte, min, max),
  bool: (byte: number) => byte !== 0,
  octave: (byte: number) => clampValue(byte - 100, -1, 1),
  bipolar: (byte: number) => clampValue((byte / 255) * 2 - 1, -1, 1),
};

const mappers = {
  serializeOsc(pr: OscParameters): number[] {
    const bs = bytesSerializer;
    return [
      bs.bool(pr.enabled),
      bs.octave(pr.octave),
      bs.uint(pr.wave),
      bs.float(pr.shape),
      bs.float(pr.dense),
      bs.float(pr.mix),
      bs.uint(pr.unison),
      bs.float(pr.detune),
      bs.bipolar(pr.pan),
      bs.float(pr.volume),
      bs.bool(pr.phaseRandom),
      bs.bool(pr.spread),
      bs.bool(pr.sub),
      bs.bool(pr.full),
    ];
  },
  deserializeOsc(bytes: number[], offset: number): OscParameters {
    const bd = bytesDeserializer;
    return {
      enabled: bd.bool(bytes[offset]),
      octave: bd.octave(bytes[offset + 1]),
      wave: bd.uint(bytes[offset + 2], 0, numWaveformSpecs - 1),
      shape: bd.float(bytes[offset + 3]),
      dense: bd.float(bytes[offset + 4]),
      mix: bd.float(bytes[offset + 5]),
      unison: bd.uint(bytes[offset + 6], 1, 7),
      detune: bd.float(bytes[offset + 7]),
      pan: bd.bipolar(bytes[offset + 8]),
      volume: bd.float(bytes[offset + 9]),
      phaseRandom: bd.bool(bytes[offset + 10]),
      spread: bd.bool(bytes[offset + 11]),
      sub: bd.bool(bytes[offset + 12]),
      full: bd.bool(bytes[offset + 13]),
    };
  },
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    const bs = bytesSerializer;
    return [
      ...mappers.serializeOsc(pr.osc1),
      ...mappers.serializeOsc(pr.osc2),
      ...mappers.serializeOsc(pr.osc3),
      bs.bool(pr.filter.enabled),
      bs.uint(pr.filter.type),
      bs.float(pr.filter.cutoff),
      bs.float(pr.filter.peak),
      bs.float(pr.filter.env),
      bs.bool(pr.filter.envRelease),
      bs.bool(pr.amp.enabled),
      bs.float(pr.amp.attack),
      bs.float(pr.amp.decay),
      bs.float(pr.amp.sustain),
      bs.float(pr.amp.release),
      bs.bool(pr.eq.enabled),
      bs.float(pr.eq.tilt),
      bs.float(pr.eq.freq),
      bs.bool(pr.reverb.enabled),
      bs.float(pr.reverb.time),
      bs.float(pr.reverb.tone),
      bs.float(pr.reverb.mix),
      bs.float(pr.misc.patchVolume),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    const bd = bytesDeserializer;
    const filterOffset = oscByteCount * 3;
    const ampOffset = filterOffset + 6;
    const eqOffset = ampOffset + 5;
    const reverbOffset = eqOffset + 3;
    const miscOffset = reverbOffset + 4;
    return {
      osc1: mappers.deserializeOsc(bytes, 0),
      osc2: mappers.deserializeOsc(bytes, oscByteCount),
      osc3: mappers.deserializeOsc(bytes, oscByteCount * 2),
      filter: {
        enabled: bd.bool(bytes[filterOffset]),
        type: bd.uint(
          bytes[filterOffset + 1],
          FilterType.LP12,
          FilterType.LP24,
        ) as FilterType,
        cutoff: bd.float(bytes[filterOffset + 2]),
        peak: bd.float(bytes[filterOffset + 3]),
        env: bd.float(bytes[filterOffset + 4]),
        envRelease: bd.bool(bytes[filterOffset + 5]),
      },
      amp: {
        enabled: bd.bool(bytes[ampOffset]),
        attack: bd.float(bytes[ampOffset + 1]),
        decay: bd.float(bytes[ampOffset + 2]),
        sustain: bd.float(bytes[ampOffset + 3]),
        release: bd.float(bytes[ampOffset + 4]),
      },
      eq: {
        enabled: bd.bool(bytes[eqOffset]),
        tilt: bd.float(bytes[eqOffset + 1]),
        freq: bd.float(bytes[eqOffset + 2]),
      },
      reverb: {
        enabled: bd.bool(bytes[reverbOffset]),
        time: bd.float(bytes[reverbOffset + 1]),
        tone: bd.float(bytes[reverbOffset + 2]),
        mix: bd.float(bytes[reverbOffset + 3]),
      },
      misc: {
        patchVolume: bd.float(bytes[miscOffset]),
      },
    };
  },
};

export function createPersistenceImpl(
  getParameters: () => SynthParameters,
  editParametersReceiver: IEditParametersReceiver,
) {
  return {
    emitStateBytes() {
      const parameters = getParameters();
      const paramBytes = mappers.serializeParameters(parameters);
      return new Uint8Array([formatRevision, ...paramBytes]);
    },
    applyStateBytes(bytes: Uint8Array) {
      if (
        bytes.length === 1 + parameterByteCount &&
        bytes[0] === formatRevision
      ) {
        const parameters = mappers.deserializeParameters([...bytes.slice(1)]);
        editParametersReceiver.setAllParameters(parameters);
      } else {
        console.warn(`[ptmw] skipped incompatible data on applyStateBytes`);
      }
    },
  };
}
