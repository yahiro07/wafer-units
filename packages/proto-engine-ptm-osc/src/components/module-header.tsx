import { Show } from "solid-js";

export function ModuleHeader(props: {
  title: string;
  enabled?: boolean;
  withIndicator?: boolean;
  onToggleIndicator?: () => void;
}) {
  return (
    <div class="w-full flex-ha justify-between bg-indigo-800 py-1.5 px-2 text-[11px] tracking-[0.16em] text-[#dbe4ec] gap-2 mb-0.5">
      <div class="flex-ha gap-1">
        <span>{props.title}</span>
      </div>
      <Show when={props.withIndicator}>
        <button
          type="button"
          class={`w-4 h-4 border ${
            props.enabled
              ? "border-[#72ffa4] bg-[#2d6d45]"
              : "border-[#6c7b8b] bg-[#212a35]"
          }`}
          onClick={props.onToggleIndicator}
        />
      </Show>
    </div>
  );
}
