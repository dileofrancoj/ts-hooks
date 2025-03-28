import {act, renderHook} from '@testing-library/react'

import { useCounter } from '../useCounter'

describe('useCounter', () => {
    // que sume, que reste, que se resetee, que arranque con valor 0 y con otr valor random
    it('Should increment and decrement counter properly', () => {
        const { result } = renderHook(() => useCounter({initialValue: 0}))
        expect(result.current.value).toBe(0)
        act(() => {
            result.current.increment()
        })
        expect(result.current.value).toBe(1)
        act(() => {
            result.current.decrement()
        })
        expect(result.current.value).toBe(0)
    })

    it('Should start with no-default initial value', () => {
        const { result } = renderHook(() => useCounter({initialValue: 10}))
        expect(result.current.value).toBe(10)
    })
    it('Should start with no-default initial value', () => {
        const { result } = renderHook(() => useCounter({initialValue: 10}))
        expect(result.current.value).toBe(10)
    })
    it('should reset to initial value', () => {
        const {result} = renderHook(() => useCounter({initialValue: 0}))
        act(() => {
            result.current.increment()
            
        })
        act(() => {
            result.current.reset()
        })
        expect(result.current.value).toBe(0)
    })
})