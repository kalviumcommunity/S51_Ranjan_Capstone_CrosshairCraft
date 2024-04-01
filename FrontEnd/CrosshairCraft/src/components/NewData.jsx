import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../App.css";

export default function NewData() {
  const [CrosshairID, setCrosshairID] = useState("");
  const [Color, setColor] = useState("");
  const [Type, setType] = useState("");
  const [Game, setGame] = useState("");
  const [CreatedBy, setCreatedBy] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https//s51-ranjan-capstone-crosshaircraft.onrender.com/add", {
        CrosshairID,
        Color,
        Type,
        Game,
        CreatedBy,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>New Crosshair Data</h2><br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="CrosshairID">Crosshair ID</label>
          <input
            type="text"
            id="CrosshairID"
            name="CrosshairID"
            onChange={(e) => setCrosshairID(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Color">Color</label>
          <input
            type="text"
            id="Color"
            name="Color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Type">Type</label>
          <input
            type="text"
            id="Type"
            name="Type"
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Game">Game</label>
          <input
            type="text"
            id="Game"
            name="Game"
            onChange={(e) => setGame(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="CreatedBy">Created By</label>
          <input
            type="text"
            id="CreatedBy"
            name="CreatedBy"
            onChange={(e) => setCreatedBy(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
