import clsx from "clsx";
import { seqNumbers } from "mofur/ax";
import { npx } from "mofur/ax-ui";
import { GeneralSelector, Knob } from "mofur-components/mono2";
import { useEffect, useMemo } from "react";
import { createStore } from "snap-store";
import { UnitInterface } from "wafer-host/unit-types";
import { LabeledRow } from "@/components";
import { createSequencer } from "@/sequencer";
import {
  DirectionMode,
  directionModeOptions,
  NoteDuration,
  NoteRange,
  noteDurationOptions,
  noteRangeOptions,
  octaveShiftOptions,
  WrappingMode,
  wrappingModeOptions,
} from "@/types";

console.log("rtfr 0223");

const degreeTexts = ["R", "T", "F", "R", "T", "F", "R"];

const PatternView = ({ pattern }: { pattern: number[] }) => {
  return (
    <div className="flex-h gap-2">
      {pattern.map((y, i) => {
        return (
          <div
            key={i}
            className="rounded-full bg-gray-300"
            style={{
              paddingTop: npx((6 - y) * 10),
            }}
          >
            <div
              className={clsx(
                "text-[8px] w-[18px] h-[18px] rounded-full flex-c text-white border",
                y % 3 === 0 && "bg-orange-400 border-orange-500",
                y % 3 !== 0 && "bg-yellow-300 border-yellow-400",
              )}
            >
              {degreeTexts[y]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function generateNoteIndexSeries(noteRange: NoteRange): number[] {
  const indices: number[] = [];
  let octave = 0;
  for (let i = 0; i < noteRange.length; i++) {
    const code = noteRange[i];
    if (code === "R") {
      if (indices.length === 0) {
      } else {
        octave++;
      }
      indices.push(octave * 3);
    } else if (code === "T") {
      indices.push(octave * 3 + 1);
    } else if (code === "F") {
      indices.push(octave * 3 + 2);
    }
  }
  return indices;
}

function generatePattern(
  noteRange: NoteRange,
  directionMode: DirectionMode,
  wrappingMode: WrappingMode,
  stepCount: number,
): number[] {
  const noteIndices = generateNoteIndexSeries(noteRange);
  let pos = 0;
  let dir = 1;
  return seqNumbers(stepCount).map((i) => {
    const note = noteIndices[pos];
    pos += dir;
    if (pos >= noteIndices.length) {
      if (directionMode === "upDown") {
        dir = -dir;
        pos -= 2;
      } else {
        const restCount = stepCount - i;
        // console.log({ restCount, len: noteIndices.length });
        if (restCount <= noteIndices.length) {
          if (wrappingMode === "bottom") {
            pos = 0;
          } else if (wrappingMode === "bottom1") {
            pos = 1;
          } else if (wrappingMode === "top1") {
            pos = noteIndices.length - restCount;
          } else if (wrappingMode === "top") {
            pos = noteIndices.length - restCount + 1;
          }
        } else {
          pos = 0;
        }
      }
    } else if (pos === 0) {
      dir = 1;
    }
    return note;
  });
}

export const createRtfrUnit = (unitInterface: UnitInterface) => {
  const sequencer = createSequencer(unitInterface);

  const store = createStore<{
    noteRange: NoteRange;
    noteDuration: NoteDuration;
    directionMode: DirectionMode;
    wrappingMode: WrappingMode;
    octaveShift: number;
    noteDuty: number;
  }>({
    noteRange: "RTF",
    noteDuration: "/8",
    directionMode: "up",
    wrappingMode: "bottom",
    octaveShift: 0,
    noteDuty: 1,
  });
  store.subscribe(({ octaveShift, noteDuty }) => {
    if (octaveShift !== undefined) {
      sequencer.setOctaveShift(octaveShift);
    }
    if (noteDuty !== undefined) {
      sequencer.setNoteDuty(noteDuty);
    }
  });

  unitInterface.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      outputs: ["note"],
      inputs: ["note"],
    },
    noteInput: {
      noteOn: sequencer.inputNoteOn,
      noteOff: sequencer.inputNoteOff,
    },
    clockHandlers: {
      start: sequencer.clockStart,
      stop: sequencer.clockStop,
      processStep: sequencer.processStep,
    },
    persistence: {
      emitState() {
        return { ...store.state };
      },
      applyState(state) {
        store.assign(state);
      },
    },
    hostCallbacks: {
      setBpm: sequencer.setBpm,
      setMetaAttributes: sequencer.setMetaAttributes,
    },
  });

  return {
    RenderUi() {
      const st = store.useSnapshot();
      const pattern = useMemo(
        () =>
          generatePattern(st.noteRange, st.directionMode, st.wrappingMode, 8),
        [st.noteRange, st.directionMode, st.wrappingMode],
      );
      useEffect(() => {
        sequencer.setPattern(pattern);
      }, [pattern, sequencer]);
      return (
        <div className="w-[400px] h-[240px] bg-[#eee] p-2">
          <div>RTFR</div>
          <div className="flex-h gap-4">
            <LabeledRow label="note range">
              <GeneralSelector
                options={noteRangeOptions}
                value={st.noteRange}
                onChange={store.setNoteRange}
              />
            </LabeledRow>
            <LabeledRow label="note duration">
              <GeneralSelector
                options={noteDurationOptions}
                value={st.noteDuration}
                onChange={store.setNoteDuration}
              />
            </LabeledRow>
          </div>
          <div className="flex-h gap-4">
            <LabeledRow label="direction">
              <GeneralSelector
                options={directionModeOptions}
                value={st.directionMode}
                onChange={store.setDirectionMode}
              />
            </LabeledRow>
            <LabeledRow label="wrapping">
              <GeneralSelector
                options={wrappingModeOptions}
                value={st.wrappingMode}
                onChange={store.setWrappingMode}
                reverseOptionsOrder
              />
            </LabeledRow>
          </div>
          <div className="flex-h gap-4">
            <LabeledRow label="octave">
              <GeneralSelector
                options={octaveShiftOptions}
                value={st.octaveShift}
                onChange={store.setOctaveShift}
                reverseOptionsOrder
              />
            </LabeledRow>
            <LabeledRow label="duty">
              <Knob
                value={st.noteDuty}
                onChange={store.setNoteDuty}
                min={0.01}
                max={1}
                step={0.01}
              />
            </LabeledRow>
          </div>
          <div>pattern: {pattern}</div>
          <div className="flex-c">
            <PatternView pattern={pattern} />
          </div>
        </div>
      );
    },
  };
};
