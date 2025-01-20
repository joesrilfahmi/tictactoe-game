// src/components/GameBoard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle, RotateCcw } from "lucide-react";
import { useGame } from "../contexts/GameContext";
import { containerVariants, fadeIn } from "../animations/variants";
import Cell from "./Cell";
import WinModal from "./WinModal";
import { checkWinner, getComputerMove } from "../utils/gameUtils";

const GameBoard = () => {
  const { gameState, setGameState } = useGame();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winLine, setWinLine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (
      gameState.opponent === "computer" &&
      currentPlayer !== gameState.playerSymbol &&
      !winner &&
      !board.every((cell) => cell)
    ) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(board, currentPlayer);
        handleCellClick(computerMove);
        setIsAnimating(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [
    currentPlayer,
    board,
    winner,
    gameState.opponent,
    gameState.playerSymbol,
  ]);

  const handleCellClick = (index) => {
    if (board[index] || winner || isAnimating) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    } else if (newBoard.every((cell) => cell)) {
      handleGameEnd({ winner: "tie" });
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleGameEnd = (result) => {
    if (result.winner === "tie") {
      setGameState((prev) => ({
        ...prev,
        scores: { ...prev.scores, ties: prev.scores.ties + 1 },
      }));
    } else {
      setWinLine(result.line);
      setGameState((prev) => ({
        ...prev,
        scores: {
          ...prev.scores,
          [result.winner]: prev.scores[result.winner] + 1,
        },
      }));
    }
    setWinner(result.winner);
    setTimeout(() => setShowModal(true), 500);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinLine(null);
    setWinner(null);
    setShowModal(false);
    setIsAnimating(false);
  };

  const handleQuit = () => {
    setGameState((prev) => ({
      ...prev,
      isGameStarted: false,
      playerSymbol: "",
      opponent: "",
      scores: { X: 0, O: 0, ties: 0 },
    }));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        variants={fadeIn}
        className="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {isAnimating
              ? "Computer thinking..."
              : winner
              ? null
              : gameState.opponent === "computer"
              ? currentPlayer === gameState.playerSymbol
                ? "Your turn"
                : "Computer's turn"
              : `Player ${currentPlayer}'s turn`}
          </div>
          <div
            className={`w-12 h-12 rounded-xl bg-white dark:bg-gray-700 shadow-md 
            flex items-center justify-center transition-all duration-300
            ${isAnimating ? "animate-pulse" : ""}`}
          >
            {currentPlayer === "X" ? (
              <X className="w-6 h-6 text-blue-500" />
            ) : (
              <Circle className="w-6 h-6 text-yellow-500" />
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRestart}
          className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg
            transition-all duration-300"
        >
          <RotateCcw className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 aspect-square">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
            isWinning={winLine?.includes(index)}
            disabled={
              winner ||
              isAnimating ||
              (gameState.opponent === "computer" &&
                currentPlayer !== gameState.playerSymbol)
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <ScoreCard
          label="X"
          score={gameState.scores.X}
          type="blue"
          winner={winner === "X"}
        />
        <ScoreCard
          label="Ties"
          score={gameState.scores.ties}
          type="gray"
          winner={winner === "tie"}
        />
        <ScoreCard
          label="O"
          score={gameState.scores.O}
          type="yellow"
          winner={winner === "O"}
        />
      </div>

      <AnimatePresence>
        {showModal && (
          <WinModal
            winner={winner}
            onPlayAgain={handleRestart}
            onQuit={handleQuit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ScoreCard = ({ label, score, type, winner }) => {
  const baseStyles = "rounded-xl p-4 transition-all duration-300 shadow-md";
  const typeStyles = {
    blue: "bg-blue-500 text-white",
    gray: "bg-gray-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: winner ? 1.05 : 1 }}
      className={`${baseStyles} ${typeStyles[type]} ${
        winner ? "ring-4 ring-white dark:ring-gray-300" : ""
      }`}
    >
      <div className="text-center">
        <div className="text-lg font-medium">{label}</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
    </motion.div>
  );
};

export default GameBoard;
