import { cz } from "@/common/css-realm";
import { GridBackground } from "@/components/grid-background";
import { GridTonicHighlighter } from "@/components/grid-tonic-highlighter";
import { Note } from "@/root/definitions";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";
import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

const uiConfigs = {
  stepCellWidth: 44,
  stepCellHeight: 36,
  numCellsY: 22,
  editorHeight: 0,
};
uiConfigs.editorHeight = uiConfigs.stepCellHeight * uiConfigs.numCellsY;

// const tapConfigs = {
//   maxDistance: 8,
//   maxDurationMs: 250,
// };

type StepsRange = {
  offset: number;
  length: number;
};

// type DragBand = {
//   start: number;
//   end: number;
// };

// type NoteSpan = {
//   start: number;
//   end: number;
// };

// function findNoteSpan(notes: number[], index: number): NoteSpan | null {
//   if (notes[index] !== 1 && notes[index] !== 2) return null;
//   let start = index;
//   while (start > 0 && notes[start] === 2 && notes[start - 1] === 2) {
//     start--;
//   }
//   if (start > 0 && notes[start] === 2 && notes[start - 1] === 1) {
//     start--;
//   }
//   let end = start + 1;
//   while (end < notes.length && notes[end] === 2) {
//     end++;
//   }
//   return { start, end };
// }

// function clearRange(notes: number[], start: number, end: number) {
//   for (let i = start; i < end; i++) {
//     notes[i] = 0;
//   }
// }

// function writeNote(notes: number[], start: number, end: number) {
//   notes[start] = 1;
//   for (let i = start + 1; i < end; i++) {
//     notes[i] = 2;
//   }
// }

// function clearOverlappingNotes(
//   notes: number[],
//   rangeStart: number,
//   rangeEnd: number,
// ) {
//   const spans: NoteSpan[] = [];
//   let i = 0;
//   while (i < notes.length) {
//     if (notes[i] === 1) {
//       const span = findNoteSpan(notes, i);
//       if (span) {
//         if (span.start < rangeEnd && span.end > rangeStart) {
//           spans.push(span);
//         }
//         i = span.end;
//         continue;
//       }
//     }
//     i++;
//   }
//   for (const span of spans) {
//     clearRange(notes, span.start, span.end);
//   }
// }

// function startStepsBarDragInput(
//   e: PointerEvent,
//   stepsRange: StepsRange,
//   totalSteps: number,
//   callbacks: {
//     onTap: (index: number) => void;
//     onBandChanged: (band: DragBand) => void;
//     onCommit: (band: DragBand) => void;
//     onCancel: () => void;
//   },
// ) {
//   const indexFromX = (x: number) =>
//     clampValue(
//       stepsRange.offset + Math.floor(x / uiConfigs.stepCellWidth),
//       0,
//       totalSteps - 1,
//     );
//   const bandFromEvent = (ev: {
//     position: { x: number };
//     originalPosition: { x: number };
//   }): DragBand => ({
//     start: indexFromX(ev.originalPosition.x),
//     end: indexFromX(ev.position.x),
//   });
//   const pointerDistance = (ev: {
//     position: { x: number; y: number };
//     originalPosition: { x: number; y: number };
//   }) =>
//     Math.hypot(
//       ev.position.x - ev.originalPosition.x,
//       ev.position.y - ev.originalPosition.y,
//     );

//   const t0 = performance.now();
//   let dragStarted = false;
//   let lastEvent = {
//     position: { x: 0, y: 0 },
//     originalPosition: { x: 0, y: 0 },
//   };

//   const promoteToDrag = (ev: typeof lastEvent) => {
//     dragStarted = true;
//     callbacks.onBandChanged(bandFromEvent(ev));
//   };

//   const tapTimer = window.setTimeout(() => {
//     promoteToDrag(lastEvent);
//   }, tapConfigs.maxDurationMs);

//   startDragSession(
//     e,
//     {
//       onDown(ev) {
//         lastEvent = ev;
//       },
//       onMove(ev) {
//         lastEvent = ev;
//         if (dragStarted || pointerDistance(ev) > tapConfigs.maxDistance) {
//           promoteToDrag(ev);
//         }
//       },
//       onUp(ev) {
//         window.clearTimeout(tapTimer);
//         const dt = performance.now() - t0;
//         if (
//           !dragStarted &&
//           pointerDistance(ev) <= tapConfigs.maxDistance &&
//           dt <= tapConfigs.maxDurationMs
//         ) {
//           callbacks.onTap(indexFromX(ev.originalPosition.x));
//           return;
//         }
//         const band = bandFromEvent(ev);
//         callbacks.onBandChanged(band);
//         callbacks.onCommit(band);
//       },
//       onCancel() {
//         window.clearTimeout(tapTimer);
//         callbacks.onCancel();
//       },
//     },
//     { coordinate: "relative" },
//   );
// }

// const stepNotesEditCore = {
//   applyBandEdit(originalStepNotes: number[], band: DragBand): number[] {
//     const notes = [...originalStepNotes];
//     const grab = band.start;
//     const current = band.end;
//     const grabbed = findNoteSpan(notes, grab);

//     if (!grabbed) {
//       const start = Math.min(grab, current);
//       const end = Math.max(grab, current) + 1;
//       clearOverlappingNotes(notes, start, end);
//       writeNote(notes, start, end);
//       return notes;
//     }

//     const isResize = notes[grab] === 2 && grab === grabbed.end - 1;
//     if (isResize) {
//       clearRange(notes, grabbed.start, grabbed.end);
//       if (current < grabbed.start) {
//         return notes;
//       }
//       const end = current + 1;
//       clearOverlappingNotes(notes, grabbed.start, end);
//       writeNote(notes, grabbed.start, end);
//       return notes;
//     }

//     const length = grabbed.end - grabbed.start;
//     let newStart = grabbed.start + (current - grab);
//     newStart = clampValue(newStart, 0, notes.length - length);
//     const newEnd = newStart + length;
//     clearRange(notes, grabbed.start, grabbed.end);
//     clearOverlappingNotes(notes, newStart, newEnd);
//     writeNote(notes, newStart, newEnd);
//     return notes;
//   },
//   toggleStep(originalStepNotes: number[], index: number): number[] {
//     const notes = [...originalStepNotes];
//     if (notes[index] === 0) {
//       notes[index] = 1;
//       return notes;
//     }
//     const span = findNoteSpan(notes, index);
//     if (!span) return notes;
//     clearRange(notes, span.start, span.end);
//     return notes;
//   },
// };

function handleStepsBarEditorPointerDown(
  e: PointerEvent,
  stepsRange: StepsRange,
) {
  // const originalNotes = [...store.state.notes];
  // startStepsBarDragInput(e, stepsRange, originalNotes.length, {
  //   onTap(index) {
  //     store.setStepNotes(
  //       stepNotesEditCore.toggleStep(originalNotes, index),
  //     );
  //   },
  //   onBandChanged(band) {
  //     store.setPreviewStepNotes(
  //       stepNotesEditCore.applyBandEdit(originalNotes, band),
  //     );
  //   },
  //   onCommit(band) {
  //     store.setStepNotes(
  //       stepNotesEditCore.applyBandEdit(originalNotes, band),
  //     );
  //     store.setPreviewStepNotes(null);
  //   },
  //   onCancel() {
  //     store.setPreviewStepNotes(null);
  //   },
  // });
}

const NotesLayer = ({ stepsRange }: { stepsRange: StepsRange }) => {
  const nx = stepsRange.length;
  const { notes } = store.useSnapshot();
  // const stepNotes = st.previewStepNotes ?? st.stepNotes;
  const rangedNotes = notes.slice(stepsRange.offset, stepsRange.offset + nx);
  const { stepCellWidth, stepCellHeight } = uiConfigs;
  return (
    <div
      class={cz(
        "absolute-full flex-h",
        "[&>div]:(absolute flex-c bd-#f80 bg-#fc48)",
      )}
    >
      {rangedNotes.map((note, idx) => (
        <div
          key={idx}
          style={{
            left: note.position * stepCellWidth,
            bottom: note.pitch * stepCellHeight,
            width: note.duration * stepCellWidth,
            height: stepCellHeight,
          }}
        />
      ))}
    </div>
  );
};

const StepsBarEditor = ({
  stepsRange,
  bgInvert,
}: {
  stepsRange: StepsRange;
  bgInvert?: boolean;
}) => {
  const nx = stepsRange.length;
  const { stepCellWidth, numCellsY } = uiConfigs;
  return (
    <div
      class="relative touch-none"
      style={{ width: stepCellWidth * nx, height: uiConfigs.editorHeight }}
      onPointerDown={(e) => handleStepsBarEditorPointerDown(e, stepsRange)}
    >
      <GridBackground
        nx={nx}
        ny={numCellsY}
        bgAlterStrideX={4}
        bgInvert={bgInvert}
      />
      <GridTonicHighlighter ny={numCellsY} className="absolute-full" />
      <NotesLayer stepsRange={stepsRange} />
    </div>
  );
};

const StepsEditorRootInner = () => {
  const { patternLength } = store.useSnapshot();
  if (patternLength === 4) {
    return (
      <div class="flex-h">
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} bgInvert />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} />
        <StepsBarEditor stepsRange={{ offset: 0, length: 4 }} bgInvert />
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
  }
};

function calculateNotesCenter(notes: Note[]) {
  let minPitch = notes[0].pitch;
  let maxPitch = notes[0].pitch;
  for (const note of notes) {
    if (note.pitch < minPitch) minPitch = note.pitch;
    if (note.pitch > maxPitch) maxPitch = note.pitch;
  }
  const midPitch = (minPitch + maxPitch) / 2;
  const { editorHeight, stepCellHeight } = uiConfigs;
  return editorHeight - (midPitch + 0.5) * stepCellHeight;
}

function useSetInitialScrollPosition(baseDivRef: RefObject<HTMLDivElement>) {
  const { stateLoadRevision, notes } = store.useSnapshot();
  useEffect(() => {
    const el = baseDivRef.current;
    if (el) {
      const centerY =
        notes.length > 0 ? calculateNotesCenter(notes) : el.scrollHeight / 2;
      el.scrollTop = centerY - el.clientHeight / 2;
    }
  }, [stateLoadRevision]);
}

const IndexColumn = () => {
  return (
    <div
      class={cz(
        "w-44px h-full flex-v flex-col-reverse bg-neutral-600 bd-neutral-800",
        "[&>div]:(flex-1 min-h-0 flex-c)",
      )}
      style={{ height: uiConfigs.editorHeight }}
    >
      {seqNumbers(uiConfigs.numCellsY).map((_, i) => {
        const isTonic = i % 7 === 0;
        const tonicIndex = Math.floor(i / 7) - 1;
        return (
          <div key={i}>
            {isTonic ? `R${tonicIndex > 0 ? "+" : ""}${tonicIndex}` : undefined}
          </div>
        );
      })}
    </div>
  );
};

export const StepsEditorRoot = () => {
  const baseDivRef = useRef<HTMLDivElement>(null);
  useSetInitialScrollPosition(baseDivRef);
  return (
    <div ref={baseDivRef} class="h-[300px] overflow-x-hidden overflow-y-scroll">
      <div className="flex-h">
        <IndexColumn />
        <StepsEditorRootInner />
      </div>
    </div>
  );
};
