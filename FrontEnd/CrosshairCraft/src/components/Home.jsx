import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./../App.css";

function Home() {
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
    <>
      <NavBar />
      <div className="Home">
        <h1>Crosshair Craft</h1>
        <p>
          Welcome to CrosshairCraft, the ultimate crosshair generator for FPS
          enthusiasts. This tool empowers you to design and customize your
          crosshair, offering a personalized aiming experience tailored to your
          preferences. Whether you are a seasoned gamer or a casual player,
          CrosshairCraft makes it easy to elevate your aiming precision with
          style.
        </p>

        <div className="testimonial">
          <h2>What Our Users Say</h2>
          <div className="feedBACK">
            <div className="testimonial-card">
              <p>
                CrosshairCraft revolutionized the way I play FPS games. I can't
                imagine going back to the default crosshairs now.
              </p>
              <p>By John Doe - Pro Gamer</p>
            </div>
            <div className="testimonial-card">
              <p>
                I love how easy it is to customize my crosshair with
                CrosshairCraft. It's a game-changer!
              </p>
              <p>By Jane Smith - Casual Gamer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <h1>With CrosshairCraft, you can:</h1>
        <br />
        <ul>
          <br />
          <li>Create unique crosshair designs to match your playstyle</li>
          <br />

          <li>Choose from a variety of shapes, colors, and sizes</li>
          <br />

          <li>Save and share your custom crosshairs with friends</li>
          <br />

          <li>Experience real-time previews of your changes</li>
          <br />

          <h1>Join CrosshairCraft today and enjoy:</h1>
          <br />

          <li>Increased accuracy and precision in FPS games</li>
          <br />

          <li>Personalized crosshairs that suit your preferences</li>
          <br />

          <li>A supportive community of gamers sharing tips and tricks</li>
          <br />

          <li>
            Regular updates and new features to enhance your gaming experience
          </li>
          <br />
        </ul>
        <br />

        <ul></ul>
      </div>

      <div className="ontheway">
        <PulseLoader />
      </div>
      <Footer />
    </>
  );
}

export default Home;
