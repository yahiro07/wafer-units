import { createStore, Store } from "snap-store/preact";
import { PieceItem } from "@/base/type";

type StoreState = {
  pieces: PieceItem[];
  stepPosition: number;
  masterVolume: number;
};

export type AppStore = Store<StoreState>;

export function createAppStore(pieces: PieceItem[]): AppStore {
  return createStore<StoreState>({
    pieces,
    stepPosition: -1,
    masterVolume: 0.5,
  });
}
