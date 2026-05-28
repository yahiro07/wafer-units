import type { JSXElement } from "solid-js";
import { PresetSelector } from "@/organisms/preset-selector";

export const TopSection = (): JSXElement => {
  return (
    <div
      class="flex-ha w-full shrink-0 bg-neutral-800 border-b border-neutral-700"
      style={{ height: "54px" }}
    >
      <div class="flex-c shrink-0 border-r border-neutral-700 h-full px-4 w-[140px]">
        <span
          class="text-cyan-400 uppercase font-bold"
          style={{ "font-size": "0.7rem", "letter-spacing": "0.2em" }}
        >
          Mini-Synth
        </span>
      </div>
      <div class="flex-1 flex-c h-full">
        <PresetSelector />
      </div>
      <div class="w-[140px]" />
    </div>
  );
};
