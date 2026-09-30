import {
  SamplerSlot,
  CommonParameters,
  defaultSlotParameters,
  defaultCommonParameters,
} from "@/definitions/definitions";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { Store } from "snap-store";

export type StoreState = {
  //persistent
  slots: SamplerSlot[];
  commonParameters: CommonParameters;
  audioSourceText: string;
  //volatile
  audioBaseUrl: string;
  audioPaths: string[];
  // levelsMap: Record<number, number[]>; //audioIndex-->levels
  errorMessage: string | null;
  currentSlotIndex: number;
  padHoldStates: boolean[];
  dropTargetSlotIndex: number | null;
};

export type AppStore = Store<StoreState>;

// const audioSourceTextDefault = `
// @base https://github.com/yahiro07/wafer-units/tree/main/packages/drum-machines/techno-beat-machine/public/samples/
// @samples bd1.ogg bs1.ogg cl1.ogg hc1.ogg ho1.oog pr1.ogg rd1.ogg sn1.ogg st1.ogg
// @license MIT
// `;

export const defaultStoreState: StoreState = {
  slots: seqNumbers(12).map(() => ({
    audioIndex: -1,
    parameters: defaultSlotParameters,
  })),
  commonParameters: defaultCommonParameters,
  audioSourceText: "",
  //
  audioBaseUrl: "",
  audioPaths: [],
  // levelsMap: {},
  errorMessage: null,
  currentSlotIndex: 0,
  padHoldStates: seqNumbers(12).map(() => false),
  dropTargetSlotIndex: null,
};
// if (appEnvs.isDevelopment) {
//   defaultStoreState.audioSourceText = "";
// }
