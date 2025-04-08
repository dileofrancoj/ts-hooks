// HoC --> Recibe un componente y va a devolver el mismo componente con una funcionalidad extra

import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useIsVisible } from '../hooks/useIsVisible'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}
export interface WithTrackingProps {
    isVisible?: boolean
}


const event = () => {
    console.log('send tracking event')
}

export const withTracking = <P extends Props>(BaseComponent: React.FC<P>) => {
    return function Component(props: P) {
        // DO SOMETING NEW... print some log
        const ref = React.useRef<HTMLDivElement>(null)
        const seen = React.useRef<boolean>(false)
        const isVisible = useIsVisible(ref)

        React.useEffect(() => {
            if(isVisible && !seen.current) {
                event()
                seen.current = true
            }
        }, [isVisible])
        return (
            <div ref={ref}>
                <BaseComponent {...props}/>
            </div>
        )
    }
}