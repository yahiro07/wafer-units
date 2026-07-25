import { createStore } from "snap-store";
import { presets } from "@/root/model";

export const store = createStore<{
  presetIndex: number;
  degreeFlags: number;
  octave: number;
  duty: number;
  playPos: number | null;
}>({
  presetIndex: 0,
  degreeFlags: presets[0].degreeFlags,
  octave: 0,
  duty: 0.5,
  playPos: null,
});

export const actions = {
  selectPreset(index: number) {
    store.assign({
      presetIndex: index,
      degreeFlags: presets[index].degreeFlags,
    });
  },
};
