import * as React from 'react'

// dependemos de interfaces y no de abstracciones

interface UseCounter {
    increment: (num?: number) => void
    decrement: (num?: number) => void
    reset: () => void
    value: number // contador
}

interface UseCounterProps {
    initialValue?: number
}

export const useCounter = ({initialValue = 0}: UseCounterProps): UseCounter => {

    const [value, setValue] = React.useState(initialValue)

    const increment = (num = 1) => setValue(value + num)
    const decrement = (num=1) => setValue(value - num)
    const reset = () => setValue(initialValue)

    return {
        increment,
        decrement,
        reset,
        value
    }
}