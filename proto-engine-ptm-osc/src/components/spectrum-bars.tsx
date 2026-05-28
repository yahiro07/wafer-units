import { For } from "solid-js";

const SEGMENT_COUNT = 16;

export function SpectrumBars(props: { values: number[] }) {
  return (
    <div class="w-full flex-ha gap-1 px-2 py-2 border border-[#485462] bg-[#091015]">
      <For each={props.values}>
        {(value) => {
          const activeSegments = Math.round(value * SEGMENT_COUNT);
          return (
            <div class="flex flex-col-reverse justify-end h-full flex-1 gap-[2px]">
              <For each={Array.from({ length: SEGMENT_COUNT })}>
                {(_, segmentIndex) => {
                  const active = segmentIndex() < activeSegments;
                  const highBand = segmentIndex() > 11;
                  return (
                    <div
                      class={`h-[8px] border ${
                        active
                          ? highBand
                            ? "bg-[#f58f45] border-[#ffb16f]"
                            : "bg-[#62d581] border-[#7df7a0]"
                          : "bg-[#18242f] border-[#243342]"
                      }`}
                    />
                  );
                }}
              </For>
            </div>
          );
        }}
      </For>
    </div>
  );
}
