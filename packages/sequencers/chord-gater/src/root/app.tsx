import { css, cz } from "@/common/css-realm";
import { uiColors } from "@/common/ui-colors";
import { GridBackground } from "@/components/grid-background";
import { startDragSession } from "@/utils/drag-session";
import { clampValue, fillNumbers, seqNumbers } from "@/utils/helpers";
import { createStore } from "snap-store";

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

//stepNote: 0:none, 1:on, 2:tie

const store = createStore<{
  stepNotes: number[];
  previewStepNotes: number[] | null;
}>({
  stepNotes: fillNumbers(32, 0),
  previewStepNotes: null,
});
if (1) {
  store.setStepNotes(
    seqNumbers(32).map((i) => (i === 3 || i === 7 ? 1 : i === 4 ? 2 : 0)),
  );
}

const uiConfigs = {
  stepCellWidth: 40,
  stepCellHeight: 50,
};

type StepsRange = {
  offset: number;
  length: number;
};

type DragBand = {
  start: number;
  end: number;
};

function startStepsBarDragInput(
  e: PointerEvent,
  nx: number,
  callbacks: {
    onTap: (index: number) => void;
    onBandChanged: (band: DragBand) => void;
  },
) {
  const indexFromX = (x: number) =>
    clampValue(Math.floor(x / uiConfigs.stepCellWidth), 0, nx - 1);
  startDragSession(
    e,
    {
      onUp(ev) {
        const startIndex = indexFromX(ev.originalPosition.x);
        const endIndex = indexFromX(ev.position.x);
        if (startIndex === endIndex) {
          callbacks.onTap(startIndex);
        }
      },
    },
    { coordinate: "relative" },
  );
}

const stepNotesEditCore = {
  applyBandEdit(originalStepNotes: number[], band: DragBand): number[] {
    return originalStepNotes;
  },
  toggleStep(originalStepNotes: number[], index: number): number[] {
    const notes = [...originalStepNotes];
    if (notes[index] === 0) {
      notes[index] = 1;
      return notes;
    }
    let start = index;
    while (start > 0 && notes[start] === 2 && notes[start - 1] === 2) {
      start--;
    }
    if (start > 0 && notes[start] === 2 && notes[start - 1] === 1) {
      start--;
    }
    let end = start + 1;
    while (end < notes.length && notes[end] === 2) {
      end++;
    }
    for (let i = start; i < end; i++) {
      notes[i] = 0;
    }
    return notes;
  },
};

function handleStepsBarEditorPointerDown(
  e: PointerEvent,
  stepsRange: StepsRange,
) {
  const nx = stepsRange.length;
  const originalStepNotes = [...store.state.stepNotes];
  startStepsBarDragInput(e, nx, {
    onTap(index) {
      const stepNotes = stepNotesEditCore.toggleStep(
        originalStepNotes,
        stepsRange.offset + index,
      );
      store.setStepNotes(stepNotes);
    },
    onBandChanged(band) {
      const stepNotes = stepNotesEditCore.applyBandEdit(
        originalStepNotes,
        band,
      );
      store.setPreviewStepNotes(stepNotes);
    },
  });
}

const StepNotesLayer = ({ stepsRange }: { stepsRange: StepsRange }) => {
  const nx = stepsRange.length;
  const st = store.useSnapshot();
  const stepNotes = st.previewStepNotes ?? st.stepNotes;
  const rangedNotes = stepNotes.slice(
    stepsRange.offset,
    stepsRange.offset + nx,
  );
  return (
    <div class="absolute-full flex-h cursor-pointer">
      {rangedNotes.map((note, idx) => (
        <div
          key={idx}
          class={cz(czStepNote, note === 1 && "head", note == 2 && "tie")}
        >
          {note}
        </div>
      ))}
    </div>
  );
};
const czStepNote = cz(
  "w-[40px] h-[50px] flex-c",
  css({
    "&.head": {
      background: "#8f8a",
      border: "solid 1px #080",
    },
    "&.tie": {
      background: "#8f8a",
      border: "solid 1px #080",
    },
    "&.head:has(+ &.tie)": {
      borderRight: "none",
    },
    "&.head + &.tie": {
      borderLeft: "none",
    },
  }),
);

const StepsBarEditor = ({ stepsRange }: { stepsRange: StepsRange }) => {
  const nx = stepsRange.length;
  const { stepCellWidth, stepCellHeight } = uiConfigs;
  return (
    <div
      class="relative touch-none"
      style={{ width: stepCellWidth * nx, height: stepCellHeight }}
      onPointerDown={(e) => handleStepsBarEditorPointerDown(e, stepsRange)}
    >
      <GridBackground nx={nx} ny={1} bgAlterStrideX={4} />
      <StepNotesLayer stepsRange={stepsRange} />
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
      <StepsBarEditor stepsRange={{ offset: 0, length: 16 }} />
      <StepsBarEditor stepsRange={{ offset: 16, length: 16 }} />
    </div>
  );
};
