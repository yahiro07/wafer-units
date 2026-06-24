import { seqNumbers } from "mofur/ax";
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

function getRandomBoolean(th = 0.5) {
  return Math.random() < th;
}

const PieceHeadPart = ({ pieceName }: { pieceName: string }) => {
  return (
    <div className="flex-ha gap-3 px-1">
      <PieceActiveButton active={getRandomBoolean()} />
      <div className="flex-ha gap-3">
        <Knob value={0.5} onChange={() => {}} />
        <Knob value={0.5} onChange={() => {}} />
      </div>
      <PieceNameBox pieceName={pieceName} />
      <PieceOperationButton
        coverContent={
          <PieceAssignIndexLabel label={(Math.random() * 20).toFixed(0)} />
        }
      >
        <Icons.Swap />
      </PieceOperationButton>
      <PieceIndicator active={getRandomBoolean()} />
    </div>
  );
};
const PieceBodyPart = () => {
  const stepIndex = (Math.random() * 16) >>> 0;
  return (
    <div className="flex-ha gap-3 px-2">
      {seqNumbers(4).map((i) => {
        return (
          <div className="flex-ha gap-[5px]">
            {seqNumbers(4).map((j) => (
              <StepButton
                key={i + j}
                altColor={i % 2 === 1}
                active={getRandomBoolean(0.3)}
                lightOn={stepIndex === i + j}
              />
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
