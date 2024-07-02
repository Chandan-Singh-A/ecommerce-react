import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Logincomponent  from './components/Form/login'
// import './components/styles/login.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Logincomponent></Logincomponent>
  )
}

export default App;