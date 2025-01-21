import React from "react";
import { motion } from "framer-motion";
import { X, Circle, User, Cpu } from "lucide-react";
import { useGame } from "../contexts/GameContext";
import { containerVariants, scaleIn } from "../animations/variants";

const StartScreen = () => {
  const { gameState, setGameState } = useGame();

  const handleSymbolSelect = (symbol) => {
    setGameState((prev) => ({ ...prev, playerSymbol: symbol }));
  };

  const handleOpponentSelect = (opponent) => {
    setGameState((prev) => ({ ...prev, opponent }));
  };

  const handleStart = () => {
    if (gameState.playerSymbol && gameState.opponent) {
      setGameState((prev) => ({ ...prev, isGameStarted: true }));
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8
        backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <motion.div className="space-y-8" variants={containerVariants}>
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Choose your symbol
          </h2>
          <div className="flex gap-4 justify-center">
            <SymbolButton
              symbol="X"
              active={gameState.playerSymbol === "X"}
              onClick={() => handleSymbolSelect("X")}
            />
            <SymbolButton
              symbol="O"
              active={gameState.playerSymbol === "O"}
              onClick={() => handleSymbolSelect("O")}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Choose opponent
          </h2>
          <div className="flex gap-4 justify-center">
            <OpponentButton
              type="player"
              active={gameState.opponent === "player"}
              onClick={() => handleOpponentSelect("player")}
            />
            <OpponentButton
              type="computer"
              active={gameState.opponent === "computer"}
              onClick={() => handleOpponentSelect("computer")}
            />
          </div>
        </div>

        <motion.button
          variants={scaleIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!gameState.playerSymbol || !gameState.opponent}
          onClick={handleStart}
          className={`
            w-full py-4 rounded-xl text-lg font-semibold
            transition-all duration-300
            ${
              !gameState.playerSymbol || !gameState.opponent
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
            }
          `}
        >
          Start Game
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const SymbolButton = ({ symbol, active, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-24 h-24 md:w-28 md:h-28 rounded-xl
        flex items-center justify-center
        transition-all duration-300
        ${
          active
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }
      `}
    >
      {symbol === "X" ? (
        <X className="w-12 h-12 md:w-14 md:h-14" />
      ) : (
        <Circle className="w-12 h-12 md:w-14 md:h-14" />
      )}
    </motion.button>
  );
};

const OpponentButton = ({ type, active, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-24 h-24 md:w-28 md:h-28 rounded-xl
        flex flex-col items-center justify-center gap-2
        transition-all duration-300
        ${
          active
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }
      `}
    >
      {type === "player" ? (
        <User className="w-8 h-8" />
      ) : (
        <Cpu className="w-8 h-8" />
      )}
      <span className="font-medium">
        {type === "player" ? "Player" : "Computer"}
      </span>
    </motion.button>
  );
};

export default StartScreen;
