import { act, renderHook } from "@testing-library/react";

import { useThrottle } from "../useThrottle";

describe('useThrottle', () => {
    vi.mock('lvlup-utils', () => ({
        throttle: vi.fn().mockImplementation((fn) => fn),
    }))
    it('Should call useThrottle with the callback and delay', () => {
        const fn = vi.fn()
        const delay = 1_000 // 1000ms
        const {result} = renderHook(() => useThrottle(fn,delay)) // useThrottle usa el throttle del mock definido arriba
        act(() => {
            result.current()
        })
        expect(fn).toHaveBeenCalledTimes(1)
    })
})

// throttle -> testeamos
    // useThrottle -> mock del throttle
        // boton --> mock useThrottle