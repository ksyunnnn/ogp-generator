import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import "./palette.css";

const colors = {
  RED: "#F44336",
  PINK: "#E91E63",
  PURPLE: "#9C27B0",
  "DEEP PURPLE": "#673AB7",
  INDIGO: "#3F51B5",
  BLUE: "#2196F3",
  "LIGHT BLUE": "#03A9F4",
  CYAN: "#00BCD4",
  TEAL: "#009688",
  GREEN: "#4CAF50",
  "LIGHT GREEN": "#8BC34A",
  LIME: "#CDDC39",
  YELLOW: "#FFEB3B",
  AMBER: "#FFC107",
  ORANGE: "#FF9800",
  "DEEP ORANGE": "#FF5722",
  BROWN: "#795548",
  GREY: "#9E9E9E",
  "BLUE GREY": "#607D8B"
};

const usePersistentCanvas = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 670 });
  const [dataURL, setDataURL] = useState("");

  const [titleValue, setTitleValue] = useState({
    main: {
      title: "OGP IS ゴッド",
      size: 80,
      baseline: "bottom",
      display: true
    },
    sub: {
      title: "爆速のジェネレーターへの挑戦",
      size: 48,
      baseline: "top",
      display: true
    }
  });

  const [pickColor, setPickColor] = useState(colors["TEAL"]);

  const { main, sub } = titleValue;

  const canvasRef = useRef(null);

  const handleDataUrl = canvas => setDataURL(canvas.toDataURL());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    ctx.fillStyle = pickColor;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    const canterX = canvas.width / 2;
    const canterY = canvas.height / 2;

    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";

    // about title
    if (main.display) {
      ctx.textBaseline = main.baseline;
      ctx.font = `500 ${main.size}px 'Noto Sans JP'`;

      const handleY = sub.display ? -16 : 48;

      ctx.fillText(main.title, canterX, canterY + handleY);
    }

    // about subTitle
    if (sub.display) {
      ctx.textBaseline = sub.baseline;
      ctx.font = `normal ${sub.size}px 'Noto Sans JP'`;

      const handleY = main.display ? 16 : -24;

      ctx.fillText(sub.title, canterX, canterY + handleY);
    }

    handleDataUrl(canvas);
  });

  return [
    titleValue,
    setTitleValue,
    canvasSize,
    setCanvasSize,
    canvasRef,
    dataURL,
    pickColor,
    setPickColor,
    colors
  ];
};

const Palette = props => {
  const { handlePickColor, colors } = props;
  return (
    <div className="wrapper">
      {colors &&
        Object.keys(colors).map(k => (
          <button
            className="btn"
            style={{ background: colors[k] }}
            onClick={() => {
              handlePickColor(k);
            }}
          />
        ))}
    </div>
  );
};

const App = () => {
  const [
    { main, sub },
    setTitleValue,
    canvasSize,
    setCanvasSize,
    canvasRef,
    dataURL,
    pickColor,
    setPickColor,
    colors
  ] = usePersistentCanvas();

  const handleTitleValue = e => {
    const newState = { main, sub };
    newState[e.target.name].title = e.target.value;
    setTitleValue(newState);
  };

  const handleDisplayValue = e => {
    const newState = { main, sub };
    newState[e.target.name].display = !newState[e.target.name].display;
    setTitleValue(newState);
  };

  const handlePickColor = k => setPickColor(colors[k]);

  return (
    <div className="app">
      <h1>OGPジェネレーター🍠</h1>
      <div className="input">
        <input
          value={main.title}
          type="text"
          name="main"
          onChange={handleTitleValue}
          className={`${main.display ? "" : "hidden"}`}
          disabled={!main.display}
        />
        <button onClick={handleDisplayValue} name="main">
          {main.display ? (
            <span id="mieru">👀</span>
          ) : (
            <span id="miezaru">🐒</span>
          )}
        </button>
      </div>
      <div className="input">
        <input
          value={sub.title}
          type="text"
          name="sub"
          onChange={handleTitleValue}
          className={`${sub.display ? "" : "hidden"}`}
          disabled={!sub.display}
        />
        <button onClick={handleDisplayValue} name="sub">
          {sub.display ? (
            <span id="mieru">👀</span>
          ) : (
            <span id="miezaru">🐒</span>
          )}
        </button>
      </div>
      <Palette colors={colors} handlePickColor={handlePickColor} />
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <a href={dataURL} download="" className="btn">
        download
      </a>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
