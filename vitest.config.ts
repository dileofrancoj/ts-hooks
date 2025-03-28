import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

// deep merge se hace con rest params
export default mergeConfig(viteConfig, defineConfig({
    test: {
        globals: true, // import de it, describe, jest
        setupFiles: './test/setup', // beforeEach,afterEach, timers, mocks
        environment: 'jsdom', // EMULAR EL DOM (window, etc)
        coverage: {
            thresholds: {
                lines: 30,
                functions: 30,
                branches: 30,
                statements: 30
            }
        }
    },
}))