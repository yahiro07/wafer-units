import { appConfig } from "@/base/app-config";
import { pieceIds } from "@/base/constants";
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

export const pieceAdjustedGains: Record<PieceId, number> = {
  kick: 0.55,
  snare: 0.4,
  opHat: 0.4,
  clHat: 0.3,
  clap: 0.4,
};

export const presets = {
  init: {
    pieceItems: pieceIds.map((id) => ({
      id,
      variationIndex: 0,
      active: true,
      pitch: 0.5,
      volume: pieceAdjustedGains[id],
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
      volume: pieceAdjustedGains[id],
      patternBits: mapPatterns({
        kick: "|o---|o---|o---|o---|",
        snare: "",
        opHat: "|--o-|--o-|--o-|--o-|",
        clHat: "",
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
      volume: pieceAdjustedGains[id],
      patternBits: mapPatterns({
        kick: "|o---|o---|o---|o---|",
        snare: "",
        opHat: "",
        clHat: "|o-o-|o-o-|o-o-|o-o-|",
        clap: "",
      })[id],
    })),
  },
  preset3: {
    pieceItems: pieceIds.map((id) => ({
      id,
      variationIndex: 0,
      active: true,
      pitch: 0.5,
      volume: pieceAdjustedGains[id],
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

export const initialPreset = structuredClone(presets.preset3) as Preset;

if (appConfig.isDevelopment && false) {
  initialPreset.pieceItems = pieceIds.map((id) => ({
    id,
    variationIndex: 0,
    active:
      {
        kick: true,
        snare: true,
        opHat: true,
        clHat: true,
        clap: true,
      }[id] ?? false,
    pitch: 0.5,
    volume: pieceAdjustedGains[id],
    patternBits: mapPatterns({
      kick: "|o---|o---|o---|o---|",
      snare: "|----|o---|----|o---|",
      opHat: "|--o-|--o-|--o-|--o-|",
      clHat: "|oo-o|oo-o|oo-o|oo-o|",
      clap: "|----|o---|----|o---|",
    })[id],
  }));
}
