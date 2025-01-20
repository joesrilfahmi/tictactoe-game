// src/utils/gameUtils.js
export const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return null;
};

// src/utils/gameUtils.js (continued)
export const getComputerMove = (board, computerSymbol) => {
  // First, try to win
  const winMove = findWinningMove(board, computerSymbol);
  if (winMove !== -1) return winMove;

  // Second, block opponent from winning
  const playerSymbol = computerSymbol === "X" ? "O" : "X";
  const blockMove = findWinningMove(board, playerSymbol);
  if (blockMove !== -1) return blockMove;

  // Third, try to take center
  if (!board[4]) return 4;

  // Fourth, try to take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => !board[i]);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // Finally, take any available space
  const availableMoves = board
    .map((cell, index) => (!cell ? index : null))
    .filter((index) => index !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const findWinningMove = (board, symbol) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] === symbol && board[b] === symbol && !board[c]) return c;
    if (board[a] === symbol && !board[b] && board[c] === symbol) return b;
    if (!board[a] && board[b] === symbol && board[c] === symbol) return a;
  }
  return -1;
};
