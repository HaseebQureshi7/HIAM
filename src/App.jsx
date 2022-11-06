import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import '../src/masterStyles.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
