import * as React from 'react'

type Ref = React.RefObject<Element | null>

export function useIsVisible(ref: Ref): boolean {
    // 1. Debemos crear la instancia de IntersectionObserver
    // 2. Deberíamos decirle a la API que elemento va a observar
    // 3. Limpiar la referencia
    const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false)

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries // entry tiene toda la información del elemento que vamos a observar
        setIsIntersecting(entry.isIntersecting)
    })

    React.useEffect(() => {
        const currentRef = ref.current
        if(currentRef !== null) {
            observer.observe(currentRef)
        }
        return () => {
            if(currentRef !== null) {
                observer.unobserve(currentRef)
            }
        }
    }, [observer, ref])

    return isIntersecting
    
    
}