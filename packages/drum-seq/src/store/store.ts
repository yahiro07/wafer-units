import { createStore, Store } from "snap-store";
import { defaultPieces } from "@/base/constants";
import { PieceItem } from "@/base/type";

type StorState = {
  pieces: PieceItem[];
  stepPosition: number;
};

export type AppStore = Store<StorState>;

export function createAppStore(): AppStore {
  return createStore<StorState>({
    pieces: defaultPieces,
    stepPosition: -1,
  });
}
