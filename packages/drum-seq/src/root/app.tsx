import clsx from "clsx";
import { seqNumbers } from "mofur/ax";
import { ReactNode, useEffect, useState } from "react";
import { appConfig } from "@/common/app-config";
import { isBitSet, toggleBit } from "@/common/bit-operation-helper";
import { Icons } from "@/common/icons";
import {
  CssVariablesFrame,
  Knob,
  PanelFrame,
  PieceActiveButton,
  PieceAssignIndexLabel,
  PieceIndicator,
  PieceNameBox,
  PieceOperationButton,
  PieceRowFrame,
  StepButton,
} from "@/components";
import { pieceDisplayNames, pieceSampleUrls } from "@/root/constants";
import { actions, store } from "@/root/store";
import { PieceItem } from "@/root/type";

const PieceHeadPart = ({
  piece,
  stepIndicatorContent,
}: {
  piece: PieceItem;
  stepIndicatorContent: ReactNode;
}) => {
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
  };
  return (
    <div className="flex-ha gap-3 px-1">
      <PieceActiveButton
        active={piece.active}
        onClick={handlers.toggleActive}
      />
      <div className="flex-ha gap-3">
        <Knob value={piece.volume} onChange={handlers.setVolume} />
        <Knob value={piece.pitch} onChange={handlers.setPitch} />
      </div>
      <PieceNameBox pieceName={pieceName} />
      <PieceOperationButton
        coverContent={
          <PieceAssignIndexLabel label={piece.variationIndex.toString()} />
        }
        onClick={handlers.shiftVariationIndex}
      >
        <Icons.Swap />
      </PieceOperationButton>
      {stepIndicatorContent}
    </div>
  );
};

const PieceStepIndicator = ({ piece }: { piece: PieceItem }) => {
  const { stepPosition } = store.useSnapshot();
  const isCurrentStepActive =
    piece.active && isBitSet(piece.patternBits, stepPosition);
  return <PieceIndicator active={isCurrentStepActive} />;
};

const PieceBodyPart = ({ piece }: { piece: PieceItem }) => {
  const { stepPosition } = store.useSnapshot();
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

const PieceRow = ({ piece }: { piece: PieceItem }) => {
  return (
    <PieceRowFrame
      headPart={
        <PieceHeadPart
          piece={piece}
          stepIndicatorContent={<PieceStepIndicator piece={piece} />}
        />
      }
      bodyPart={<PieceBodyPart piece={piece} />}
    />
  );
};

const DebugUi = () => {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      store.setStepPosition(0);
      const timerId = setInterval(() => {
        store.setStepPosition((prev) => (prev + 1) % 16);
      }, 125);
      return () => {
        clearInterval(timerId);
        store.setStepPosition(-1);
      };
    }
  }, [playing]);
  return (
    <div>
      <button
        className={clsx(
          "p-2 cursor-pointer",
          playing ? "bg-green-500" : "bg-gray-400",
        )}
        onClick={() => setPlaying(!playing)}
      >
        play
      </button>
    </div>
  );
};

export const App = () => {
  const { pieces } = store.useSnapshot();
  return (
    <CssVariablesFrame>
      <PanelFrame>
        <div className="flex-v gap-2">
          {pieces.map((piece) => (
            <PieceRow key={piece.id} piece={piece} />
          ))}
        </div>
      </PanelFrame>
      {appConfig.isDevelopment && <DebugUi />}
    </CssVariablesFrame>
  );
};
