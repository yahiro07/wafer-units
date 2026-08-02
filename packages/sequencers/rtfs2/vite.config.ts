import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [preact(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  optimizeDeps: {
    exclude: ["wafer-host", "mofur"],
  },
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/rtfs2",
    emptyOutDir: true,
  },
});
