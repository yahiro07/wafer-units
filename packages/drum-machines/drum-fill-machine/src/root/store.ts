import { SceneParameters } from "@/core/definitions";
import { createStore } from "snap-store";

export type StoreState = SceneParameters;

export const store = createStore<StoreState>({
  patternKey: "pattern1",
  loopBars: 4,
  hatPartItem: {
    partKey: "hat",
    sampleKey: "hc1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  cymbalPartItem: {
    partKey: "cymbal",
    sampleKey: "cc1",
    pitchTweak: 0,
    volume: 0.5,
    enabled: true,
  },
  volumeSlopeUp: false,
});
