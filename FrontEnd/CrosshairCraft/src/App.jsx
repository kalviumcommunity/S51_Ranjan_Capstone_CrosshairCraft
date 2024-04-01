import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import Home from './components/Home'
import NewData from "./components/NewData";
import Update from "./components/Update";
import SignupPage from './components/SignupPage'

function App() {
   return (
    <>
      <NavBar/><br />
      
       <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/loginpage' element={<LoginPage/>} />
            <Route path='/signuppage' element={<SignupPage/>} /> 
            <Route path="/newdata" element={<NewData />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
          </Routes>
        </BrowserRouter>
      </div>


    </>
  )
}

export default App
