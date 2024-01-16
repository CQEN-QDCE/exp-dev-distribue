import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    cors: true,
    // https: {
    //   key: "../_certs/localhost-key.pem",
    //   cert: "../_certs/localhost.pem",
    // },
  },
  build: {
    sourcemap: true,
    assetsDir: "code",
    target: ["esnext", "edge100", "firefox100", "chrome100", "safari18"],
  },
  plugins: []
})
