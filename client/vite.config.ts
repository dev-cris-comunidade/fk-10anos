import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"), // ← MUDOU: agora é só "src"
      "@shared": path.resolve(import.meta.dirname, "..", "shared"), // ← MUDOU: subir um nível
      "@assets": path.resolve(import.meta.dirname, "..", "attached_assets"), // ← MUDOU: subir um nível
    },
  },
  // ← REMOVIDO: root não precisa mais
  build: {
    outDir: "dist", // ← MUDOU: agora é só "dist" (vai ficar client/dist)
    emptyOutDir: true,
  },
});