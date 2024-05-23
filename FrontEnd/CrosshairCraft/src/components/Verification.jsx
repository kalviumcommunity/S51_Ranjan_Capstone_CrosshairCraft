import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../App.css";
import NavBar from "./NavBar";

function Verification() {
  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const url = "http://localhost:3000/verification";

      const { data } = await axios.get(url);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div id="ver">
        <h1 id="classname">Email verified </h1>
        <h2>To proceed forward please click continue</h2><br />
        <Link to="/loginpage">
          <button id="verfybtn">Click to continue</button>
        </Link>
      </div>
    </>
  );
}

export default Verification;
