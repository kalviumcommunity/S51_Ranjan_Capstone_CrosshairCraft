import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignupPage from './components/SignupPage'

function App() {
   return (
    <>
      <NavBar/><br />
      <h1>Crosshair Craft</h1> 
      <p>Welcome to CrosshairCraft, the ultimate crosshair generator for FPS enthusiasts. This tool empowers you to design and customize your crosshair, offering a personalized aiming experience tailored to your preferences. Whether you are a seasoned gamer or a casual player, CrosshairCraft makes it easy to elevate your aiming precision with style.</p><br />
       <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/loginpage' element={<LoginPage/>} />
            <Route path='/signuppage' element={<SignupPage/>} /> 
          </Routes>
        </BrowserRouter>
      </div>


    </>
  )
}

export default App
