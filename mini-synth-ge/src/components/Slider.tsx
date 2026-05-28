import { appState, SynthParameters, uiActions } from "@/store";

type SliderProps = {
  label: string;
  paramKey: keyof SynthParameters;
  steps?: number; // if defined, round to (value * (steps-1))
};

export const Slider = (props: SliderProps) => {
  const value = () => appState.parameters[props.paramKey];

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    uiActions.setParameter(props.paramKey, val);
  };

  return (
    <div class="flex-h items-center justify-between w-full h-8 px-2 text-sm select-none gap-1">
      <div class="w-16 text-gray-800 font-semibold">{props.label}</div>
      <div class="flex-1 flex-ha">
        <input
          type="range"
          min="0"
          max={props.steps ? props.steps - 1 : 1}
          step={props.steps ? 1 : 0.01}
          value={props.steps ? Math.round(value()) : value()}
          onInput={handleInput}
          class="w-full h-2 bg-gray-300 outline-none appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};
