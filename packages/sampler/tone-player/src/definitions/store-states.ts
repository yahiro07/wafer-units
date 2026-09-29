import { SamplerSlot, CommonParameters } from "@/definitions/types";
import { Store } from "snap-store";

export type StoreState = {
  //persistent
  slots: SamplerSlot[];
  commonParameters: CommonParameters;
  audioSourceText: string;
  //volatile
  audioBaseUrl: string;
  audioPaths: string[];
  levelsMap: Record<number, number[]>; //audioIndex-->levels
  errorMessage: string | null;
};

export type AppStore = Store<StoreState>;

// const audioSourceTextDefault = `
// @base https://github.com/yahiro07/wafer-units/tree/main/packages/drum-machines/techno-beat-machine/public/samples/
// @samples bd1.ogg bs1.ogg cl1.ogg hc1.ogg ho1.oog pr1.ogg rd1.ogg sn1.ogg st1.ogg
// @license MIT
// `;

export const defaultStoreState: StoreState = {
  slots: [
    { audioIndex: 0, volume: 0.5, pan: 0, aux: 0 },
    { audioIndex: 1, volume: 0.5, pan: 0, aux: 0 },
  ],
  commonParameters: { mainLevel: 0.5, auxLevel: 0.5 },
  audioSourceText: "",
  //
  audioBaseUrl: "",
  audioPaths: [],
  levelsMap: {},
  errorMessage: null,
};
// if (appEnvs.isDevelopment) {
//   defaultStoreState.audioSourceText = "";
// }
