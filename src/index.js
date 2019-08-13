import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Palette, { usePalette } from "./palette";

const usePersistentCanvas = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 670 });
  const [canvasColor, setCanvasColor] = useState("#2196F3");
  const [dataURL, setDataURL] = useState("");

  const [titleValue, setTitleValue] = useState({
    main: {
      title: "スピード IS ゴッド",
      size: 80,
      baseline: "bottom"
    },
    sub: {
      title: "爆速の漫画ビューアへの挑戦",
      size: 48,
      baseline: "top"
    }
  });

  const { main, sub } = titleValue;

  const canvasRef = useRef(null);

  const handleDataUrl = canvas => setDataURL(canvas.toDataURL());

  const [pickColor] = usePalette();

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
    ctx.textBaseline = main.baseline;
    ctx.font = `500 ${main.size}px 'Noto Sans JP'`;
    ctx.fillText(main.title, canterX, canterY - 16);

    // about subTitle
    ctx.textBaseline = sub.baseline;
    ctx.font = `normal ${sub.size}px 'Noto Sans JP'`;
    ctx.fillText(sub.title, canterX, canterY + 16);

    handleDataUrl(canvas);
    console.log("main", main);
    console.log("pickColor", pickColor);
  });

  return [
    titleValue,
    setTitleValue,
    canvasSize,
    setCanvasSize,
    canvasColor,
    setCanvasColor,
    canvasRef,
    dataURL
  ];
};

const App = () => {
  const [
    { main, sub },
    setTitleValue,
    canvasSize,
    setCanvasSize,
    canvasColor,
    setCanvasColor,
    canvasRef,
    dataURL
  ] = usePersistentCanvas();

  const handleTitleValue = e => {
    const newState = { main, sub };
    newState[e.target.name].title = e.target.value;
    setTitleValue(newState);
  };

  // const handleCanvasSize = e => {
  //   const newState = { ...canvasSize };
  //   newState[e.target.name] = e.target.value;
  //   setCanvasSize(newState);
  // };

  const handleCanvasColor = e => {
    setCanvasColor(e.target.value);
  };

  return (
    <div className="app">
      <input
        value={main.title}
        type="text"
        name="main"
        onChange={handleTitleValue}
      />
      <input
        value={sub.title}
        type="text"
        name="sub"
        onChange={handleTitleValue}
      />
      {/* 一旦削除
      <input
        value={canvasSize.width}
        type="number"
        name="width"
        onChange={handleCanvasSize}
      />
      <input
        value={canvasSize.height}
        type="number"
        name="height"
        onChange={handleCanvasSize}
      />
       */}
      {/* <input
        value={canvasColor}
        type="text"
        name="canvas-color"
        onChange={handleCanvasColor}
      /> */}
      <Palette />
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <a href={dataURL} download="">
        download
      </a>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
