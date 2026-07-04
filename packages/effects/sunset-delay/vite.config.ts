import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [preact()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["preact"],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: {
    ...(mode === "production" && {
      lib: {
        entry: "./src/wc-entry/index.tsx",
        formats: ["es"],
        fileName: "index",
      },
    }),
    outDir: "../../../dist/sunset-delay",
    emptyOutDir: true,
  },
  server: { port: 3000 },
}));
