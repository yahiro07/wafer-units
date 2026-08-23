import { ShapeEnvRange, SynthParameters, WaveMode } from "@/defs/definitions";
import { allPresetKeys, store } from "@/root/store";

function paramToByte(value: number) {
  return (value * 255) >>> 0;
}
function paramFromByte(byte: number) {
  return byte / 255;
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      pr.waveMode, //0
      ...[
        pr.shape, //1
        pr.envDecay,
        pr.detune,
        pr.sub ? 1 : 0,
        pr.decay,
        pr.release,
        pr.drift,
        pr.loFi,
        pr.chorus,
        pr.delay,
        pr.reverb,
        pr.patchVolume, //12
      ].map(paramToByte),
      pr.envRange, //13: 0 or 1
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    const floatParams = bytes.map(paramFromByte);
    return {
      waveMode: bytes[0] as WaveMode,
      shape: floatParams[1],
      envDecay: floatParams[2],
      detune: floatParams[3],
      sub: bytes[4] !== 0,
      decay: floatParams[5],
      release: floatParams[6],
      drift: floatParams[7],
      loFi: floatParams[8],
      chorus: floatParams[9],
      delay: floatParams[10],
      reverb: floatParams[11],
      patchVolume: floatParams[12],
      envRange: bytes[13] === 0 ? ShapeEnvRange.Low : ShapeEnvRange.High,
    };
  },
  presetNameToIndex(presetName: string) {
    return allPresetKeys.indexOf(presetName);
  },
  presetNameFromIndex(index: number) {
    return allPresetKeys[index] || allPresetKeys[0];
  },
};

const formatRevision = 1;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { presetKey, parameters } = store.state;
    const paramBytes = mappers.serializeParameters(parameters);
    const presetIndex = mappers.presetNameToIndex(presetKey);
    return new Uint8Array([formatRevision, presetIndex, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (
      (bytes.length === 2 + 13 || bytes.length === 2 + 14) &&
      bytes[0] === formatRevision
    ) {
      const presetIndex = bytes[1];
      const presetKey = mappers.presetNameFromIndex(presetIndex);
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      store.assign({ presetKey, parameters });
    }
  },
};
