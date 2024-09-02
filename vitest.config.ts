/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    include: ["./src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
  },
});
