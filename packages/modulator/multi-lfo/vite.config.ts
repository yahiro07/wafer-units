import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact({ jsxImportSource: "qulex" })],
  resolve: { tsconfigPaths: true, dedupe: ["preact"] },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: { outDir: "../../../dist/multi-lfo", emptyOutDir: true },
  server: { port: 3000 },
});
