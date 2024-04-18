import { useEffect, useState } from "react";
import "../App.css";
import NavBar from "./NavBar";

function Preset() {
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    fetchPreset();
  }, []);

  const fetchPreset = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/preset"
      );
      const data = await response.json();
      setPresets(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="preset-grid">
        {presets.map((preset) => (
          <div className="preset-item" key={preset.id}>
            <h1>{preset.Game}</h1>
            <h2>{preset.Color}</h2>
            <h3>{preset.Type}</h3>
            <h3>{preset.CreatedB}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Preset;
