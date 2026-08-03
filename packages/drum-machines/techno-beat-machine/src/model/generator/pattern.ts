import { PartStyle, StepNote } from "@/model/defs";
import { probably, randRangeF } from "@/utils/randomizer-utils";

export function createNote(pitch: number, velocity: number): StepNote {
  return { pitch, velocity };
}

export const styleVolumesMap: Record<
  PartStyle,
  () => { volume: number; weakVelocity: number }
> = {
  fourByFour: () => ({ volume: 1, weakVelocity: randRangeF(0.1, 0.9) }),
  offbeats: () => ({ volume: 1, weakVelocity: randRangeF(0.1, 0.9) }),
  twoAndFour: () => ({ volume: 1, weakVelocity: randRangeF(0.1, 0.7) }),
  randBusy: () => ({ volume: randRangeF(0.7, 1), weakVelocity: 0.3 }),
  randSparse: () => ({ volume: randRangeF(0.7, 1), weakVelocity: 0.3 }),
  occasional: () => ({ volume: randRangeF(0.5, 1), weakVelocity: 0.3 }),
  broken: () => ({ volume: 1, weakVelocity: randRangeF(0.1, 0.7) }),
};

export const styleIterators: Record<
  PartStyle,
  (i: number, pitch: number) => StepNote | null
> = {
  fourByFour(i, pitch) {
    if (i % 4 === 0) {
      return createNote(pitch, 1);
    } else if (probably(0.05)) {
      return createNote(pitch, 0.5);
    }
    return null;
  },
  offbeats(i, pitch) {
    if ((i + 2) % 4 === 0) {
      return createNote(pitch, 1);
    } else if (probably(0.05)) {
      return createNote(pitch, 0.5);
    }
    return null;
  },
  twoAndFour(i, pitch) {
    if ((i + 4) % 8 === 0) {
      return createNote(pitch, 1);
    } else if (probably(0.1) && i % 4 !== 0) {
      return createNote(pitch, 0.5);
    }
    return null;
  },
  randBusy(_i, pitch) {
    if (probably(0.8)) {
      return createNote(pitch, 1);
    }
    return null;
  },
  randSparse(_i, pitch) {
    if (probably(0.2)) {
      return createNote(pitch, 1);
    }
    return null;
  },
  occasional(_i, pitch) {
    if (probably(0.05)) {
      return createNote(pitch, 1);
    }
    return null;
  },
  broken(i, pitch) {
    if (i % 8 === 0) {
      return createNote(pitch, 1);
    } else if ((i + 2) % 8 === 0 || (i + 5) % 8 === 0) {
      return createNote(pitch, 1);
    } else if (probably(0.05)) {
      return createNote(pitch, 0.5);
    }
    return null;
  },
};
