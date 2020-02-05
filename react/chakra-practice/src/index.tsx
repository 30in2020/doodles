import React from "react";
import ReactDOM from "react-dom";
import App, { TurnOnColorMode } from "./App";

ReactDOM.render(
  <TurnOnColorMode>
    <App />
  </TurnOnColorMode>,
  document.getElementById("root")
);
