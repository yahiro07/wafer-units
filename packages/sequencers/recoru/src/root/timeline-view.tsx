import { qu } from "@/common/css-realm";
import { Note } from "@/definitions/model";
import { GridBackground } from "@/root/grid-background";
import { getNoteNameLabel } from "@/root/note-label-helper";
import { store } from "@/root/store";
import { npx } from "@/utils/helpers";

const configs = {
  baseW: 640,
  baseH: 240,
};

type SectionRange = {
  offset: number;
  duration: number;
};

const PartLane = ({
  notes,
  sectionRange,
}: {
  notes: Note[];
  sectionRange: SectionRange;
}) => {
  const { baseW, baseH } = configs;
  const pitches = notes.map((note) => note.pitch);
  const topNote = Math.max(...pitches);
  const bottomNote = Math.min(...pitches);
  const centerNote = (topNote + bottomNote) / 2;

  const cellW = baseW / sectionRange.duration;
  const noteH = 10;
  return (
    <div class={qu.wh(baseW, baseH).relative().overflow("hidden").it}>
      <GridBackground
        nx={16}
        width={baseW}
        height={baseH}
        ny={6}
        bgAlterStrideX={4}
      />
      <div>
        {notes
          .filter(
            (note) =>
              note.position >= sectionRange.offset &&
              note.position < sectionRange.offset + sectionRange.duration,
          )
          .map((note) => {
            const relativePos = note.position - sectionRange.offset;
            const relativePitch = note.pitch - centerNote;
            return (
              <div
                key={note.id}
                class={
                  qu
                    .absolute()
                    .bd("#4c48")
                    .bg("#4c43")
                    .flexHA()
                    .pl(1)
                    .rounded(4).it
                }
                style={{
                  left: npx(relativePos * cellW),
                  top: `calc(50% - ${npx(relativePitch * noteH)})`,
                  width: npx(note.duration * cellW),
                  height: npx(noteH * 2),
                  fontSize: npx(10),
                }}
              >
                {getNoteNameLabel(note.pitch)}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const TimelineView_Base = () => {
  const { notes } = store.useSnapshot();
  return <PartLane notes={notes} sectionRange={{ offset: 0, duration: 64 }} />;
};

const TimelineView_Split4 = () => {
  const { baseW, baseH } = configs;
  const { notes } = store.useSnapshot();
  return (
    <div style={{ width: baseW, height: baseH, overflow: "hidden" }}>
      <div
        class={qu.flexV().gap(1).it}
        style={{
          width: baseW * 2,
          height: baseH * 2,
          transform: `scale(0.5)`,
          transformOrigin: `top left`,
        }}
      >
        <div class={qu.flexH().gap(1).it}>
          <PartLane notes={notes} sectionRange={{ offset: 0, duration: 64 }} />
          <PartLane notes={notes} sectionRange={{ offset: 64, duration: 64 }} />
        </div>
        <div class={qu.flexH().gap(1).it}>
          <PartLane
            notes={notes}
            sectionRange={{ offset: 128, duration: 64 }}
          />
          <PartLane
            notes={notes}
            sectionRange={{ offset: 192, duration: 64 }}
          />
        </div>
      </div>
    </div>
  );
};

export const TimelineView = () => {
  const { loopBars } = store.useSnapshot();
  if (loopBars <= 4) {
    return <TimelineView_Base />;
  } else {
    return <TimelineView_Split4 />;
  }
};
