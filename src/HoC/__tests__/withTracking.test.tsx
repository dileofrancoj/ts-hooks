import { render, screen} from '@testing-library/react' // testear elementos visuales

import { withTracking } from "../withTracking";

const MockComponent = (): React.JSX.Element => (<>
    <div data-testid="mock-component">Mock component </div>
</>)

const intersectionObserverMock = () => ({
    observe: vi.fn(),
    unobserve: vi.fn()
})

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)

describe('withTracking', () => {
    // Que reciba un componente y me devuelva un componente
    // Cuando el componente aparezca en pantalla se dispare el evento
    // Si el evento se disparó una vez, no debería volverse a disparar
    /**
     
    it('Should render base component', () => {
        render(<MockComponent />)
        screen.getByText('Mock component')
        screen.getByTestId('mock-component')
        const btn = screen.getByText('Boton de prueba')
        expect(btn).toBeDefined()
        fireEvent.click(btn)
    })
     */
    it('Should render base component', () => {
        const ComponentWithTracker = withTracking(MockComponent)
        render(<ComponentWithTracker />)
        screen.getByText('Mock component')
        screen.getByTestId('mock-component')
    })
})