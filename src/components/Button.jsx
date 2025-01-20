// src/components/Button.jsx
import React from "react";

const Button = ({ children, active, disabled, className = "", ...props }) => {
  return (
    <button
      className={`
        rounded-2xl flex flex-col items-center justify-center
        transition-all duration-200 transform
        ${
          active
            ? "bg-blue-500 text-white shadow-lg scale-105"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed scale-100 hover:scale-100"
            : "hover:shadow-lg active:scale-95"
        }
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
