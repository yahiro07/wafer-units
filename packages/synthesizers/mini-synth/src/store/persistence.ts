import { SynthParams } from "@/audio/synth-params";
import { appState, uiActions } from "@/store/app-store";

function paramToByte(value: number) {
  return (value * 255) >>> 0;
}
function paramFromByte(byte: number) {
  return byte / 255;
}

const mappers = {
  serializeParameters(parameters: SynthParams): number[] {
    const pr = parameters;
    return [
      pr.oscWave, //0
      ...[
        pr.oscDetune, //1
        pr.subLevel,
        pr.drift,
        pr.chorus,
        pr.reverb,
        pr.filterCutoff,
        pr.filterPeak,
        pr.filterEnvMod,
        pr.ampDecay,
        pr.ampRelease,
        pr.masterVolume, //11
      ].map(paramToByte),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParams {
    const floatParams = bytes.map(paramFromByte);
    return {
      oscWave: bytes[0] as SynthParams["oscWave"],
      oscDetune: floatParams[1],
      subLevel: floatParams[2],
      drift: floatParams[3],
      chorus: floatParams[4],
      reverb: floatParams[5],
      filterCutoff: floatParams[6],
      filterPeak: floatParams[7],
      filterEnvMod: floatParams[8],
      ampDecay: floatParams[9],
      ampRelease: floatParams[10],
      masterVolume: floatParams[11],
    };
  },
};

const formatRevision = 1;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { currentPresetIndex, parameters } = appState;
    const paramBytes = mappers.serializeParameters(parameters);
    return new Uint8Array([formatRevision, currentPresetIndex, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === 2 + 12 && bytes[0] === formatRevision) {
      const currentPresetIndex = bytes[1];
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      uiActions.loadState({ currentPresetIndex, parameters });
    }
  },
};
