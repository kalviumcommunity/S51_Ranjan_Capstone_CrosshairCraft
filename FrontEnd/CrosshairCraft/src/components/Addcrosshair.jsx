import { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "../App.css";

function Addcrosshair() {
  const [formdata, setFormData] = useState({
    CrosshairID: "",
    Color: "",
    Type: "",
    Game: "",
    CreatedBy: "",
  });

  const [error, setError] = useState("");

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/add", formdata);
      setFormData({
        CrosshairID: "",
        Color: "",
        Type: "",
        Game: "",
        CreatedBy: "",
      });
      setError("");
      alert("Crosshair added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding crosshair:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="form-container">
        <h2>Add Crosshair</h2>
        <br />
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handlesubmit}>
          <div className="input-field">
            <label htmlFor="crosshair-id">ID</label>
            <input
              type="text"
              id="crosshair-id"
              name="CrosshairID"
              value={formdata.CrosshairID}
              onChange={handlechange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="Color"
              value={formdata.Color}
              onChange={handlechange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              name="Type"
              value={formdata.Type}
              onChange={handlechange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="game">Game</label>
            <input
              type="text"
              id="game"
              name="Game"
              value={formdata.Game}
              onChange={handlechange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="created-by">CreatedBy</label>
            <input
              type="text"
              id="created-by"
              name="CreatedBy"
              value={formdata.CreatedBy}
              onChange={handlechange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Addcrosshair;
