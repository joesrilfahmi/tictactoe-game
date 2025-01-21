// src/components/WinModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { slideUp } from "../animations/index";

const WinModal = ({ winner, onPlayAgain, onQuit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
        flex items-end justify-center p-4 z-50"
    >
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-6">
          <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}
          </h2>
          <div className="flex gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onQuit}
              className="flex-1 py-4 rounded-xl text-lg font-semibold
                bg-red-500 text-white hover:bg-red-600 
                transition-all duration-300"
            >
              Quit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayAgain}
              className="flex-1 py-4 rounded-xl text-lg font-semibold
                bg-blue-500 text-white hover:bg-blue-600
                transition-all duration-300"
            >
              Play Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WinModal;
