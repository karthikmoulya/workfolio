import { useState } from 'react';

const initalBoard = (n) => Array(n * n).fill(null);

const useTictactoe = () => {
  const [noOfCells, setNoOfCells] = useState(4);
  const [board, setBoard] = useState(initalBoard(noOfCells));
  const [isXNext, setISXNext] = useState(true);

  const WINNG_PATTERNS = getWinningPatters(noOfCells);

  //   const calculateWinner = (currentBoard) => {
  //     for (let i = 0; i < WINNG_PATTERNS.length; i++) {
  //       const [a, b, c] = WINNG_PATTERNS[i];
  //       if (
  //         currentBoard[a] &&
  //         currentBoard[a] === currentBoard[b] &&
  //         currentBoard[a] === currentBoard[c]
  //       ) {
  //         return currentBoard[a];
  //       }
  //     }
  //     return null;
  //   };

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNG_PATTERNS.length; i++) {
      const pattern = WINNG_PATTERNS[i];
      const firstCell = currentBoard[pattern[0]];
      if (firstCell) {
        let isWinner = true;
        for (let j = 0; j < pattern.length; j++) {
          if (currentBoard[pattern[j]] !== firstCell) {
            isWinner = false;
            break;
          }
        }

        if (isWinner) {
          return firstCell;
        }
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setISXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Player ${winner} Wins!`;
    }

    if (!board.includes(null)) {
      return 'Its a draw';
    }

    return `Player ${isXNext ? 'X' : 'O'} turn`;
  };

  const resetGame = () => {
    setBoard(initalBoard(noOfCells));
  };

  return {
    board,
    handleClick,
    calculateWinner,
    getStatusMessage,
    resetGame,
    noOfCells,
  };
};

const getWinningPatters = (n) => {
  const res = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(i * n + j);
    }
    res.push(row);
  }

  for (let i = 0; i < n; i++) {
    const col = [];
    for (let j = 0; j < n; j++) {
      col.push(j * n + i);
    }
    res.push(col);
  }

  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < n; i++) {
    diagonal1.push(i * (n + 1));
    diagonal2.push((i + 1) * (n - 1));
  }

  res.push(diagonal1);
  res.push(diagonal2);

  return res;
};

export default useTictactoe;
