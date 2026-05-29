import { uiActions } from "@/actions";
import { SynthParameters } from "@/definitions/parameters";
import { appState } from "@/store";

function unaryToByte(value: number) {
  return (value * 255) >>> 0;
}
function unaryFromByte(byte: number) {
  return byte / 255;
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      pr.oscWave, //0
      pr.oscOctave + 100,
      unaryToByte(pr.oscShape),
      unaryToByte(pr.ampAttack),
      unaryToByte(pr.ampDecay),
      unaryToByte(pr.ampSustain),
      unaryToByte(pr.ampRelease),
      unaryToByte(pr.chorusLevel),
      unaryToByte(pr.reverbLevel),
      pr.hpfOn ? 1 : 0,
      unaryToByte(pr.hpfCutoff),
      unaryToByte(pr.hpfPeak),
      pr.filterOn ? 1 : 0,
      unaryToByte(pr.filterCutoff),
      unaryToByte(pr.filterPeak),
      pr.foldingShaperOn ? 1 : 0,
      unaryToByte(pr.foldingShaperWave),
      unaryToByte(pr.foldingShaperLevel),
      unaryToByte(pr.densityShaperLevel),
      unaryToByte(pr.masterVolume), //19
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    return {
      oscWave: bytes[0],
      oscOctave: bytes[1] - 100,
      oscShape: unaryFromByte(bytes[2]),
      ampAttack: unaryFromByte(bytes[3]),
      ampDecay: unaryFromByte(bytes[4]),
      ampSustain: unaryFromByte(bytes[5]),
      ampRelease: unaryFromByte(bytes[6]),
      chorusLevel: unaryFromByte(bytes[7]),
      reverbLevel: unaryFromByte(bytes[8]),
      hpfOn: bytes[9] === 1,
      hpfCutoff: unaryFromByte(bytes[10]),
      hpfPeak: unaryFromByte(bytes[11]),
      filterOn: bytes[12] === 1,
      filterCutoff: unaryFromByte(bytes[13]),
      filterPeak: unaryFromByte(bytes[14]),
      foldingShaperOn: bytes[15] === 1,
      foldingShaperWave: unaryFromByte(bytes[16]),
      foldingShaperLevel: unaryFromByte(bytes[17]),
      densityShaperLevel: unaryFromByte(bytes[18]),
      masterVolume: unaryFromByte(bytes[19]),
    };
  },
};

const formatRevision = 1;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { synthParams } = appState;
    const paramBytes = mappers.serializeParameters(synthParams);
    return new Uint8Array([formatRevision, ...paramBytes]);
  },
  loadStateBytes(bytes: Uint8Array) {
    if (bytes.length === 1 + 20 && bytes[0] === formatRevision) {
      const synthParams = mappers.deserializeParameters([...bytes.slice(1)]);
      uiActions.loadStates({ synthParams });
    }
  },
};
