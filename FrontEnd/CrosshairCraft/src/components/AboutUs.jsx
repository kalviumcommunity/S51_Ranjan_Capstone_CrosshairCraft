import React from "react";
import NavBar from "./NavBar";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-us">
        <h3>About Us</h3>
        <h1>
          Crosshair Craft is dedicated to enhancing your FPS gaming experience.
        </h1>
        <p>
          We provide a wide range of preset crosshairs and customization options
          tailored for first-person shooter (FPS) games.
        </p>
        <h3>Features:</h3>
        <ul>
          <li>Preset Crosshairs for Precision Shooting</li>
          <li>Customizable Crosshairs with Precision</li>
          <li>Optimized for FPS Performance</li>
          <li>Seamless User Experience</li>
        </ul>
        <p>
          With our intuitive crosshair generator tool, you can adjust parameters
          such as size, shape, color, and opacity to optimize visibility and
          precision during gameplay.
        </p>
        <p>
          Crosshair Craft is committed to providing a clear and visible
          crosshair for accurate aiming in FPS games, ensuring that you can
          elevate your gaming performance and overall experience.
        </p>
        <p>
          Experience the seamless user experience of Crosshair Craft today and
          take your FPS gaming to the next level.
        </p>
        <a href="https://github.com/kalviumcommunity/S51_Ranjan_Capstone_CrosshairCraft">To Work with our website please click this.</a>
      </div>
    </>
  );
};

export default AboutUs;
