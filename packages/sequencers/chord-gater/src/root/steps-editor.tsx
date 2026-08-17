import { cz, css } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { clampValue } from "@/utils/helpers";

const uiConfigs = {
  stepCellWidth: 40,
  stepCellHeight: 50,
};

const tapConfigs = {
  maxDistance: 8,
  maxDurationMs: 250,
};

type StepsRange = {
  offset: number;
  length: number;
};

type DragBand = {
  start: number;
  end: number;
};

type NoteSpan = {
  start: number;
  end: number;
};

function findNoteSpan(notes: number[], index: number): NoteSpan | null {
  if (notes[index] !== 1 && notes[index] !== 2) return null;
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
  return { start, end };
}

function clearRange(notes: number[], start: number, end: number) {
  for (let i = start; i < end; i++) {
    notes[i] = 0;
  }
}

function writeNote(notes: number[], start: number, end: number) {
  notes[start] = 1;
  for (let i = start + 1; i < end; i++) {
    notes[i] = 2;
  }
}

function clearOverlappingNotes(
  notes: number[],
  rangeStart: number,
  rangeEnd: number,
) {
  const spans: NoteSpan[] = [];
  let i = 0;
  while (i < notes.length) {
    if (notes[i] === 1) {
      const span = findNoteSpan(notes, i);
      if (span) {
        if (span.start < rangeEnd && span.end > rangeStart) {
          spans.push(span);
        }
        i = span.end;
        continue;
      }
    }
    i++;
  }
  for (const span of spans) {
    clearRange(notes, span.start, span.end);
  }
}

function startStepsBarDragInput(
  e: PointerEvent,
  stepsRange: StepsRange,
  totalSteps: number,
  callbacks: {
    onTap: (index: number) => void;
    onBandChanged: (band: DragBand) => void;
    onCommit: (band: DragBand) => void;
    onCancel: () => void;
  },
) {
  const indexFromX = (x: number) =>
    clampValue(
      stepsRange.offset + Math.floor(x / uiConfigs.stepCellWidth),
      0,
      totalSteps - 1,
    );
  const bandFromEvent = (ev: {
    position: { x: number };
    originalPosition: { x: number };
  }): DragBand => ({
    start: indexFromX(ev.originalPosition.x),
    end: indexFromX(ev.position.x),
  });
  const pointerDistance = (ev: {
    position: { x: number; y: number };
    originalPosition: { x: number; y: number };
  }) =>
    Math.hypot(
      ev.position.x - ev.originalPosition.x,
      ev.position.y - ev.originalPosition.y,
    );

  const t0 = performance.now();
  let dragStarted = false;
  let lastEvent = {
    position: { x: 0, y: 0 },
    originalPosition: { x: 0, y: 0 },
  };

  const promoteToDrag = (ev: typeof lastEvent) => {
    dragStarted = true;
    callbacks.onBandChanged(bandFromEvent(ev));
  };

  const tapTimer = window.setTimeout(() => {
    promoteToDrag(lastEvent);
  }, tapConfigs.maxDurationMs);

  startDragSession(
    e,
    {
      onDown(ev) {
        lastEvent = ev;
      },
      onMove(ev) {
        lastEvent = ev;
        if (dragStarted || pointerDistance(ev) > tapConfigs.maxDistance) {
          promoteToDrag(ev);
        }
      },
      onUp(ev) {
        window.clearTimeout(tapTimer);
        const dt = performance.now() - t0;
        if (
          !dragStarted &&
          pointerDistance(ev) <= tapConfigs.maxDistance &&
          dt <= tapConfigs.maxDurationMs
        ) {
          callbacks.onTap(indexFromX(ev.originalPosition.x));
          return;
        }
        const band = bandFromEvent(ev);
        callbacks.onBandChanged(band);
        callbacks.onCommit(band);
      },
      onCancel() {
        window.clearTimeout(tapTimer);
        callbacks.onCancel();
      },
    },
    { coordinate: "relative" },
  );
}

const stepNotesEditCore = {
  applyBandEdit(originalStepNotes: number[], band: DragBand): number[] {
    const notes = [...originalStepNotes];
    const grab = band.start;
    const current = band.end;
    const grabbed = findNoteSpan(notes, grab);

    if (!grabbed) {
      const start = Math.min(grab, current);
      const end = Math.max(grab, current) + 1;
      clearOverlappingNotes(notes, start, end);
      writeNote(notes, start, end);
      return notes;
    }

    const isResize = notes[grab] === 2 && grab === grabbed.end - 1;
    if (isResize) {
      clearRange(notes, grabbed.start, grabbed.end);
      if (current < grabbed.start) {
        return notes;
      }
      const end = current + 1;
      clearOverlappingNotes(notes, grabbed.start, end);
      writeNote(notes, grabbed.start, end);
      return notes;
    }

    const length = grabbed.end - grabbed.start;
    let newStart = grabbed.start + (current - grab);
    newStart = clampValue(newStart, 0, notes.length - length);
    const newEnd = newStart + length;
    clearRange(notes, grabbed.start, grabbed.end);
    clearOverlappingNotes(notes, newStart, newEnd);
    writeNote(notes, newStart, newEnd);
    return notes;
  },
  toggleStep(originalStepNotes: number[], index: number): number[] {
    const notes = [...originalStepNotes];
    if (notes[index] === 0) {
      notes[index] = 1;
      return notes;
    }
    const span = findNoteSpan(notes, index);
    if (!span) return notes;
    clearRange(notes, span.start, span.end);
    return notes;
  },
};

function handleStepsBarEditorPointerDown(
  e: PointerEvent,
  stepsRange: StepsRange,
) {
  const originalStepNotes = [...store.state.stepNotes];
  startStepsBarDragInput(e, stepsRange, originalStepNotes.length, {
    onTap(index) {
      store.setStepNotes(
        stepNotesEditCore.toggleStep(originalStepNotes, index),
      );
    },
    onBandChanged(band) {
      store.setPreviewStepNotes(
        stepNotesEditCore.applyBandEdit(originalStepNotes, band),
      );
    },
    onCommit(band) {
      store.setStepNotes(
        stepNotesEditCore.applyBandEdit(originalStepNotes, band),
      );
      store.setPreviewStepNotes(null);
    },
    onCancel() {
      store.setPreviewStepNotes(null);
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
        />
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
    "&.tie:has(+ &.tie)": {
      borderRight: "none",
    },
    "&.tie + &.tie": {
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

const StepsEditorRootInner = () => {
  const { patternLength } = store.useSnapshot();
  if (patternLength === 4) {
    return (
      <div class="flex-h">
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
      </div>
    );
  } else if (patternLength === 8) {
    return (
      <div class="flex-h">
        <StepsBarEditor stepsRange={{ offset: 0, length: 8 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 8 }} />
      </div>
    );
  } else if (patternLength === 16) {
    return <StepsBarEditor stepsRange={{ offset: 0, length: 16 }} />;
  } else {
    return (
      <div class="flex-v gap-3">
        <StepsBarEditor stepsRange={{ offset: 0, length: 16 }} />
        <StepsBarEditor stepsRange={{ offset: 16, length: 16 }} />
      </div>
    );
  }
};

export const StepsEditorRoot = () => {
  return (
    <div class="h-120px">
      <StepsEditorRootInner />
    </div>
  );
};
