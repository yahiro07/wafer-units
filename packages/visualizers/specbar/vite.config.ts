import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/specbar",
    emptyOutDir: true,
  },
});
