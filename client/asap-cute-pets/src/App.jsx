import './App.css'
import CreatePet from './components/CreatePet'
import UpdatePet from './components/UpdatePet'
import Pets from './components/Pets'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pets />} />
          <Route path='/createPet' element={<CreatePet />} />
          <Route path='/updatePet/:id' element={<UpdatePet />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
