import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/rtfs1",
    emptyOutDir: true,
  },
});
