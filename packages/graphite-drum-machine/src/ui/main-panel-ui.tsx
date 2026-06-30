import { isBitSet, seqNumbers, toggleBit } from "mofur/ax";
import { ReactNode } from "react";
import { pieceDisplayNames } from "@/base/constants";
import { Icons } from "@/base/icons";
import { pieceSampleUrls } from "@/base/piece-sample-urls";
import { PieceItem } from "@/base/type";
import {
  Knob,
  PanelFrame,
  PieceActiveButton,
  PieceAssignIndexLabel,
  PieceIndicator,
  PieceNameBox,
  PieceOperationButton,
  PieceRowFrame,
  PresetButton,
  StepButton,
} from "@/components";
import { useAppContext } from "@/store/app-context";

const PieceHeadPart = ({
  piece,
  stepIndicatorContent,
}: {
  piece: PieceItem;
  stepIndicatorContent: ReactNode;
}) => {
  const { actions } = useAppContext();

  const pieceName = pieceDisplayNames[piece.id];
  const handlers = {
    setVolume(value: number) {
      actions.patchPiece(piece.id, { volume: value });
    },
    setPitch(value: number) {
      actions.patchPiece(piece.id, { pitch: value });
    },
    toggleActive() {
      actions.patchPiece(piece.id, { active: !piece.active });
    },
    shiftVariationIndex() {
      const numVariations = pieceSampleUrls[piece.id].length;
      const nextIndex =
        (piece.variationIndex + 1 + numVariations) % numVariations;
      actions.patchPiece(piece.id, { variationIndex: nextIndex });
    },
    previewPiece() {
      actions.previewPiece(piece.id);
    },
  };
  return (
    <div className="flex-ha gap-3 px-1">
      <PieceActiveButton
        active={piece.active}
        onClick={handlers.toggleActive}
      />
      <div className="flex-ha gap-3">
        <Knob value={piece.pitch} onChange={handlers.setPitch} />
        <Knob value={piece.volume} onChange={handlers.setVolume} />
      </div>
      <PieceNameBox pieceName={pieceName} onClick={handlers.previewPiece} />
      <PieceOperationButton
        coverContent={
          <PieceAssignIndexLabel
            label={(piece.variationIndex + 1).toString()}
          />
        }
        onClick={handlers.shiftVariationIndex}
      >
        <Icons.Swap />
      </PieceOperationButton>
      {stepIndicatorContent}
    </div>
  );
};

const PieceStepIndicator = ({
  piece,
  stepPosition,
}: {
  piece: PieceItem;
  stepPosition: number;
}) => {
  const isCurrentStepActive =
    piece.active && isBitSet(piece.patternBits, stepPosition);
  return <PieceIndicator active={isCurrentStepActive} />;
};

const PieceBodyPart = ({
  piece,
  stepPosition,
}: {
  piece: PieceItem;
  stepPosition: number;
}) => {
  const { actions } = useAppContext();
  const toggleStep = (si: number) => {
    actions.patchPiece(piece.id, {
      patternBits: toggleBit(piece.patternBits, si),
    });
  };
  return (
    <div className="flex-ha gap-3 px-2">
      {seqNumbers(4).map((i) => {
        return (
          <div className="flex-ha gap-[5px]" key={i}>
            {seqNumbers(4).map((j) => {
              const altColor = i % 2 === 1;
              const si = i * 4 + j;
              const isStepActive = isBitSet(piece.patternBits, si);
              const isStepCurrent =
                piece.active && piece.patternBits > 0 && si === stepPosition;
              return (
                <StepButton
                  key={j}
                  altColor={altColor}
                  isStepActive={isStepActive}
                  isStepCurrent={isStepCurrent}
                  onClick={() => toggleStep(si)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const PieceRow = ({
  piece,
  stepPosition,
}: {
  piece: PieceItem;
  stepPosition: number;
}) => {
  return (
    <PieceRowFrame
      headPart={
        <PieceHeadPart
          piece={piece}
          stepIndicatorContent={
            <PieceStepIndicator piece={piece} stepPosition={stepPosition} />
          }
        />
      }
      bodyPart={<PieceBodyPart piece={piece} stepPosition={stepPosition} />}
    />
  );
};

export const MainPanelUi = () => {
  const { store, actions } = useAppContext();
  const { pieces, stepPosition } = store.useSnapshot();
  return (
    <PanelFrame>
      <div className="flex-v gap-2">
        <div className="flex-ha justify-between">
          <h3 className="text-xl font-medium text-white">
            Graphite Drum Machine
          </h3>
          <div className="flex-ha gap-2">
            <PresetButton text="reset" onClick={() => actions.resetPreset()} />
            <PresetButton
              text="pattern1"
              onClick={() => actions.applyPreset("preset1")}
            />
            <PresetButton
              text="pattern2"
              onClick={() => actions.applyPreset("preset2")}
            />
            <PresetButton
              text="pattern3"
              onClick={() => actions.applyPreset("preset3")}
            />
            <PresetButton
              text="rnd tone"
              onClick={() => actions.randomizePieces()}
            />
          </div>
        </div>
        <div className="flex-v gap-2">
          {pieces.map((piece) => (
            <PieceRow
              key={piece.id}
              piece={piece}
              stepPosition={stepPosition}
            />
          ))}
        </div>
      </div>
    </PanelFrame>
  );
};
