import { SynthParameters } from "@/audio/types";
import { appState } from "@/store/app-store";
import { uiActions } from "@/store/ui-actions";

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
        pr.filterEnvMod,
        pr.ampDecay,
        pr.ampRelease,
        pr.ampMaster, //11
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
      filterEnvMod: floatParams[8],
      ampDecay: floatParams[9],
      ampRelease: floatParams[10],
      ampMaster: floatParams[11],
    };
  },
};

const formatRevision = 1;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { selectedProgramIndex, parameters } = appState;
    const paramBytes = mappers.serializeParameters(parameters);
    return new Uint8Array([
      formatRevision,
      selectedProgramIndex,
      ...paramBytes,
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === 2 + 12 && bytes[0] === formatRevision) {
      const selectedProgramIndex = bytes[1];
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      uiActions.loadStates({ selectedProgramIndex, parameters });
    }
  },
};
