import { OscWave, pitchPresets, SynthParameters } from "@/defs/definitions";
import { store } from "@/root/store";
import { clampValue, unaryFromByte, unaryToByte } from "@/utils/helpers";

namespace _persistenceTypes {
  type SynthParameters = {
    oscWave: OscWave; //1byte
    filterCutoff: number; //1byte
    filterPeak: number; //1byte
    filterEnvMod: number; //1byte
    ampDecay: number; //1byte
    drive: number; //1byte
    patchVolume: number; //1byte
  };

  type SynthesizerEditState = {
    synthParameters: SynthParameters;
  };

  type SequencerEditState = {
    pitchIndices: number[]; //6bytes, 255 for padding
    stepNotes: number[]; //16bytes, 255 for silent(-1) note
    stepModifierFlags: number[]; //4bytes packed, 2bits/step
  };

  type _StoreState = SequencerEditState &
    SynthesizerEditState & {
      standalonePlaying: boolean;
      hostPlaying: boolean;
      bpm: number;
      playPosition: number;
      pitchPresetIndex: number; //1byte
      lockPitchPreset: boolean; //1byte
      lockParameters: boolean; //1byte
    };
}

const formatRevision = 1;
const stateByteCount = 37;

function packModifierFlags(flags: number[]): number[] {
  const bytes = [0, 0, 0, 0];
  for (let i = 0; i < 16; i++) {
    bytes[i >> 2] |= (flags[i] & 3) << ((i & 3) * 2);
  }
  return bytes;
}

function unpackModifierFlags(bytes: number[]): number[] {
  const flags: number[] = [];
  for (let i = 0; i < 16; i++) {
    flags.push((bytes[i >> 2] >> ((i & 3) * 2)) & 3);
  }
  return flags;
}

function padPitchIndices(indices: number[]): number[] {
  const bytes = indices.slice(0, 6).map((n) => clampValue(n, 0, 24));
  while (bytes.length < 6) bytes.push(255);
  return bytes;
}

function readPitchIndices(bytes: number[]): number[] {
  const indices = bytes
    .filter((b) => b !== 255)
    .map((b) => clampValue(b, 0, 24));
  indices.sort((a, b) => a - b);
  return indices.length > 0 ? indices.slice(0, 6) : [0];
}

function encodeStepNotes(notes: number[]): number[] {
  const bytes = notes.slice(0, 16).map((n) => (n < 0 ? 255 : clampValue(n, 0, 24)));
  while (bytes.length < 16) bytes.push(255);
  return bytes;
}

function decodeStepNotes(bytes: number[]): number[] {
  return bytes.map((b) => (b === 255 ? -1 : clampValue(b, 0, 24)));
}

const mappers = {
  serializeParameters(parameters: SynthParameters): number[] {
    const pr = parameters;
    return [
      pr.oscWave,
      unaryToByte(pr.filterCutoff),
      unaryToByte(pr.filterPeak),
      unaryToByte(pr.filterEnvMod),
      unaryToByte(pr.ampDecay),
      unaryToByte(pr.drive),
      unaryToByte(pr.patchVolume),
    ];
  },
  deserializeParameters(bytes: number[]): SynthParameters {
    return {
      oscWave: clampValue(bytes[0], OscWave.sawtooth, OscWave.square),
      filterCutoff: clampValue(unaryFromByte(bytes[1]), 0, 1),
      filterPeak: clampValue(unaryFromByte(bytes[2]), 0, 1),
      filterEnvMod: clampValue(unaryFromByte(bytes[3]), 0, 1),
      ampDecay: clampValue(unaryFromByte(bytes[4]), 0, 1),
      drive: clampValue(unaryFromByte(bytes[5]), 0, 1),
      patchVolume: clampValue(unaryFromByte(bytes[6]), 0, 1),
    };
  },
};

export const persistenceImpl = {
  emitStateBytes(): Uint8Array {
    const st = store.state;
    return new Uint8Array([
      formatRevision,
      ...mappers.serializeParameters(st.synthParameters),
      ...padPitchIndices(st.pitchIndices),
      ...encodeStepNotes(st.stepNotes),
      ...packModifierFlags(st.stepModifierFlags),
      st.pitchPresetIndex,
      st.lockPitchPreset ? 1 : 0,
      st.lockParameters ? 1 : 0,
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length !== stateByteCount || bytes[0] !== formatRevision) {
      console.warn(`[bs03v2] skipped incompatible data on applyStateBytes`);
      return;
    }
    const arr = [...bytes];
    store.assign({
      synthParameters: mappers.deserializeParameters(arr.slice(1, 8)),
      pitchIndices: readPitchIndices(arr.slice(8, 14)),
      stepNotes: decodeStepNotes(arr.slice(14, 30)),
      stepModifierFlags: unpackModifierFlags(arr.slice(30, 34)),
      pitchPresetIndex: clampValue(arr[34], 0, pitchPresets.length - 1),
      lockPitchPreset: arr[35] !== 0,
      lockParameters: arr[36] !== 0,
    });
  },
};
