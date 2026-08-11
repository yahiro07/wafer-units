import { uiColors } from "@/common/ui-colors";
import { defineConfig, install } from "@twind/core";
import presetExt from "@twind/preset-ext";
import presetTailwind from "@twind/preset-tailwind";

const config = defineConfig({
  presets: [presetTailwind(), presetExt()],
  theme: {
    extend: { colors: uiColors },
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
    //bd-clGridLine-0.5px
    [
      "bd-(.+)-(\\d+(?:\\.\\d+)?px)",
      ({ 1: color, 2: width }) =>
        `border border-solid border-${color} border-[${width}]`,
    ],
    //bd-[#888] / bd-red-500
    ["bd-", ({ $$ }) => `border border-solid border-${$$}`],
  ],
});

install(config);
