import { install } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetExt from "@twind/preset-ext";

install({
  presets: [presetTailwind(), presetExt()],
  theme: {
    extend: {
      colors: {
        clPrimary: "#07f",
        clKnobTick: "#07f",
        clText: "#555",
        clSectionEdge: "#bbb",
      },
    },
  },
  ignorelist: [/^ri-/],
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
