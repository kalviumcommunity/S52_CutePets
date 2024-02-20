import './App.css'
import CreatePet from './components/CreatePet'
import UpdatePet from './components/UpdatePet'
import Pets from './components/Pets'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pets />} />
          <Route path='/createPet' element={<CreatePet />} />
          <Route path='/updatePet/:id' element={<UpdatePet />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
