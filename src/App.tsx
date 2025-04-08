import './App.css'

import { DemoComponent } from './Components/DemoComponent'
import { useCounter } from './hooks/useCounter'
import { useThrottle } from './hooks/useThrottle'
import { useWindowsResize } from './hooks/windowsResize'
function App() {
  const {value, increment} = useCounter({initialValue: 0})
  const {width, height} = useWindowsResize()
  console.log('width, height', width, height)
  console.log('value', value)
  function onHandleChange(e: unknown) {
    // blabla
    console.log('e', e)
  }
  const onClick = useThrottle(onHandleChange, 1_000)
  return (
    <>
    <button type="button" onClick={() => increment()}>
      +1 
    </button>
    <button type="button" onClick={onClick}>
      throttle bro 
    </button>
    <div style={{marginTop:'1000px'}}></div>
    <DemoComponent componentName='DemoComponent' />
    </>
  )
}

export default App
