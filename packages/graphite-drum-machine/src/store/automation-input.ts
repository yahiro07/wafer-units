import { AutomationPort } from "wafer-host/unit-types";
import { PieceId } from "@/base/type";
import { Actions } from "@/store/actions";
import { AppStore } from "@/store/store";

type PieceParameterType = "pitch" | "volume";

export function createAutomationInput(
  store: AppStore,
  actions: Actions,
): AutomationPort {
  function decodeParameterId(id: string): [PieceId, PieceParameterType] {
    const [pieceId, parameterType] = id.split("_");
    return [pieceId as PieceId, parameterType as PieceParameterType];
  }
  return {
    getParameterSpecs() {
      return [
        { id: "masterVolume" },
        { id: "kick_pitch" },
        { id: "kick_volume" },
        { id: "snare_pitch" },
        { id: "snare_volume" },
        { id: "opHat_pitch" },
        { id: "opHat_volume" },
        { id: "clHat_pitch" },
        { id: "clHat_volume" },
        { id: "clap_pitch" },
        { id: "clap_volume" },
      ];
    },
    getParameter(parameterId) {
      if (parameterId === "masterVolume") {
        return store.state.masterVolume;
      }
      const [pieceId, parameterType] = decodeParameterId(parameterId);
      const piece = store.state.pieces.find((piece) => piece.id === pieceId);
      return piece?.[parameterType] ?? 0;
    },
    setParameter(parameterId, value) {
      if (parameterId === "masterVolume") {
        store.setMasterVolume(value);
      }
      const [pieceId, parameterType] = decodeParameterId(parameterId);
      actions.patchPiece(pieceId, { [parameterType]: value });
    },
  };
}
