import React from 'react'
import {ScaleLoader} from 'react-spinners'



import './App.css'


function App() {
 

  return (
    <>
      <h1>Crosshair Craft</h1> 
      <p>Welcome to CrosshairCraft, the ultimate crosshair generator for FPS enthusiasts. This tool empowers you to design and customize your crosshair, offering a personalized aiming experience tailored to your preferences. Whether you are a seasoned gamer or a casual player, CrosshairCraft makes it easy to elevate your aiming precision with style.</p><br />
      <div className="loader">
        <ScaleLoader size = {20} color='white'></ScaleLoader>
      </div>
    </>
  )
}

export default App
