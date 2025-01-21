// src/components/Cell.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Circle } from "lucide-react";
import { cellVariants, symbolVariants } from "../animations/index";
import { useTheme } from "../contexts/ThemeContext";

const Cell = ({ value, onClick, isWinning, disabled }) => {
  const { isDark } = useTheme();

  return (
    <motion.button
      variants={cellVariants}
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      onClick={onClick}
      disabled={disabled}
      className={`
        aspect-square rounded-xl
        flex items-center justify-center
        shadow-md 
        transition-colors duration-300 ease-in-out
        ${disabled ? "cursor-not-allowed opacity-90" : "hover:shadow-lg"}
        ${
          isWinning
            ? isDark
              ? "bg-green-900 text-white"
              : "bg-green-100 text-gray-900"
            : isDark
            ? "bg-gray-700 text-white"
            : "bg-white text-gray-900"
        }
      `}
      // Menggunakan animate untuk memastikan perubahan yang smooth
      animate={{
        scale: isWinning ? 1.05 : 1,
        backgroundColor: isWinning
          ? isDark
            ? "rgb(20, 83, 45)" // bg-green-900
            : "rgb(220, 252, 231)" // bg-green-100
          : isDark
          ? "rgb(55, 65, 81)" // bg-gray-700
          : "rgb(255, 255, 255)", // bg-white
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
    >
      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            variants={symbolVariants}
            initial="hidden"
            animate="visible"
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center justify-center"
          >
            {value === "X" ? (
              <X
                className={`w-12 h-12 md:w-16 md:h-16 
                  ${isWinning ? "text-blue-500" : "text-blue-500"}
                  transition-colors duration-300`}
              />
            ) : (
              <Circle
                className={`w-12 h-12 md:w-16 md:h-16 
                  ${isWinning ? "text-yellow-500" : "text-yellow-500"}
                  transition-colors duration-300`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Cell;
