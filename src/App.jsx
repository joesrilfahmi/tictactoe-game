// src/App.jsx
import React from "react";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import Game from "./components/Game";

const App = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <Game />
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
