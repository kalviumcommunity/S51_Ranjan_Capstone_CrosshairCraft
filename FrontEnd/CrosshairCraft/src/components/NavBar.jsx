import React from "react";
import { useEffect, useState } from "react";
import "./../App.css";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const checkLoginStatus = () => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  };
  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setIsLoggedIn(false);
    window.location.reload();
  };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  return (
    <nav>
      <div className="navbar">
        <div className="left-content">
          
          <a href="/">Home</a>
          <a href="https://github.com/kalviumcommunity/S51_Ranjan_Capstone_CrosshairCraft">
            About Us
          </a>
        </div>
        <h1>Crosshair Craft</h1>
        <div className="right-content">
         
          {isLoggedIn ? (
            <button className="Btn">
              <div className="sign">
                {/* <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg> */}
              </div>

              <div className="text" onClick={handleLogout}>
                Logout
              </div>
            </button>
          ) : (
            <>
              <a href="/loginpage" className="btn-2">
                <div>LOGIN</div>
                {/* <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="25px"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    stroke="white"
                    d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    stroke="white"
                    d="M4 12.0601H14.17"
                  ></path>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    stroke="white"
                    d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
                  ></path>
                </svg> */}
              </a>
              

              
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
