import { OscWave, SynthParameters } from "@/defs/definitions";
import { allPresetKeys, store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

const voiceOctaveMin = -2;
const voiceOctaveMax = 2;
const osc2OctaveMin = -2;
const osc2OctaveMax = 2;

function octaveToByte(octave: number, min: number) {
  return octave - min;
}

function octaveFromByte(
  byte: number,
  min: number,
  max: number,
): number | null {
  const octave = byte + min;
  if (octave < min || octave > max) return null;
  return octave;
}

function waveFromByte(byte: number): OscWave | null {
  if (byte < OscWave.Saw || byte > OscWave.Ex) return null;
  return byte as OscWave;
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      octaveToByte(pr.voiceOctave, voiceOctaveMin),
      pr.osc1Wave,
      unaryToByte(pr.oscDetune),
      pr.osc2Wave,
      octaveToByte(pr.osc2Octave, osc2OctaveMin),
      unaryToByte(pr.osc2Volume),
      unaryToByte(pr.hpfCutoff),
      unaryToByte(pr.hpfQ),
      unaryToByte(pr.lpfCutoff),
      unaryToByte(pr.lpfEnvMod),
      unaryToByte(pr.lpfQ),
      pr.lpfSteep ? 1 : 0,
      pr.attackAltPunch ? 1 : 0,
      unaryToByte(pr.ampAttack),
      unaryToByte(pr.ampDecay),
      unaryToByte(pr.ampSustain),
      unaryToByte(pr.ampRelease),
      unaryToByte(pr.density),
      unaryToByte(pr.globalVolume),
      pr.pitchLfoAltPitchEg ? 1 : 0,
      unaryToByte(pr.pitchLfoRate),
      unaryToByte(pr.pitchLfoDepth),
      unaryToByte(pr.filterLfoRate),
      unaryToByte(pr.filterLfoDepth),
      unaryToByte(pr.reverbDecay),
      unaryToByte(pr.reverbMix),
      unaryToByte(pr.reverbDamp),
      unaryToByte(pr.chorusLevel),
      unaryToByte(pr.presence),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters | null {
    const voiceOctave = octaveFromByte(
      bytes[0],
      voiceOctaveMin,
      voiceOctaveMax,
    );
    const osc1Wave = waveFromByte(bytes[1]);
    const osc2Wave = waveFromByte(bytes[3]);
    const osc2Octave = octaveFromByte(bytes[4], osc2OctaveMin, osc2OctaveMax);
    if (
      voiceOctave === null ||
      osc1Wave === null ||
      osc2Wave === null ||
      osc2Octave === null
    ) {
      return null;
    }
    return {
      voiceOctave,
      osc1Wave,
      oscDetune: unaryFromByte(bytes[2]),
      osc2Wave,
      osc2Octave,
      osc2Volume: unaryFromByte(bytes[5]),
      hpfCutoff: unaryFromByte(bytes[6]),
      hpfQ: unaryFromByte(bytes[7]),
      lpfCutoff: unaryFromByte(bytes[8]),
      lpfEnvMod: unaryFromByte(bytes[9]),
      lpfQ: unaryFromByte(bytes[10]),
      lpfSteep: bytes[11] !== 0,
      attackAltPunch: bytes[12] !== 0,
      ampAttack: unaryFromByte(bytes[13]),
      ampDecay: unaryFromByte(bytes[14]),
      ampSustain: unaryFromByte(bytes[15]),
      ampRelease: unaryFromByte(bytes[16]),
      density: unaryFromByte(bytes[17]),
      globalVolume: unaryFromByte(bytes[18]),
      pitchLfoAltPitchEg: bytes[19] !== 0,
      pitchLfoRate: unaryFromByte(bytes[20]),
      pitchLfoDepth: unaryFromByte(bytes[21]),
      filterLfoRate: unaryFromByte(bytes[22]),
      filterLfoDepth: unaryFromByte(bytes[23]),
      reverbDecay: unaryFromByte(bytes[24]),
      reverbMix: unaryFromByte(bytes[25]),
      reverbDamp: unaryFromByte(bytes[26]),
      chorusLevel: unaryFromByte(bytes[27]),
      presence: unaryFromByte(bytes[28]),
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
const parameterByteCount = 29;

export const persistence = {
  emitStateBytes(): Uint8Array {
    const { presetKey, parameters } = store.state;
    const paramBytes = mappers.serializeParameters(parameters);
    const presetIndex = mappers.presetNameToIndex(presetKey);
    return new Uint8Array([formatRevision, presetIndex, ...paramBytes]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length === 2 + parameterByteCount && bytes[0] === formatRevision) {
      const presetIndex = bytes[1];
      const presetKey = mappers.presetNameFromIndex(presetIndex);
      const parameters = mappers.deserializeParameters([...bytes.slice(2)]);
      if (parameters) {
        store.assign({ presetKey, parameters });
      }
    }
  },
};
