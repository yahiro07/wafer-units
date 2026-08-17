import { css } from "@/common/css-realm";
import { uiColors } from "@/common/ui-colors";
import { StepsEditorRoot } from "@/root/steps-editor";
import { StepsIndicatorBar } from "@/root/steps-indicator-bar";

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
      <StepsEditorRoot />
    </div>
  );
};
