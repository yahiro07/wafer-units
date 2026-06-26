import { createStore, Store } from "snap-store";
import { PieceItem } from "@/base/type";

type StorState = {
  pieces: PieceItem[];
  stepPosition: number;
};

export type AppStore = Store<StorState>;

export function createAppStore(pieces: PieceItem[]): AppStore {
  return createStore<StorState>({
    pieces,
    stepPosition: -1,
  });
}
