import { cz } from "@/common/css-realm";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { isBitSet } from "@/utils/bit-flag-helper";
import { seqNumbers, iife, topLimit } from "@/utils/helpers";
import { npx } from "@/utils/utility-styles";
import { ComponentChildren } from "preact";

const uiConfigs = {
  notesGridHeight: 220,
  noteCellBaseHeight: 50,
  modifierStripCellHeight: 40,
};

const NoteGaugeIndex = ({
  pitches,
  height,
}: {
  pitches: number[];
  height: number;
}) => {
  const cellH = height / pitches.length;
  return (
    <div class="w-[70px] flex-v flex-col-reverse cursor-pointer">
      {seqNumbers(pitches.length).map((i) => {
        const pitch = pitches[i];
        return (
          <div
            key={i}
            class="bd-clGridLine-0.5px relative flex-c"
            style={{ height: cellH }}
          >
            {cellH < 10 && i % 12 === 0 && (
              <div class="absolute-full flex-c text-xs">{pitch}</div>
            )}
            {cellH >= 10 && pitch}
          </div>
        );
      })}
    </div>
  );
};

const NoteGauge = ({
  pitch,
  pitches,
  height,
  modifierFlag,
  onChange,
}: {
  pitch: number;
  pitches: number[];
  height: number;
  modifierFlag: number;
  onChange(pitch: number): void;
}) => {
  const cellH = height / pitches.length;
  const hasSlide = isBitSet(modifierFlag, 0);
  const hasAccent = isBitSet(modifierFlag, 1);
  const isTall = cellH >= 10;
  return (
    <div class="w-[56px] bg-clGridBg flex-v flex-col-reverse cursor-pointer">
      {seqNumbers(pitches.length).map((i) => {
        const cellPitch = pitches[i];
        const active = cellPitch === pitch;
        const bgClass = iife(() => {
          if (active && hasSlide) return "bg-clSlide";
          else if (active && hasAccent && !isTall) return "bg-clAccent";
          else if (active) return "bg-clNote";
          else return undefined;
        });
        const handlePointerDown = () => {
          onChange(active ? -1 : cellPitch);
        };
        const handlePointerEnter = (e: PointerEvent) => {
          if (e.buttons > 0) {
            onChange(cellPitch);
          }
        };
        return (
          <div
            key={i}
            class={cz("bd-clGridLine-0.5px relative flex-c", bgClass)}
            style={{ height: cellH }}
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
          >
            {active && hasAccent && isTall && (
              <div class="absolute bottom-0 left-0 right-0 mx-auto mb-[2px] w-[8px] h-[8px] bg-clAccent rounded-full" />
            )}
            {active && !isTall && (
              <div class="absolute bottom-[-4px] left-0 right-0 text-center">
                {pitch}
              </div>
            )}
            {active && isTall && pitch}
          </div>
        );
      })}
    </div>
  );
};

const ModifierCell = ({
  className,
  children,
  height,
  onClick,
}: {
  className?: string;
  children?: ComponentChildren;
  height: number;
  onClick?: () => void;
}) => {
  return (
    <div
      class={cz("bd-clGridLine-0.5px flex-c", className)}
      style={{ height: npx(height) }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const ModifierStripIndex = ({ cellHeight }: { cellHeight: number }) => {
  return (
    <div class="w-[70px] text-sm">
      <ModifierCell height={cellHeight}>Slide</ModifierCell>
      <ModifierCell height={cellHeight}>Accent</ModifierCell>
    </div>
  );
};

const ModifierStrip = ({
  stepIndex,
  cellHeight,
  stepModifierFlag,
}: {
  stepIndex: number;
  cellHeight: number;
  stepModifierFlag: number;
}) => {
  const hasSlide = isBitSet(stepModifierFlag, 0);
  const hasAccent = isBitSet(stepModifierFlag, 1);
  return (
    <div class="w-[56px] bg-clGridBg">
      <ModifierCell
        height={cellHeight}
        className="cursor-pointer"
        onClick={() => actions.toggleSlide(stepIndex)}
      >
        {hasSlide && "◯"}
      </ModifierCell>
      <ModifierCell
        height={cellHeight}
        className="cursor-pointer"
        onClick={() => actions.toggleAccent(stepIndex)}
      >
        {hasAccent && "◯"}
      </ModifierCell>
    </div>
  );
};

const Button = ({
  text,
  active,
  children,
  onClick,
  width,
  height = 36,
  asr = 1.6,
}: {
  text?: string;
  active?: boolean;
  children?: ComponentChildren;
  onClick?: () => void;
  width?: number;
  height?: number;
  asr?: number;
}) => {
  const w = width ?? height * asr;
  return (
    <button
      onClick={onClick}
      class={cz("bd-[#888] flex-c", active && "bg-clHighlight")}
      style={{ width: w, height }}
    >
      {text}
      {children}
    </button>
  );
};

const ButtonsRow = () => {
  const { pitchPresetIndex, lockPitchPreset } = store.useSnapshot();
  return (
    <div class="flex-h gap-6">
      <div class="flex-h gap-2">
        <Button text="R" onClick={actions.randomizePatterns} />
        <Button text="CLR" onClick={actions.clearStepNotes} />
      </div>
      <div class="flex-ha gap-2">
        <div>notes preset: {pitchPresetIndex}</div>
        <Button text="V" onClick={actions.shiftPitchPreset} />
        {/* <Button text="R" onClick={actions.randomizePitchPreset} /> */}
        <Button
          text="lock"
          active={lockPitchPreset}
          onClick={actions.toggleLockPitchPreset}
        />
      </div>
      <div class="grow" />
    </div>
  );
};

const StepsGridRow = () => {
  const { stepNotes, stepModifierFlags, pitchIndices } = store.useSnapshot();
  const pitches = pitchIndices;
  const noteGaugeHeight = topLimit(
    pitches.length * uiConfigs.noteCellBaseHeight,
    uiConfigs.notesGridHeight,
  );
  return (
    <div
      class="flex-c bd-clGridLine-0.5px bg-[#ccc]"
      style={{ height: uiConfigs.notesGridHeight }}
    >
      <NoteGaugeIndex pitches={pitches} height={noteGaugeHeight} />
      {stepNotes.map((note, i) => (
        <NoteGauge
          key={i}
          height={noteGaugeHeight}
          pitch={note}
          pitches={pitches}
          modifierFlag={stepModifierFlags[i]}
          onChange={(p) => actions.setStepNote(i, p)}
        />
      ))}
    </div>
  );
};

const ModifiersRow = () => {
  const { modifierStripCellHeight } = uiConfigs;
  const { stepModifierFlags } = store.useSnapshot();
  return (
    <div class="flex-h">
      <ModifierStripIndex cellHeight={modifierStripCellHeight} />
      {stepModifierFlags.map((stepModifierFlag, i) => (
        <ModifierStrip
          key={i}
          stepIndex={i}
          cellHeight={modifierStripCellHeight}
          stepModifierFlag={stepModifierFlag}
        />
      ))}
    </div>
  );
};

export const PatternEditor = () => {
  return (
    <div class="flex-c bg-clPageBg text-clPageText">
      <div class="flex-v gap-3">
        <div class="flex-v gap-2">
          <ButtonsRow />
          <StepsGridRow />
          <ModifiersRow />
        </div>
      </div>
    </div>
  );
};
