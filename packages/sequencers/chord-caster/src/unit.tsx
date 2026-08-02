import {
  createPlainSelectorOptions,
  createSelectorOptions,
  GeneralSelector,
  SelectorOption,
} from "mofur-components/mono2";
import { useMemo } from "preact/hooks";
import { createStore } from "snap-store";
import { UnitInterface } from "wafer-host/unit-types";
import { getChordName, getRelNoteValues } from "@/note-defs";
import { createProgressionCore } from "@/sequencer";
import { allSongKeys, ProgressionState } from "@/types";

const songKeyOptions = createPlainSelectorOptions(allSongKeys);

const loopBarOptions: SelectorOption<number>[] = createSelectorOptions([
  [4, "4"],
  [8, "8"],
]);

function getRelativeOptions(key: string): SelectorOption<number>[] {
  const relNotes = getRelNoteValues(key);
  return createSelectorOptions(relNotes.map((i) => [i, getChordName(key, i)]));
}

export const createChordProgressionUnit = (unitInterface: UnitInterface) => {
  const initialProgressionState: ProgressionState = {
    songKey: "Am",
    loopBars: 4,
    relatives: [0, -5, -4, -2], //Am-Em-F-G
  };
  const core = createProgressionCore(initialProgressionState, unitInterface);

  const store = createStore<ProgressionState>(initialProgressionState);
  store.subscribe(core.setState);

  const actions = {
    setRelative(index: number, relative: number) {
      store.assign({
        relatives: store.state.relatives.map((r, i) =>
          i === index ? relative : r,
        ),
      });
    },
  };

  unitInterface.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [300, 150],
    },
    clockHandlers: core.clockInput,
    persistence: {
      emitState() {
        return { ...store.state };
      },
      applyState(state) {
        store.assign(state);
      },
    },
  });

  return {
    RenderUi() {
      const { songKey, loopBars, relatives } = store.useSnapshot();
      const chordOptions = useMemo(
        () => getRelativeOptions(songKey),
        [songKey],
      );

      return (
        <div className="w-[300px] h-[150px] bg-gray-100 flex-c">
          <div className="flex-v gap-2">
            <div>chord caster</div>
            <div className="flex-ha gap-4">
              <div className="flex-ha gap-2">
                <div>key</div>
                <GeneralSelector
                  options={songKeyOptions}
                  value={songKey}
                  onChange={store.setSongKey}
                  reverseOptionsOrder
                />
              </div>
              <div className="flex-ha gap-2">
                <div>bars</div>
                <GeneralSelector
                  options={loopBarOptions}
                  value={loopBars}
                  onChange={store.setLoopBars}
                />
              </div>
            </div>
            <div className="flex-ha gap-2">
              <div>chord</div>
              {relatives.map((relative, i) => {
                return (
                  <GeneralSelector<number>
                    key={i}
                    options={chordOptions}
                    value={relative}
                    onChange={(value) => actions.setRelative(i, value)}
                    reverseOptionsOrder
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    },
  };
};
