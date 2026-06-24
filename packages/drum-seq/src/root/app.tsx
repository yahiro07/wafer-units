import { seqNumbers } from "mofur/ax";
import {
  CssVariablesFrame,
  Knob,
  PanelFrame,
  PieceActiveButton,
  PieceIndicator,
  PieceNameBox,
  PieceRowFrame,
  StepButton,
} from "@/components/tw";

const PieceHeadPart = ({ pieceName }: { pieceName: string }) => {
  return (
    <div className="flex-ha gap-3 px-1">
      <PieceActiveButton />
      <div className="flex-ha gap-3">
        <Knob value={0.5} onChange={() => {}} />
        <Knob value={0.5} onChange={() => {}} />
      </div>
      <PieceNameBox pieceName={pieceName} />
      {/* <PieceOperationButton /> */}
      <PieceIndicator />
    </div>
  );
};
const PieceBodyPart = () => {
  return (
    <div className="flex-ha gap-4 px-3">
      {seqNumbers(4).map((i) => {
        return (
          <div className="flex-ha gap-2">
            {seqNumbers(4).map((j) => (
              <StepButton key={i + j} altColor={i % 2 === 1} />
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
          <PieceRow pieceName="OP-HIHAT" />
          <PieceRow pieceName="CL-HIHAT" />
          <PieceRow pieceName="CLAP" />
        </div>
      </PanelFrame>
    </CssVariablesFrame>
  );
};
