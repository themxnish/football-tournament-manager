import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Schedule from './pages/Schedule'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Teams from './pages/Teams'
import Play from './pages/Play'
import { Admin } from './pages/Admin'

import { Toaster } from 'sonner'
import Protected from './components/Protected'

function App() {

  return (
    <div className='p-2 flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Protected><Login /></Protected>} />
          <Route path="/register" element={<Protected><Register /></Protected>} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/admin" element={<Protected><Admin /></Protected>} />
          <Route path="/play/:id" element={<Play />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
