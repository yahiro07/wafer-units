import { css } from "@/common/css-realm";
import { uiColors } from "@/common/ui-theme";
import { ButtonsSelector } from "@/components/buttons-selector";
import { StepsEditorRoot } from "@/root/steps-editor";
import { StepsIndicatorBar } from "@/root/steps-indicator-bar";
import { store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";

const octaveShiftOptions = createPlainSelectorOptions([-2, -1, 0, 1, 2]);

const OctaveShiftContainer = () => {
  const { octaveShift } = store.useSnapshot();
  return (
    <ButtonsSelector
      options={octaveShiftOptions}
      value={octaveShift}
      onChange={store.setOctaveShift}
      size="narrow"
    />
  );
};

const patternLengthOptions = createPlainSelectorOptions([4, 8, 16, 32]);

const PatternLengthContainer = () => {
  const { patternLength } = store.useSnapshot();
  return (
    <ButtonsSelector
      options={patternLengthOptions}
      value={patternLength}
      onChange={store.setPatternLength}
      size="wide"
    />
  );
};

export const App = () => {
  return (
    <div class="flex-vl gap-2 bg-clPageBg p-4">
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
      <OctaveShiftContainer />
      <PatternLengthContainer />
      <StepsIndicatorBar />
      <StepsEditorRoot />
    </div>
  );
};
