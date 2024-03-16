import { useState } from 'react'
import {Toaster} from 'react-hot-toast'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div data-theme="light" className='flex justify-center items-center p-4 h-screen w-screen'>     
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" gutter = {10} containerStyle={{ margin: "5px"}} toastOptions = {{
        success: {
          duration: 3000
        },
        error: {
          duration: 5000
        },
        style: {
          fontSize: '14px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor: '--var(--color-grey-0)',
          color: '--var(--color-grey-700)'
        }
      }} />
      </div>
  )
}

export default App
