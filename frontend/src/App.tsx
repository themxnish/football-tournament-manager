import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Schedule from './pages/Schedule'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Teams from './pages/Teams'

function App() {

  return (
    <div className='p-2 flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
