// @ts-expect-error not defined types
import { throttle } from 'lvlup-utils'
import * as React from 'react'

// crear una ref de mi función a ejecutar (callback)
// memoizar la salida del throttle
export type AnyFunction = (...args: unknown[]) => unknown
export function useThrottle<T extends AnyFunction>(fn: T, delay: number): T {
    const fnRef = React.useRef(fn)
    
    React.useEffect(() => {
        fnRef.current = fn
    }, [fn])

    return React.useMemo(() => throttle((...args: Parameters<T>) => {
        fnRef.current(...args)
     }, delay),
     [delay])
}