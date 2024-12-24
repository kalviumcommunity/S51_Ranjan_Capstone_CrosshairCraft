import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function NavBar({ onSearch }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass the search value to the parent (Preset)
  };

  return (
    <nav>
      <div className="navbar">
        <div className="left-content">
          <a href="/home">Home</a>
          <Link to="/about">About Us</Link>
        </div>
        <h1>Crosshair Craft</h1>
        <div className="right-content">
          <input
            type="text"
            placeholder="Type to search"
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {isLoggedIn ? (
            <button className="Btn">
              <div className="text" onClick={handleLogout}>
                Logout
              </div>
            </button>
          ) : (
            <a href="/loginpage" className="btn-2">
              <div>LOGIN</div>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
