import {
  allPartStyles,
  PartItem,
  PartKey,
  PartStyle,
  pitchTweakRangeMap,
  StepNote,
  sampleVariationCounts,
} from "@/model/defs";
import { styleIterators, styleVolumesMap } from "@/model/generator/pattern";
import { seqNumbers } from "@/utils/helpers";
import {
  pickOneOf,
  prioritize,
  probably,
  probablyChoose,
  randRangeF,
  randRangeI,
} from "@/utils/randomizer-utils";

type PartPreference = {
  style(): PartStyle;
  patternLength(): number;
};

function getRandomSampleKey(partKey: PartKey): string {
  let sampleKeyBase = partKey.toLowerCase();
  if (partKey === "HC" || (partKey === "HO" && probably(0.5))) {
    sampleKeyBase = pickOneOf(["hc", "ho"]);
  }
  const numVariations = sampleVariationCounts[partKey];
  const variationIndex = randRangeI(1, numVariations);
  return `${sampleKeyBase}${variationIndex}`;
}

function getRandomPitchTweak(partKey: PartKey): number {
  const [min, max, type] = pitchTweakRangeMap[partKey];
  if (type === "linear") {
    return randRangeF(min, max);
  } else {
    return randRangeI(min, max);
  }
}

const partPreferences: Record<PartKey, PartPreference> = {
  BD: {
    style: () => probablyChoose(0.75, "fourByFour", "broken"),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  CL: {
    style: () =>
      prioritize<PartStyle>([
        [0.33, "twoAndFour"],
        [0.2, "fourByFour"],
        pickOneOf(allPartStyles),
      ]),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  HO: {
    style: () =>
      prioritize<PartStyle>([
        [0.75, "offbeats"],
        [0.13, "fourByFour"],
        pickOneOf(allPartStyles),
      ]),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  RD: {
    style: () =>
      prioritize<PartStyle>([
        [0.5, "offbeats"],
        [0.32, "fourByFour"],
        pickOneOf(allPartStyles),
      ]),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  HC: {
    style: () =>
      probablyChoose(
        0.75,
        "randBusy",
        pickOneOf([
          "randBusy",
          "offbeats",
          "twoAndFour",
          "randSparse",
          "fourByFour",
          "broken",
        ]),
      ),
    patternLength: () => pickOneOf([8, 16]),
  },
  ST: {
    style: () =>
      pickOneOf([
        "broken",
        "twoAndFour",
        "randSparse",
        "randBusy",
        "occasional",
      ]),
    // patternLength: () => prioritize([[0.5, 32], [0.3, 64], 16]),
    patternLength: () => prioritize([[0.5, 32], 16]),
  },
  SN: {
    style: () => pickOneOf(allPartStyles),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  PR: {
    style: () => pickOneOf(allPartStyles),
    patternLength: () => probablyChoose(0.5, 8, 16),
  },
  BS: {
    style: () => pickOneOf(allPartStyles),
    patternLength: () => prioritize([[0.5, 8], [0.25, 4], 16]),
  },
};

export function generatePartItem(partKey: PartKey): PartItem {
  const pref = partPreferences[partKey];
  const style = pref.style();
  const sampleKey = getRandomSampleKey(partKey);
  const patternLength = pref.patternLength();
  const pitch = 0;
  const styleIterator = styleIterators[style];
  const notes = seqNumbers(patternLength).map((i) => styleIterator(i, pitch));
  const pitchTweak = getRandomPitchTweak(partKey);
  const { volume: originalVolume, weakVelocity } = styleVolumesMap[style]();
  const volume = originalVolume * 0.5;
  const stepLength = patternLength;
  const outputActive = true;
  return {
    partKey,
    style,
    sampleKey,
    pitchTweak,
    stepLength,
    notes,
    volume,
    weakVelocity,
    outputActive,
  };
}

export function stringifyNotes(notes: (StepNote | null)[]): string {
  return notes
    .map((note) => {
      if (!note) return "x";
      return note.velocity === 0.5 ? ".5" : "1";
    })
    .join("-");
}

export function stringifyPartItem(partItem: PartItem): string {
  const { partKey, style, sampleKey, pitchTweak, notes } = partItem;
  return `${partKey}|${style}|${sampleKey}|p:${pitchTweak.toFixed(2)}|w:${partItem.weakVelocity.toFixed(2)}|v:${partItem.volume.toFixed(2)}|${stringifyNotes(notes)}`;
}
