import { createMemo } from "solid-js";
import { StepCode } from "@/sequencer-engine";

export const StepRollBar = (props: {
  stepCodes: StepCode[];
  currentStepIndex: number | null;
  playing: boolean;
  duty: number;
}) => {
  const STEP_WIDTH = 66;

  const segments = createMemo<
    Array<{ start: number; length: number; active: boolean }>
  >(() => {
    const result: Array<{ start: number; length: number; active: boolean }> =
      [];
    for (let index = 0; index < props.stepCodes.length; index += 1) {
      const code = props.stepCodes[index];
      if (code !== "on") {
        continue;
      }

      let length = 1;
      while (
        index + length < props.stepCodes.length &&
        props.stepCodes[index + length] === "tie"
      ) {
        length += 1;
      }

      const currentStepIndex = props.currentStepIndex;
      const active =
        props.playing &&
        currentStepIndex !== null &&
        currentStepIndex >= index &&
        currentStepIndex < index + length;
      const actualDuration = length + props.duty - 1;
      result.push({ start: index, length: actualDuration, active });
    }
    return result;
  });

  return (
    <div
      class="relative h-[24px]"
      style={{
        width: `${props.stepCodes.length * STEP_WIDTH}px`,
      }}
    >
      {segments().map((segment) => (
        <div
          class="absolute h-full"
          style={{
            left: `${segment.start * STEP_WIDTH}px`,
            width: `${segment.length * STEP_WIDTH}px`,
            border: `1px solid ${segment.active ? "#4f4" : "#7b7b7b"}`,
            "background-color": segment.active ? "#8f8" : "#ddd",
          }}
        />
      ))}
    </div>
  );
};
