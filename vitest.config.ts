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
                lines: 50,
                functions: 50,
                branches: 50,
                statements: 50
            }
        }
    },
}))