import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from './routes/RoutesIndex.jsx'


function App() {
  return(
    <>
      <BrowserRouter>
        <RoutesIndex />
      </BrowserRouter>
    </>
  )
}

export default App
