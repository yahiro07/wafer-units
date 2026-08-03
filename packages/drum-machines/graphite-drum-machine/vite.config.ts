import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, UserConfig } from "vite";

const configCommon: UserConfig = {
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["preact"],
    alias: [
      //import workaround for @preact-icons/fa
      { find: /^npm:preact@\^?[\d.]+$/, replacement: "preact" },
      {
        find: /^npm:preact@\^?[\d.]+\/jsx-runtime$/,
        replacement: "preact/jsx-runtime",
      },
    ],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "mofur", "snap-store"],
  },
};

const configDev: UserConfig = {
  ...configCommon,
  server: { port: 3000 },
};

const configProd: UserConfig = {
  ...configCommon,
  build: {
    lib: {
      entry: "./src/wc-entry/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/graphite-drum-machine",
    emptyOutDir: true,
  },
};

export default defineConfig(({ mode }) =>
  mode === "production" ? configProd : configDev,
);
