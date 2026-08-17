import { css, cz } from "@/common/css-realm";
import { uiColors } from "@/common/ui-colors";
import { GridBackground } from "@/components/grid-background";
import { seqNumbers } from "@/utils/helpers";

const StepsIndicatorBar = () => {
  let currentStep = 3;
  return (
    <div class={czStepsIndicatorBar}>
      {seqNumbers(16).map((i) => (
        <div key={i} class={cz(i === currentStep && "current")} />
      ))}
    </div>
  );
};
const czStepsIndicatorBar = cz(
  "w-[640px] flex-ha justify-around",
  "[&>div]:(w-5 h-2 bd-clPlayPos)",
  "[&>div.current]:(bg-clPlayPos)",
);

const StepsBarEditor = () => {
  return (
    <div class="w-[640px] h-[50px]">
      <GridBackground nx={16} ny={1} bgAlterStrideX={4} />
    </div>
  );
};

export const App = () => {
  return (
    <div class="flex-v gap-2">
      <div class="flex-ha gap-2">
        <div class={css({ color: "red" }, "bd-[#888]")}>aaa</div>
        <div class="bg-clControlBg bd-clControlEdge">bbb</div>
        <div
          class={css({
            background: uiColors.clControlBg,
            border: `solid 1px ${uiColors.clControlEdge}`,
          })}
        >
          ccc
        </div>
        <div class="bg-clAccent">eee</div>
        <div class={css({ background: uiColors.clAccent })}>fff</div>
      </div>
      <StepsIndicatorBar />
      <StepsBarEditor />
      <StepsBarEditor />
    </div>
  );
};
