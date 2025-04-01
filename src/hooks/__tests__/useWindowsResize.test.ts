/**
 * 
 * Cuando cargo el hook esté definido el alto y el ancho
 * Cuando se ejecute algun evento de resize se debe actualizar el hook
 * Debería ejecutar la etapa de cleanup del hook
 */
import { fireEvent, renderHook } from "@testing-library/react"

// import {vi} from 'vitest'
import { useWindowsResize } from "../windowsResize"

describe('useWindowsResize', () => {
    it('should instance window object', () => {
        const {result} = renderHook(() => useWindowsResize())
        expect(result.current).toStrictEqual({width: 1024, height: 600})
    })
    it('should update on window resize', () => {
        const { result } = renderHook(() => useWindowsResize())
        expect(result.current).toStrictEqual({width: 1024, height: 600})
        global.innerWidth = 500
        global.innerHeight = 300
        fireEvent.resize(window) // debo disparar un evento para actualizar un state
        expect(result.current).toStrictEqual({width: 500, height: 300})
    })
    it('should cleanup listener on onmount', () => {
        const {unmount} = renderHook(() => useWindowsResize())
        // realmente tenemos que hacer un cambio de state
        // spy -> que está pasando con "x" propiedad de "y" objeto
        
        /*
            spyOn: Observar llamadas a funciones
            Modificar comportamiento de las funciones (mock)
        */
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
        unmount() // ejecuta el cleanup del hook
        // expect(addEventListenerSpy).toHaveBeenCalled()

        // con que evento se va a llamar y no lo estoy diciendo que va a ejecutar una función
        // expect(removeEventListenerSpy).toHaveBeenCalled()
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })
})