import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [CrosshairID, setCrosshairID] = useState("");
  const [Color, setColor] = useState("");
  const [Type, setType] = useState("");
  const [Game, setGame] = useState("");
  const [CreatedBy, setCreatedBy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://s51-ranjan-capstone-crosshaircraft.onrender.com/patch/${id}`,
        {
          CrosshairID,
          Color,
          Type,
          Game,
          CreatedBy,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated Crosshair:", response.data);
        navigate("/");
      } else {
        console.error("Update failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating crosshair:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Update Data</h2><br />

        <div className="form-group">
          <label htmlFor="CrosshairID">Crosshair ID</label>
          <input
            type="number"
            id="CrosshairID"
            name="CrosshairID"
            value={CrosshairID}
            onChange={(e) => setCrosshairID(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Color">Color</label>
          <input
            type="text"
            id="Color"
            name="Color"
            value={Color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Type">Type</label>
          <input
            type="text"
            id="Type"
            name="Type"
            value={Type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Game">Game</label>
          <input
            type="text"
            id="Game"
            name="Game"
            value={Game}
            onChange={(e) => setGame(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CreatedBy">CreatedBy</label>
          <input
            type="text"
            id="CreatedBy"
            name="CreatedBy"
            value={CreatedBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>

        <input type="submit" className="submit" value="Submit" />
      </form>
    </div>
  );
}
