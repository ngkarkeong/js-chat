import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 5455,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
