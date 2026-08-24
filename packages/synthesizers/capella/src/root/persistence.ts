import {
  allOsc1Ratios,
  allOscWaveTypes,
  OscWaveType,
  SynthParameters,
} from "@/defs/definitions";
import { store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

const octaveMin = -2;
const octaveMax = 2;
const parameterByteCount = 13;
const formatRevision = 1;

function waveToByte(wave: OscWaveType) {
  const index = allOscWaveTypes.indexOf(wave);
  return index >= 0 ? index : 0;
}

function waveFromByte(byte: number): OscWaveType | null {
  return allOscWaveTypes[byte] ?? null;
}

function ratioToByte(ratio: number) {
  const index = allOsc1Ratios.indexOf(ratio);
  return index >= 0 ? index : 0;
}

function ratioFromByte(byte: number): number | null {
  return allOsc1Ratios[byte] ?? null;
}

function octaveToByte(octave: number) {
  return octave - octaveMin;
}

function octaveFromByte(byte: number): number | null {
  const octave = byte + octaveMin;
  if (octave < octaveMin || octave > octaveMax) return null;
  return octave;
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      waveToByte(pr.osc1Wave),
      octaveToByte(pr.osc1Octave),
      ratioToByte(pr.osc1Ratio),
      unaryToByte(pr.osc1Decay),
      waveToByte(pr.osc2Wave),
      pr.osc2ModAltMix ? 1 : 0,
      unaryToByte(pr.osc2Mod),
      unaryToByte(pr.osc2Decay),
      unaryToByte(pr.ampRelease),
      unaryToByte(pr.chorusLevel),
      pr.chorusAltReverb ? 1 : 0,
      octaveToByte(pr.patchOctave),
      unaryToByte(pr.patchVolume),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters | null {
    const osc1Wave = waveFromByte(bytes[0]);
    const osc1Octave = octaveFromByte(bytes[1]);
    const osc1Ratio = ratioFromByte(bytes[2]);
    const osc2Wave = waveFromByte(bytes[4]);
    const patchOctave = octaveFromByte(bytes[11]);
    if (
      osc1Wave === null ||
      osc1Octave === null ||
      osc1Ratio === null ||
      osc2Wave === null ||
      patchOctave === null
    ) {
      return null;
    }
    return {
      osc1Wave,
      osc1Octave,
      osc1Ratio,
      osc1Decay: unaryFromByte(bytes[3]),
      osc2Wave,
      osc2ModAltMix: bytes[5] !== 0,
      osc2Mod: unaryFromByte(bytes[6]),
      osc2Decay: unaryFromByte(bytes[7]),
      ampRelease: unaryFromByte(bytes[8]),
      chorusLevel: unaryFromByte(bytes[9]),
      chorusAltReverb: bytes[10] !== 0,
      patchOctave,
      patchVolume: unaryFromByte(bytes[12]),
    };
  },
};

export const persistence = {
  emitStateBytes(): Uint8Array {
    const paramBytes = mappers.serializeParameters(store.state.parameters);
    return new Uint8Array([formatRevision, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === 1 + parameterByteCount && bytes[0] === formatRevision) {
      const parameters = mappers.deserializeParameters([...bytes.slice(1)]);
      if (parameters) {
        store.assign({ parameters });
      }
    }
  },
};
