import { For } from "solid-js";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";

type ProgramSelectorProps = {
  selectedIndex: number;
  names: string[];
  onSelectIndex: (index: number) => void;
  onShift: (step: number) => void;
};

export function ProgramSelector(props: ProgramSelectorProps) {
  return (
    <div class="flex-ha gap-2">
      <IconButton label="Previous program" onClick={() => props.onShift(-1)}>
        <Icons.Left size={18} />
      </IconButton>

      <select
        class="h-10 w-[220px] border border-zinc-700 bg-navy-950 px-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
        value={props.selectedIndex}
        onInput={(event) =>
          props.onSelectIndex(Number(event.currentTarget.value))
        }
      >
        <For each={props.names}>
          {(name, index) => <option value={index()}>{name}</option>}
        </For>
      </select>

      <IconButton label="Next program" onClick={() => props.onShift(1)}>
        <Icons.Right size={18} />
      </IconButton>
    </div>
  );
}
