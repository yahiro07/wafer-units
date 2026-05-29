import { Icons } from "@/components/icons";
import { allPresetNames, appState } from "@/store/store";
import { uiActions } from "@/store/ui-actions";

export const Header = () => {
  return (
    <div class="flex-h items-center justify-center p-2 bg-gray-200 border-b border-gray-400">
      <button
        type="button"
        onClick={() => uiActions.shiftPreset(-1)}
        class="w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer"
      >
        <Icons.Left />
      </button>
      <div class="px-2">
        <select
          value={appState.presetName}
          onChange={(e) => uiActions.setPreset(e.currentTarget.value)}
          class="w-40 h-8.5 px-2 text-center bg-white border border-gray-500 outline-none cursor-pointer appearance-none"
        >
          {allPresetNames.map((name) => (
            <option value={name}>{name}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => uiActions.shiftPreset(1)}
        class="w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer"
      >
        <Icons.Right />
      </button>
    </div>
  );
};
