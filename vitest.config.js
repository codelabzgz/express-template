import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["api/**/*.{js,ts}"],
  },
});
