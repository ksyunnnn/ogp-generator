import React, { useState } from "react";
import "./palette.css";

export const usePalette = () => {
  const colors = {
    RED: "#F44336",
    PINK: "#E91E63",
    PURPLE: "#9C27B0"
  };

  const [pickColor, setPickColor] = useState(colors["RED"]);

  return [pickColor, setPickColor, colors];
};

export default () => {
  const [pickColor, setPickColor, colors] = usePalette();
  const handlePickColor = k => setPickColor(colors[k]);
  return (
    <div className="wrapper">
      {Object.keys(colors).map(k => (
        <button
          className="btn"
          style={{ background: colors[k] }}
          onClick={() => {
            handlePickColor(k);
            console.log(k);
          }}
        >
          {k}
        </button>
      ))}
    </div>
  );
};
