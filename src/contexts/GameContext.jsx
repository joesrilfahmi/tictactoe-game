// src/contexts/GameContext.jsx
import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    playerSymbol: "",
    opponent: "", // 'player' or 'computer'
    isGameStarted: false,
    scores: {
      X: 0,
      O: 0,
      ties: 0,
    },
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
