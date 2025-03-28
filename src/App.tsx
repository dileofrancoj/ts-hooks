import './App.css'
import { useCounter } from './hooks/useCounter'
function App() {
  const {value, increment} = useCounter({initialValue: 0})
  console.log('value', value)
  return (
    <>
    <button type="button" onClick={() => increment()}>
      +1 
    </button>
    </>
  )
}

export default App
