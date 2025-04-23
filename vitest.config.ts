import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["src/tests/**/*.spec.ts"],
    coverage: {
      provider: "v8", // Usa o V8 para coverage (ou 'istanbul' se preferir)
      reporter: ["text", "html", "json"], // Relatórios de coverage
      reportsDirectory: "./coverage", // Diretório para salvar os relatórios
      all: true, // Inclui todos os arquivos no coverage, mesmo os não testados
      include: ["src/**/*.ts", "src/**/*.vue"], // Arquivos incluídos no coverage
      exclude: ["node_modules", "dist", "tests"], // Arquivos excluídos do coverage
    },
    // Removed invalid 'mutation' configuration as it is not supported by Vitest
  },
});
