import { defineConfig } from 'vitest/config'

/**
 * @type {import('vitest/config').UserConfig}
 */
export default defineConfig({
  test: {
    includeSource: ['api/**/*.{js,ts}'],
    setupFiles: 'test/setup.js',
    sequence: {
      shuffle: false,
      concurrent: false
    }
  }
})
