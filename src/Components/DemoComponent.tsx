import { withTracking } from '../HoC/withTracking'


const Component = () => {
    return (
        <>
            Demo
        </>
    )
}

export const DemoComponent = withTracking(Component) // Component con nueva funcionalidad