import { useState } from "react";
import axios from "axios";
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
    <div>
      <h2>Add Crosshair</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handlesubmit}>
        <label>
          Crosshair ID:
          <input
            type="text"
            name="CrosshairID"
            value={formdata.CrosshairID}
            onChange={handlechange}
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="Color"
            value={formdata.Color}
            onChange={handlechange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="Type"
            value={formdata.Type}
            onChange={handlechange}
          />
        </label>
        <label>
          Game:
          <input
            type="text"
            name="Game"
            value={formdata.Game}
            onChange={handlechange}
          />
        </label>
        <label>
          Created By:
          <input
            type="text"
            name="CreatedBy"
            value={formdata.CreatedBy}
            onChange={handlechange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Addcrosshair;
