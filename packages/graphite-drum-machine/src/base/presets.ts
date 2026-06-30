import { PieceId, Preset } from "@/base/type";

function mapPattern(text: string): number {
  const chars = text.replaceAll("|", "").split("");
  let bits = 0;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "o") {
      bits |= 1 << i;
    }
  }
  return bits;
}

function mapPatterns(source: Record<PieceId, string>): Record<PieceId, number> {
  return Object.fromEntries(
    Object.entries(source).map(([id, text]) => [id, mapPattern(text)]),
  ) as Record<PieceId, number>;
}

const pieceIds: PieceId[] = ["kick", "snare", "opHat", "clHat", "clap"];

export const presets = {
  init: {
    pieceItems: pieceIds.map((id) => ({
      id,
      variationIndex: 0,
      active: true,
      pitch: 0.5,
      volume: 0.5,
      patternBits: mapPatterns({
        kick: "",
        snare: "",
        opHat: "",
        clHat: "",
        clap: "",
      })[id],
    })),
  },
  preset1: {
    pieceItems: pieceIds.map((id) => ({
      id,
      variationIndex: 0,
      active: true,
      pitch: 0.5,
      volume:
        {
          clHat: 0.25,
          clap: 0.3,
          opHat: 0.35,
          snare: 0.5,
          kick: 0.5,
        }[id] ?? 0.5,
      patternBits: mapPatterns({
        kick: "|o---|o---|o---|o---|",
        snare: "",
        opHat: "",
        clHat: "|oooo|oooo|oooo|oooo|",
        clap: "",
      })[id],
    })),
  },
  preset2: {
    pieceItems: pieceIds.map((id) => ({
      id,
      variationIndex: 0,
      active: true,
      pitch: 0.5,
      volume:
        {
          clHat: 0.25,
          clap: 0.3,
          opHat: 0.35,
          snare: 0.5,
          kick: 0.5,
        }[id] ?? 0.5,
      patternBits: mapPatterns({
        kick: "|o---|o---|o---|o---|",
        snare: "|----|o---|----|o---|",
        opHat: "|--o-|--o-|--o-|--o-|",
        clHat: "|oo-o|oo-o|oo-o|oo-o|",
        clap: "|----|o---|----|o---|",
      })[id],
    })),
  },
} satisfies Record<string, Preset>;

export type PresetKey = keyof typeof presets;
