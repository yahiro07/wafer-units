type PresetSource = {
  degrees: string;
  pattern: string;
  hint?: string;
};

const presetSources: PresetSource[] = [
  { degrees: "R", pattern: "_ooo", hint: "bass 16th x3" },
  { degrees: "R", pattern: "__oo", hint: "bass 16th x2" },
  { degrees: "R", pattern: "__o>", hint: "bass 8th" },
  //if pattern includes p,q,r (other than o)
  //it's an arpeggio and number of degree selection should be fixed
  { degrees: "R8", pattern: "o>p>", hint: "bass 8th octave altering" },
  { degrees: "R5", pattern: "o>p>", hint: "bass 8th(dur) 5th(pitch) altering" },
  { degrees: "R35", pattern: "o>p>q>p>", hint: "arp" },
  { degrees: "R358", pattern: "opqr", hint: "arp" },
  //various arp patterns could be added here
  { degrees: "R", pattern: "o!16", hint: "whole note" },
  { degrees: "R358", pattern: "o!16", hint: "whole note" },
  { degrees: "R", pattern: "o!32", hint: "2 bars note" },
  { degrees: "R358", pattern: "o!32", hint: "2 bars note" },
  { degrees: "R", pattern: "ooo>", hint: "trans gate" },
  { degrees: "R8", pattern: "ooo>", hint: "trans gate" },
  { degrees: "R", pattern: "o>_o>_o>", hint: "trans gate" },
];

export type Preset = {
  degreeFlags: number;
  pattern: string;
  stepLength: number;
  isArpeggio: boolean;
};

const bitPosMap = {
  R: 0,
  3: 1,
  5: 2,
  7: 3,
  8: 4,
} as const;

function mapDegreeStringsToFlags(degrees: string) {
  const chars = degrees.split("");
  let flags = 0;
  for (const char of chars) {
    const bitPos = bitPosMap[char as keyof typeof bitPosMap];
    if (bitPos === undefined) {
      continue;
    }
    flags |= 1 << bitPos;
  }
  return flags;
}

export const presets: Preset[] = presetSources.map((source) => {
  const pt = source.pattern;
  const stepLength = pt.includes("!")
    ? parseInt(pt.split("!")[1], 10)
    : pt.length;
  const isArpeggio = ["p", "q", "r"].some((char) => pt.includes(char));
  return {
    degreeFlags: mapDegreeStringsToFlags(source.degrees),
    pattern: source.pattern,
    stepLength,
    isArpeggio,
  };
});

export type Note = {
  degreeIndex: number; //0,1,2,3,4 for R,3,5,7,8
  position: number;
  duration: number;
};

function mapDegreeFlagToIndices(degreeFlags: number): number[] {
  const indices: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (degreeFlags & (1 << i)) {
      const degreeIndex = i;
      if (degreeIndex !== undefined) {
        indices.push(degreeIndex);
      }
    }
  }
  return indices;
}

export function buildPresetNotes(
  preset: Preset,
  degreeFlagsOverride?: number,
): Note[] {
  const pt = preset.pattern;
  const degreeIndices = mapDegreeFlagToIndices(
    degreeFlagsOverride ?? preset.degreeFlags,
  );
  if (pt.includes("!")) {
    return degreeIndices.map((degreeIndex) => ({
      degreeIndex,
      position: 0,
      duration: preset.stepLength,
    }));
  }
  const notes: Note[] = [];
  for (let i = 0; i < pt.length; i++) {
    const char = pt[i];
    if (["o", "p", "q", "r"].includes(char)) {
      if (preset.isArpeggio) {
        const index = "opqr".indexOf(char);
        notes.push({
          degreeIndex: degreeIndices[index],
          position: i,
          duration: 1,
        });
      } else {
        degreeIndices.forEach((degreeIndex) => {
          notes.push({
            degreeIndex,
            position: i,
            duration: 1,
          });
        });
      }
    } else if (char === ">") {
      const lastNotes = notes.filter(
        (note) => note.position + note.duration === i,
      );
      lastNotes.forEach((note) => {
        note.duration += 1;
      });
    }
  }
  return notes;
}

export function buildPresetNotesForLoop(
  preset: Preset,
  totalSteps: number,
  degreeFlagsOverride?: number,
): Note[] {
  const nx = (totalSteps / preset.stepLength) >>> 0;
  const allNotes: Note[] = [];
  for (let i = 0; i < nx; i++) {
    const offset = i * preset.stepLength;
    const notes = buildPresetNotes(preset, degreeFlagsOverride);
    allNotes.push(
      ...notes.map((note) => ({ ...note, position: note.position + offset })),
    );
  }
  return allNotes;
}
