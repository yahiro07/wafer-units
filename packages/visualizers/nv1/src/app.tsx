import { constants } from "@/constants";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { cz } from "@lib/mu2609/utils/cz";
import { appModel } from "@/app-model";

const KeyboardView = (props: { ch: number }) => {
  const { bottomNoteNumber, numOctaves } = constants;
  const numKeys = numOctaves * 12 + 1;

  const styles = {
    white: "w-24px h-full bd-#000 bg-#fff",
    blackOuter: "relative w-0",
    black:
      "absolute left-0 top-0 w-17px h-62% bg-#888 bd-#000 -translate-x-1/2",
    active: "!bg-#0f0",
  };

  return (
    <div class="flex-h">
      <div class="w-40px flex-c bd-#000 bg-#bbb">{props.ch + 1}</div>
      <div class="flex-h h-50px">
        {seqNumbers(numKeys).map((i) => {
          const noteNumber = bottomNoteNumber + i;
          const active = appModel.getters
            .channelNotes(props.ch)
            .includes(noteNumber);

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
    </div>
  );
};

export const App = () => {
  appModel.setSize({ width: 938, height: 252 });
  return (
    <div class="h-dvh flex-c">
      <div class="p-4 bd-#0002">
        <div class="flex-v gap-1.5">
          {seqNumbers(appModel.getters.numActiveChannels()).map((ch) => {
            return <KeyboardView ch={ch} />;
          })}
        </div>
      </div>
    </div>
  );
};
