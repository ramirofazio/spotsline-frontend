import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "./src",
      assets: "/src/assets",
      pages: "/src/pages",
      components: "/src/components",
    },
  },
});
