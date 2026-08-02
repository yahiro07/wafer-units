import {
  createPlainSelectorOptions,
  createSelectorOptions,
} from "@/components-mono2";
import { seqNumbers } from "mofur/ax";

export type SongKeyMetaAttrs = {
  songKey?: string; //"C", "Am", etc.
};

export const noteRangeValues = [
  "R",
  "RR",
  "RRR",
  "RF",
  "RFR",
  "RFRF",
  "RFRFR",
  "RTF",
  "RTFR",
  "RTFRT",
  "RTFRTF",
  "RTFRTFR",
];
export type NoteRange = (typeof noteRangeValues)[number];

export const noteRangeOptions = createPlainSelectorOptions(noteRangeValues);

export type NoteDuration = "/16" | "/8" | "/4" | "/2" | "1";
const noteDurationValues: NoteDuration[] = ["/16", "/8", "/4", "/2", "1"];

export const noteDurationOptions =
  createPlainSelectorOptions<NoteDuration>(noteDurationValues);

export type DirectionMode = "up" | "upDown";
export const directionModeValues: DirectionMode[] = ["up", "upDown"];
export const directionModeOptions =
  createPlainSelectorOptions<DirectionMode>(directionModeValues);

export type WrappingMode = "bottom" | "bottom1" | "top1" | "top";
export const wrappingModeValues: WrappingMode[] = [
  "bottom",
  "bottom1",
  "top1",
  "top",
];
export const wrappingModeOptions =
  createPlainSelectorOptions<WrappingMode>(wrappingModeValues);

export const octaveShiftOptions = createSelectorOptions(
  seqNumbers(7).map((i) => [i - 3, `${i - 3}`]),
);
