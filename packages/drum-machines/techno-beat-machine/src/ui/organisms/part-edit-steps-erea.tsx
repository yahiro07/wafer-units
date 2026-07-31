import { qu } from "@/ui/common/css-realm";
import { StepButton } from "@/ui/components/step-button";
import { partActions } from "@/ui/store/actions";
import { useCurrentPart } from "@/ui/store/readers";
import { seqNumbers } from "@/utils/helpers";

const StepsBlock = ({
  offset,
  isMirrored,
}: {
  offset: number;
  isMirrored: boolean;
}) => {
  const part = useCurrentPart();
  const notes = part.notes;
  return (
    <div class={qu.flexH().gap(1).p(1).bd("_inset 1px #0004").it}>
      {seqNumbers(4).map((i) => (
        <StepButton
          key={i}
          value={notes[offset + i]?.velocity ?? 0}
          onClick={() => partActions.shiftStepValue(offset + i)}
          isMirrored={isMirrored}
        />
      ))}
    </div>
  );
};

const SequenceStepLane = ({ laneOffset }: { laneOffset: number }) => {
  const part = useCurrentPart();
  const { stepLength } = part;

  return (
    <div class={qu.flexH().gap(1).it}>
      {seqNumbers(4).map((i) => (
        <StepsBlock
          offset={(laneOffset + i * 4) % stepLength}
          isMirrored={stepLength <= laneOffset + i * 4}
        />
      ))}
    </div>
  );
};

const SequenceStepLaneDummy = () => {
  return (
    <div class={qu.css({ visibility: "hidden" }).it}>
      <SequenceStepLane laneOffset={0} />
    </div>
  );
};

export const PartEditStepsArea = () => {
  const part = useCurrentPart();
  const twoColumn = part.stepLength === 32;
  return (
    <div class={qu.flexV().ml(-1).gap(1).it}>
      <SequenceStepLane laneOffset={0} />
      {twoColumn && <SequenceStepLane laneOffset={16} />}
      {!twoColumn && <SequenceStepLaneDummy />}
    </div>
  );
};
