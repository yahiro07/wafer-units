import { defineConfig, install, css, tx } from "@twind/core";
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
        clKnobTick: "#f80",
        clText: "#555",
        clSectionBg: "#fff",
        // clSectionHeaderBg: "#ddd",
        // clSectionEdge: "#888",
        clControlBg: "#fff",
        clControlEdge: "#ddd",
        clTopBarBg: "#e0e0e0",
        clButtonBg: "#fff",
      },
    },
  },
  ignorelist: [/^ri-/, /^--/, /^_/, /^x-/],
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

install(config);
export const tz = createTz(tx, css);
