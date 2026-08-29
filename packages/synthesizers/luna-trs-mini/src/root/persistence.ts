import { numOscWaveTypes, SynthParameters } from "@/defs/definitions";
import { allPresetKeys, store } from "@/root/store";
import { clampValue } from "@/utils/helpers";

const formatRevision = 1;
const parameterByteCount = 26;

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
      bs.uint(pr.osc1Wave),
      bs.uint(pr.osc1Unison),
      bs.bool(pr.osc1Spread),
      bs.float(pr.osc1Detune),
      bs.bool(pr.osc1Sub),
      bs.uint(pr.osc1Mix),
      //
      bs.octave(pr.osc2Octave),
      bs.uint(pr.osc2Wave),
      bs.uint(pr.osc2Unison),
      bs.bool(pr.osc2Spread),
      bs.float(pr.osc2Detune),
      bs.bool(pr.osc2Sub),
      bs.uint(pr.osc2Mix),
      //
      bs.float(pr.oscMix),
      bs.bool(pr.ampDecayAltAttack),
      bs.float(pr.ampDecay),
      bs.float(pr.ampRelease),
      //
      bs.float(pr.lpfCutoff),
      bs.float(pr.lpfPeak),
      bs.float(pr.lpfDecay),
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
      osc1Wave: bd.uint(bytes[1], 0, numOscWaveTypes - 1),
      osc1Unison: bd.uint(bytes[2], 1, 5),
      osc1Spread: bd.bool(bytes[3]),
      osc1Detune: bd.float(bytes[4]),
      osc1Sub: bd.bool(bytes[5]),
      osc1Mix: bd.uint(bytes[6], 0, 2),
      //
      osc2Octave: bd.octave(bytes[7]),
      osc2Wave: bd.uint(bytes[8], 0, numOscWaveTypes - 1),
      osc2Unison: bd.uint(bytes[9], 1, 5),
      osc2Spread: bd.bool(bytes[10]),
      osc2Detune: bd.float(bytes[11]),
      osc2Sub: bd.bool(bytes[12]),
      osc2Mix: bd.uint(bytes[13], 0, 2),
      //
      oscMix: bd.float(bytes[14]),
      ampDecayAltAttack: bd.bool(bytes[15]),
      ampDecay: bd.float(bytes[16]),
      ampRelease: bd.float(bytes[17]),
      //
      lpfCutoff: bd.float(bytes[18]),
      lpfPeak: bd.float(bytes[19]),
      lpfDecay: bd.float(bytes[20]),
      //
      reverbTime: bd.float(bytes[21]),
      reverbTone: bd.float(bytes[22]),
      reverbMix: bd.float(bytes[23]),
      //
      density: bd.float(bytes[24]),
      patchVolume: bd.float(bytes[25]),
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
      console.warn(
        `[luna-trs-mini] skipped incompatible data on applyStateBytes`,
      );
    }
  },
};
