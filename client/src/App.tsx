
import {Toaster} from 'react-hot-toast'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { AuthContextProvider, useAuthContext } from './contexts/AuthContext'
import { useEffect, useState } from 'react'
import Landing from './pages/Landing'

function App() {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const storedAuthUser = localStorage.getItem("chat-user");
    setAuthUser(storedAuthUser);
  }, []); // Empty dependency array, runs once on mount

  console.log(authUser, "from home");

  return (
    <div data-theme="light" className='flex justify-center items-center p-4 h-screen w-screen'>     
          <BrowserRouter>
      <AuthContextProvider>
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home"  element={authUser  ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={authUser   ? <Navigate to="/home" /> : <Login />} />
              <Route path="/signUp" element={authUser  ? <Navigate to="/home" /> : <SignUp />} />
            </Routes>
            </AuthContextProvider>
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
