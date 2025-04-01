import { afterEach, beforeEach, vi } from "vitest"

beforeEach(() => {
    vi.useFakeTimers()
    global.innerWidth = 1024
    global.innerHeight = 600
})

afterEach(() => {
    vi.resetAllMocks()
})