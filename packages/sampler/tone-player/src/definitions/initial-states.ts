import { StoreState } from "./types";

const audioSourceTextDefault = `
@base https://github.com/yahiro07/wafer-units/tree/main/packages/drum-machines/techno-beat-machine/public/samples/
@samples bd1.ogg bs1.ogg cl1.ogg hc1.ogg ho1.oog pr1.ogg rd1.ogg sn1.ogg st1.ogg
@license MIT
`;

export const defaultStoreState: StoreState = {
  slots: [
    { audioIndex: 0, volume: 0.5, pan: 0, aux: 0 },
    { audioIndex: 1, volume: 0.5, pan: 0, aux: 0 },
  ],
  levelsMap: {},
  audioSourceText: audioSourceTextDefault,
  commonParameters: { mainLevel: 0.5, auxLevel: 0.5 },
  errorMessage: null,
};
