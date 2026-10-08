import { constants } from "@/constants";
import { appState } from "@/store";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { cz } from "@lib/mu2609/utils/cz";

const KeyboardView = (props: { notes: number[] }) => {
  const { bottomNoteNumber, numOctaves } = constants;
  const numKeys = numOctaves * 12 + 1;

  const styles = {
    white: "w-24px h-full bd-#000 bg-#fff",
    blackOuter: "relative w-0",
    black:
      "absolute left-0 top-0 w-18px h-62% bg-#888 bd-#000 -translate-x-1/2",
    active: "!bg-#0f0",
  };

  return (
    <div class="flex-h h-50px">
      {seqNumbers(numKeys).map((i) => {
        const noteNumber = bottomNoteNumber + i;
        const active = props.notes.includes(noteNumber);

        if ([1, 3, 6, 8, 10].includes(i % 12)) {
          return (
            <div class={styles.blackOuter}>
              <div class={cz(styles.black, active && styles.active)} />
            </div>
          );
        }
        return <div class={cz(styles.white, active && styles.active)} />;
      })}
    </div>
  );
};

export const App = () => {
  return (
    <div class="h-dvh flex-c">
      <div class="flex-v gap-1.5">
        {seqNumbers(appState.numActiveChannels).map((ch) => {
          return <KeyboardView notes={appState.notes[ch]} />;
        })}
      </div>
    </div>
  );
};
