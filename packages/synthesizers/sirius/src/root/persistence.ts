import { SynthParameters } from "@/defs/definitions";
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
      pr.oscWave, //0
      ...[
        pr.oscDetune, //1
        pr.oscSub,
        pr.oscDrift,
        pr.fxChorus,
        pr.fxReverb,
        pr.filterCutoff,
        pr.filterPeak,
        pr.filterDecay,
        pr.ampDecay,
        pr.ampRelease,
        pr.patchVolume, //11
      ].map(paramToByte),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    const floatParams = bytes.map(paramFromByte);
    return {
      oscWave: bytes[0] as SynthParameters["oscWave"],
      oscDetune: floatParams[1],
      oscSub: floatParams[2],
      oscDrift: floatParams[3],
      fxChorus: floatParams[4],
      fxReverb: floatParams[5],
      filterCutoff: floatParams[6],
      filterPeak: floatParams[7],
      filterDecay: floatParams[8],
      ampDecay: floatParams[9],
      ampRelease: floatParams[10],
      patchVolume: floatParams[11],
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
    if (bytes.length === 2 + 12 && bytes[0] === formatRevision) {
      const presetIndex = bytes[1];
      const presetKey = mappers.presetNameFromIndex(presetIndex);
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      store.assign({ presetKey, parameters });
    }
  },
};
