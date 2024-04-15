import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../App.css";

function LandingPage() {
  const [showModal] = useState(true);

  useEffect(() => {
    if (showModal) {
      toast.info("Please LogIN to have a better experience!");
    }
  }, [showModal]);


  return (
    <div>
      <header>
        {/* <div className="logo">Crosshair Craft</div> */}
        <nav>
          <ul>
            <li><h2>Crosshair Craft</h2></li>
            <li><a href="#preset-crosshairs">Preset Crosshairs</a></li>
            <li><a href="#editable-crosshairs">Editable Crosshairs</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/loginpage"><button>Login</button></Link></li>
            <li><Link to="/signuppage"><button>Signup</button></Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>Enhance Your Aim with Crosshair Craft</h1>
        <p>Discover the Perfect Crosshair for Your Favorite FPS Games.</p>
        
      </section>

      <section id="preset-crosshairs" className="features">
        <h2>Preset Crosshairs</h2>
        <p>Choose from a variety of professionally designed preset crosshairs to improve your gaming experience.</p>
        <p>Images or descriptions of preset crosshairs can be added here.</p>
      </section>

      <section id="editable-crosshairs" className="features">
        <h2>Editable Crosshairs</h2>
        <p>Create your own custom crosshairs with our intuitive crosshair editor.</p>
        <p>Instructions or a demonstration of the crosshair editor can be added here.</p>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>Learn more about Crosshair Craft and our mission to revolutionize the way gamers optimize their aim.</p>
        <p>Information about the company, team, and values can be added here.</p>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Get in touch with us!</p>
        <p>Contact information and a contact form can be added here.</p>
      </section>

      <footer>
        <div>&copy; 2024 Crosshair Craft. All rights reserved.</div>
        <div>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">FAQs</a>
        </div>
        {/* Include social media icons here */}
      </footer>

      <ToastContainer />

      
    </div>
  );
}

export default LandingPage;
