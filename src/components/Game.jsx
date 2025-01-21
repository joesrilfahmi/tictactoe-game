// src/components/Game.jsx
import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../contexts/GameContext";
import StartScreen from "./StartScreen";
import GameBoard from "./GameBoard";
import ThemeToggle from "./ThemeToggle";
import { fadeIn } from "../animations/index";

const Game = () => {
  const { gameState } = useGame();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center mb-8"
        >
          <h1
            className="text-2xl md:text-3xl font-bold 
            text-gray-800 dark:text-white"
          >
            Tic Tac Toe
          </h1>
          <ThemeToggle />
        </motion.div>
        {!gameState.isGameStarted ? <StartScreen /> : <GameBoard />}
      </div>
    </div>
  );
};

export default Game;
