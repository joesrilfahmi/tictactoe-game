// src/components/Cell.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle } from "lucide-react";
import { cellVariants, symbolVariants } from "../animations/variants";

const Cell = ({ value, onClick, isWinning, disabled }) => {
  return (
    <motion.button
      variants={cellVariants}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      animate={isWinning ? "winning" : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        aspect-square rounded-xl
        flex items-center justify-center
        bg-white dark:bg-gray-700
        shadow-md transition-shadow
        ${disabled ? "cursor-not-allowed" : "hover:shadow-lg"}
        ${isWinning ? "bg-green-100 dark:bg-green-900" : ""}
      `}
    >
      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            variants={symbolVariants}
            initial="hidden"
            animate="visible"
            exit={{ scale: 0, opacity: 0 }}
          >
            {value === "X" ? (
              <X className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
            ) : (
              <Circle className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Cell;
