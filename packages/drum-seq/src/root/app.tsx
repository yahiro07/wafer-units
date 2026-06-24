import { seqNumbers } from "mofur/ax";
import {
  CssVariablesFrame,
  Knob,
  PanelFrame,
  PieceIndicator,
  PieceNameBox,
  PieceOperationButton,
  PieceRowFrame,
  StepButton,
} from "@/components/tw";

const PieceHeadPart = ({ pieceName }: { pieceName: string }) => {
  return (
    <div className="flex-ha gap-2">
      <Knob />
      <Knob />
      <PieceNameBox pieceName={pieceName} />
      <PieceOperationButton />
      <PieceIndicator />
    </div>
  );
};
const PieceBodyPart = () => {
  return (
    <div className="flex-ha gap-4 px-2">
      {seqNumbers(4).map((i) => {
        return (
          <div className="flex-ha gap-2">
            {seqNumbers(4).map((j) => (
              <StepButton key={i + j} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const PieceRow = ({ pieceName }: { pieceName: string }) => {
  return (
    <PieceRowFrame
      headPart={<PieceHeadPart pieceName={pieceName} />}
      bodyPart={<PieceBodyPart />}
    />
  );
};

export const App = () => {
  return (
    <CssVariablesFrame>
      <PanelFrame>
        <div className="flex-v gap-2">
          <PieceRow pieceName="KICK" />
          <PieceRow pieceName="SNARE" />
          <PieceRow pieceName="CLAP" />
          <PieceRow pieceName="OP-HIHAT" />
          <PieceRow pieceName="CL-HIHAT" />
        </div>
      </PanelFrame>
    </CssVariablesFrame>
  );
};
