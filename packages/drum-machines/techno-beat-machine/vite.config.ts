import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact({ jsxImportSource: "qulex" })],
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: { outDir: "../../../dist/techno-beat-machine", emptyOutDir: true },
  server: { port: 3000 },
});
