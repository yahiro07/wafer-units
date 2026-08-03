import { Persistence } from "wafer-host/unit-types";
import { ChorusType } from "@/core/definitions";
import { store } from "@/editor/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.isOn ? 1 : 0,
      parameters.chorusType,
      unaryToByte(parameters.chorusLevel),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 3) return;
    const isOn = bytes[0] !== 0;
    const chorusType = bytes[1] as ChorusType;
    if (chorusType < 1 || chorusType > 5) return;
    const chorusLevel = unaryFromByte(bytes[2]);
    store.assign({
      parameters: {
        isOn,
        chorusType,
        chorusLevel,
      },
    });
  },
};
