import {
  twind,
  cssom,
  tx as tx$,
  css as css$,
  defineConfig,
} from "@twind/core";
import { createTz } from "@/utils/tz";
import presetExt from "@twind/preset-ext";
import presetTailwind from "@twind/preset-tailwind";

const config = defineConfig({
  presets: [presetTailwind(), presetExt()],
  theme: {
    extend: {
      colors: {
        clPanelBody: "#aaa",
        clPrimary: "#f80",
        clKnobTick: "#07f",
        clText: "#555",
        clSectionBg: "#fff",
        clSectionHeaderBg: "#ddd",
        clSectionEdge: "#666",
        clTopBarBg: "#e0e0e0",
        clButtonBg: "#fff",
      },
    },
  },
  ignorelist: [/^ri-/, /^--/],
  rules: [
    ["flex-h", "~(flex)"],
    ["flex-hs", "flex items-start"],
    ["flex-ha", "flex items-center"],
    ["flex-v", "flex flex-col"],
    ["flex-vl", "flex flex-col items-start"],
    ["flex-va", "flex flex-col items-center"],
    ["flex-c", "flex items-center justify-center"],
    ["flex-vc", "flex flex-col items-center justify-center"],
    ["absolute-full", "absolute inset-0"],
    //bd-[#888] / bd-red-500
    ["bd-", ({ $$ }) => `border border-solid border-${$$}`],
  ],
});

export const tw = twind(config, cssom());
export const tx = tx$.bind(tw);
export const css = css$.bind(tw);
export const tz = createTz(tx, css);
