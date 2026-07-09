import { cz, qu } from "@/common/css-realm";
import { EffectorBody } from "@/components/effector-body";
import { GridBackground } from "@/components/grid-background";
import { ShiftSelector } from "@/components/shift-selector";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { store } from "@/root/store";
import { npx, seqNumbers } from "@/utils/helpers";
import { createSelectorOptions } from "@/utils/selector-option";

const keyLabelModeOptions = createSelectorOptions<KeyLabelMode>([
  ["doremi", "C/Am (doremi)"],
  ["degreeMajor", "C (degree)"],
  ["degreeMinor", "Am (degree) "],
]);

const LoopBarsOptions = createSelectorOptions<LoopBars>([
  [1, "1"],
  [2, "2"],
  [4, "4"],
]);

const ControlsPart = () => {
  const st = store.useSnapshot();
  return (
    <div>
      <div class={qu.flexHA().gap(2).justify("between").it}>
        <div class={qu.flexHA().gap(2).it}>
          <div class={qu.fontSize(14).weight("500").it}>Key/Label</div>
          <ShiftSelector
            options={keyLabelModeOptions}
            value={st.keyLabelMode}
            onChange={store.setKeyLabelMode}
            winWidth={120}
          />
        </div>
        <div class={qu.flexHA().gap(2).it}>
          <div class={qu.fontSize(14).weight("500").it}>Bars</div>
          <ShiftSelector
            options={LoopBarsOptions}
            value={st.loopBars}
            onChange={store.setLoopBars}
          />
        </div>
      </div>
    </div>
  );
};

const pitchLablesSource: Record<KeyLabelMode, string[]> = {
  doremi: ["do", "re", "mi", "fa", "so", "la", "si", "do", "re"],
  degreeMajor: ["i", "ii", "iii", "iv", "v", "vi", "vii", "i", "ii"],
  degreeMinor: ["iii", "iv", "v", "vi", "vii", "i", "ii", "iii", "iv"],
};

const Editor = () => {
  const w = 300;
  const h = 160;
  const st = store.useSnapshot();
  const pitchLabels = pitchLablesSource[st.keyLabelMode];
  const scaleX = 4 / st.loopBars;

  return (
    <div class={qu.flexH().gap(2).it}>
      <div>
        {seqNumbers(9).map((i) => {
          const yi = 8 - i;
          return (
            <div
              class={cz(
                qu.wh(36, (h + 1) / 9).flexC().it,
                qu.bg("#fff").bd("#ccc").fontSize(12).it,
              )}
            >
              {pitchLabels[yi]}
            </div>
          );
        })}
      </div>
      <div
        style={{
          width: npx(w),
          overflow: "hidden",
        }}
      >
        <div
          className={qu.flexV().gap(2).it}
          style={{
            width: npx(w),
            transform: `scaleX(${scaleX})`,
            transformOrigin: "top left",
          }}
        >
          <div class={qu.relative().wh(w, h).it}>
            <GridBackground
              nx={16}
              ny={9}
              width={w}
              height={h}
              bgAlterStrideX={4}
            />
          </div>
          <div class={qu.flexH().it}>
            {seqNumbers(16).map((i) => (
              <div
                key={i}
                class={cz(
                  qu.wh((w + 1) / 16, 16).flexC().it,
                  // qu.bg("#fff").bd("#ccc").it,
                  qu.color("#888").fontSize(16).it,
                )}
              >
                ・
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={qu.css({ height: "100dvh" }).flexC().it}>
      <EffectorBody className={cz(qu.wh(460, 280).it, qu.flexC().it)}>
        <div class={qu.flexV().gap(2).it}>
          <h2>root-prog</h2>
          <ControlsPart />
          <Editor />
        </div>
      </EffectorBody>
    </div>
  );
};
