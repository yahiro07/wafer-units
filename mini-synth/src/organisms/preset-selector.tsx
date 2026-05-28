import type { JSXElement } from "solid-js";
import { presetNames } from "@/audio/synth-params";
import { Icons } from "@/components/icons";
import { appState, uiActions } from "@/store/app-store";

export const PresetSelector = (): JSXElement => {
  const handleSelect = (e: Event) => {
    const idx = Number.parseInt((e.target as HTMLSelectElement).value);
    uiActions.selectPreset(idx);
  };

  return (
    <div class="flex-ha justify-center gap-2 h-full px-3 py-2">
      <button
        type="button"
        class="flex-c text-cyan-400 hover:text-cyan-200 px-4 py-2 border border-neutral-700 cursor-pointer"
        onClick={() => uiActions.prevPreset()}
      >
        <Icons.Left size={20} />
      </button>

      <div class="flex-c" style={{ "min-width": "180px" }}>
        <select
          class="synth-select w-full h-[40px]"
          value={String(appState.currentPresetIndex)}
          onChange={handleSelect}
        >
          {presetNames.map((name, i) => (
            <option value={String(i)}>{name}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        class="flex-c text-cyan-400 hover:text-cyan-200 px-4 py-2 border border-neutral-700 cursor-pointer"
        onClick={() => uiActions.nextPreset()}
      >
        <Icons.Right size={20} />
      </button>
    </div>
  );
};
