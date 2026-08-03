import { Persistence } from "wafer-host/unit-types";
import { store } from "@/editor/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.noiseAOn ? 1 : 0,
      unaryToByte(parameters.noiseALpfCutoff),
      unaryToByte(parameters.noiseAGain),
      parameters.noiseBOn ? 1 : 0,
      unaryToByte(parameters.noiseBHpfCutoff),
      unaryToByte(parameters.noiseBGain),
      unaryToByte(parameters.envAttack),
      unaryToByte(parameters.envRelease),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 8) return;
    const noiseAOn = bytes[0] !== 0;
    const noiseALpfCutoff = unaryFromByte(bytes[1]);
    const noiseAGain = unaryFromByte(bytes[2]);
    const noiseBOn = bytes[3] !== 0;
    const noiseBHpfCutoff = unaryFromByte(bytes[4]);
    const noiseBGain = unaryFromByte(bytes[5]);
    const envAttack = unaryFromByte(bytes[6]);
    const envRelease = unaryFromByte(bytes[7]);
    store.assign({
      parameters: {
        noiseAOn,
        noiseALpfCutoff,
        noiseAGain,
        noiseBOn,
        noiseBHpfCutoff,
        noiseBGain,
        envAttack,
        envRelease,
      },
    });
  },
};
