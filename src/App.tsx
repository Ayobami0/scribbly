import { Route, Routes } from 'react-router-dom'
import Board from './screens/Board'
import Home from './screens/Home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/boards/:id' element={<Board />} />
    </Routes>
  )
}

export default App
