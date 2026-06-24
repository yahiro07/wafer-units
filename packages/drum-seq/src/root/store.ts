import { createStore, Store } from "snap-store";
import { defaultPieces } from "@/root/constants";
import { PieceItem } from "@/root/type";

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
