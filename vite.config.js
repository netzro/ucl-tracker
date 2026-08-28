import { defineConfig } from "vite";

// Relative base so the built assets resolve correctly under the GitHub Pages
// project subpath (https://netzro.github.io/ucl-tracker/). Works for both
// `npm run dev` and the Pages deploy.
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },
});
