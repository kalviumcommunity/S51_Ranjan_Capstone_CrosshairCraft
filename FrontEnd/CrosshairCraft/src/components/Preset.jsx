import { useEffect, useState } from "react";
import '../App.css'

function Preset() {
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    fetchPreset();
  }, []);

  const fetchPreset = async () => {
    try {
      const response = await fetch(
        "https://s51-ranjan-capstone-crosshaircraft.onrender.com/preset"
      );
      const data = await response.json();
      setPresets(data); 
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {presets.map((preset) => (
        <div key={preset.id}>
          <h1>{preset.Game}</h1>
          <h2>{preset.Color}</h2>
          <h3>{preset.Type}</h3>
          <h3>{preset.CreatedB}</h3>
        </div>
      ))}
    </>
  );
}

export default Preset;
