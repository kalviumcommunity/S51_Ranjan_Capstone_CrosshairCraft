import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <nav>
          <h2>Crosshair Craft</h2>
          <div>
            <a href="#preset-crosshairs">Preset Crosshairs</a>
            <a href="#editable-crosshairs">Editable Crosshairs</a>
            <a href="#contact">Contact</a>
            <Link to="/loginpage">
              <button>Login</button>
            </Link>
          </div>
        </nav>
      </header>

      <section className="hero">
        <h1>Enhance Your Aim with Crosshair Craft</h1>
        <p>Discover the Perfect Crosshair for Your Favorite FPS Games.</p>
        <a href="#preset-crosshairs" className="cta-button">
          Explore Preset Crosshairs
        </a>
      </section>

      <section id="preset-crosshairs" className="features">
        <h2>Preset Crosshairs</h2>
        <p>
          Choose from a variety of professionally designed preset crosshairs to
          improve your gaming experience.
        </p>
      </section>

      <section id="editable-crosshairs" className="features">
        <h2>Editable Crosshairs</h2>
        <p>
          Create your own custom crosshairs with our intuitive crosshair editor.
        </p>
        <p>
          To create your own crosshair, simply click on the elements on the
          canvas to customize its shape, size, and color. Use the toolbar to
          adjust additional settings such as opacity and outline. Once you are
          satisfied with your design, you can save it for later use in your
          favorite FPS games.
        </p>
      </section>

      

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Get in touch with us!</p><br />
        <p>ranjan.m1325@gmail.com</p>
      </section>

      <footer>
        <div>&copy; 2024 Crosshair Craft. All rights reserved.</div><br />
        <div>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |{" "}
          <a href="#">FAQs</a>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}

export default LandingPage;
