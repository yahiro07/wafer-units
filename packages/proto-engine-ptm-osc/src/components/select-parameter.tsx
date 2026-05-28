import { For } from "solid-js";

export function SelectParameter(props: {
  label: string;
  value: number;
  options: string[];
  onChange: (value: number) => void;
}) {
  return (
    <div class="flex-ha h-8 text-[10px] tracking-[0.12em] text-[#d7dfeb] gap-2">
      <div class="w-[72px] text-[#a8b4c0]">{props.label}</div>
      <select
        value={props.value}
        class="flex-1 h-7 border border-[#617081] bg-[#1a222d] text-[#eef5ff] px-2"
        onChange={(e) => props.onChange(Number(e.currentTarget.value))}
      >
        <For each={props.options}>
          {(option, index) => <option value={index()}>{option}</option>}
        </For>
      </select>
    </div>
  );
}
