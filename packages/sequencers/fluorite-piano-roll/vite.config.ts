import { globSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import preact from "@preact/preset-vite";
import { createGenerator } from "unocss";
import UnoCSS from "unocss/vite";
import { defineConfig, Plugin } from "vite";
import unoConfig from "./uno.config.ts";

const packageRoot = dirname(fileURLToPath(import.meta.url));

function unoCssInline(): Plugin {
  const virtualId = "virtual:uno-inline";
  const resolvedId = `\0${virtualId}`;
  return {
    name: "uno-css-inline",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    async load(id) {
      if (id !== resolvedId) return;
      const generator = await createGenerator(unoConfig);
      const files = globSync("src/**/*.{ts,tsx,css}", { cwd: packageRoot });
      const tokens = files
        .map((file) => readFileSync(join(packageRoot, file), "utf8"))
        .join("\n");
      const { css } = await generator.generate(tokens);
      return `export default ${JSON.stringify(css)}`;
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [preact(), UnoCSS(), unoCssInline()],
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: {
    lib: {
      entry: "src/wc-entry/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/fluorite-piano-roll",
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
