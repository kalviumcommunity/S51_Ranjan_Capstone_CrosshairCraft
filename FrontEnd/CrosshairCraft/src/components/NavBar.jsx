import React from 'react';
import { useEffect , useState } from 'react';
import './../App.css';

function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        checkLoginStatus()},[])
    const checkLoginStatus = () => {
        const token = getCookie('token');
        setIsLoggedIn(!!token);
    };
    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsLoggedIn(false);
        window.location.reload();
    };
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
  return (
    <nav>
      <div className='navbar'>
        <div className="left-content">
          <h1>Crosshair Craft</h1>
        </div>
        <div className="right-content">
          <a href="/">Home</a>
          <a href="https://github.com/kalviumcommunity/S51_Ranjan_Capstone_CrosshairCraft">About Us</a>
          {isLoggedIn ? (
                    <button className="logout" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <>
                        <a href="/loginpage">Login</a>
                        <a href="/signuppage">Signup</a>
                    </>
            )}
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
