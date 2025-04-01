/**
 * Detectamos cambio de dimensiones window innerWidth, innerHeight
 */

import * as React from 'react'

interface UseWindowsResize {
    width: number
    height: number
}

// debounce(50) + useWindowsResize() 
export function useWindowsResize (): UseWindowsResize {
    // lo conveniente si tenemos un estado que no es primitivo es usar Reducers (ver forma de organizar con Duck typing: https://github.com/erikras/ducks-modular-redux)
    const [windowsSize, setWindowsSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })  

    const onResize = (): void => {
        setWindowsSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }    

    // useDeepCompareEffect
    React.useEffect(() => {
        window.addEventListener('resize', onResize)
        // 
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })
    return windowsSize
}