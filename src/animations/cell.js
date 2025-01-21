export const cellVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  winning: {
    scale: 1.1,
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};
