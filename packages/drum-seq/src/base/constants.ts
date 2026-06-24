import { mapObjectEntries } from "mofur/ax";
import { PieceId, PieceItem } from "@/base/type";

const pieceIds: PieceId[] = ["kick", "snare", "opHat", "clHat", "clap"];

function getUrlBase() {
  if (import.meta.url.includes("index.js")) {
    return import.meta.url.replace(/\/index\.js.*$/, "");
  }
  return "";
}

export const pieceSampleUrlSources: Record<PieceId, string[]> = {
  kick: ["samples/bd-01.wav", "samples/bd-05.wav"],
  snare: ["samples/hsnare-03.wav"],
  opHat: ["samples/ho-01.wav"],
  clHat: ["samples/hc-03.wav"],
  clap: ["samples/pc-02.wav"],
};

const urlBase = getUrlBase();
export const pieceSampleUrls = mapObjectEntries(
  pieceSampleUrlSources,
  (_, urls) => urls.map((url) => `${urlBase}/${url}`),
);

export const defaultPieces: PieceItem[] = pieceIds.map((id) => ({
  id,
  variationIndex: 0,
  active: true,
  pitch: 0.5,
  volume: 0.5,
  patternBits: id === "kick" ? (1 << 0) | (1 << 4) | (1 << 8) | (1 << 12) : 0,
}));

export const pieceDisplayNames: Record<PieceId, string> = {
  kick: "KICK",
  snare: "SNARE",
  opHat: "OP-HIHAT",
  clHat: "CL-HIHAT",
  clap: "CLAP",
};
