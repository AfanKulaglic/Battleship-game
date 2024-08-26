import React, { useState, useEffect } from 'react';

const boardSize = 10;
const shipSizes = [7, 5, 4, 3, 2];// Ship sizes

const generateEmptyBoard = () => Array(boardSize).fill(null).map(() => Array(boardSize).fill(0)); // Use number 0

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const placeRandomShips = () => {
  const board = generateEmptyBoard();
  const ships = [...shipSizes];

  while (ships.length > 0) {
    const size = ships.pop()!;
    let placed = false;

    while (!placed) {
      const orientation = getRandomInt(2) === 0 ? 'horizontal' : 'vertical';
      const row = getRandomInt(boardSize);
      const col = getRandomInt(boardSize);

      // Proveri da li možeš postaviti brod na ovom mestu bez preklapanja
      if (orientation === 'horizontal') {
        if (col + size <= boardSize && board[row].slice(col, col + size).every(cell => cell === 0)) {
          // Proveri da li su kvadratići prazni pre nego što postaviš brod
          for (let i = 0; i < size; i++) {
            if (board[row][col + i] !== 0) {
              placed = false;
              break;
            }
            placed = true;
          }

          if (placed) {
            for (let i = 0; i < size; i++) {
              board[row][col + i] = 1; // Postavi brod
            }
          }
        }
      } else {
        if (row + size <= boardSize && board.slice(row, row + size).every(r => r[col] === 0)) {
          // Proveri da li su kvadratići prazni pre nego što postaviš brod
          for (let i = 0; i < size; i++) {
            if (board[row + i][col] !== 0) {
              placed = false;
              break;
            }
            placed = true;
          }

          if (placed) {
            for (let i = 0; i < size; i++) {
              board[row + i][col] = 1; // Postavi brod
            }
          }
        }
      }
    }
  }
  return board;
};


const BattleShipGame: React.FC<{ playerBoard: number[][] }> = ({ playerBoard }) => {
  const [playerBoardState, setPlayerBoardState] = useState(generateEmptyBoard());
  const [computerBoard, setComputerBoard] = useState<number[][]>(generateEmptyBoard());
  const [playerHits, setPlayerHits] = useState(generateEmptyBoard());
  const [playerHitCount, setPlayerHitCount] = useState(0);
  const [computerHitCount, setComputerHitCount] = useState(0);

  useEffect(() => {
    setComputerBoard(placeRandomShips());
  }, []);

  const isGameOver = (hitCount: number, totalShips: number) => {
    return hitCount === totalShips;
  };

  const calculateTotalShips = (board: number[][]) => {
    return board.flat().filter(cell => cell === 1).length;
  };

  const handlePlayerAttack = (row: number, col: number) => {
    const newHits = [...playerHits];
    let newPlayerHitCount = playerHitCount;

    if (computerBoard[row][col] === 1) {
      newHits[row][col] = 1; // Mark as hit
      newPlayerHitCount++;
    } else {
      newHits[row][col] = -1; // Mark as miss
    }
    setPlayerHits(newHits);
    setPlayerHitCount(newPlayerHitCount);

    if (isGameOver(newPlayerHitCount, calculateTotalShips(computerBoard))) {
      alert('Congratulations! You have sunk all the computer\'s ships. Game over!');
      return;
    }

    computerTurn();
  };

  const computerTurn = () => {
    let row: number, col: number;
    do {
      row = getRandomInt(boardSize);
      col = getRandomInt(boardSize);
    } while (playerBoardState[row][col] !== 0); // Avoid hitting already guessed cells

    const newBoard = [...playerBoardState];
    let newComputerHitCount = computerHitCount;

    if (playerBoard[row][col] === 1) {
      newBoard[row][col] = 2; // Mark as hit
      newComputerHitCount++;
    } else {
      newBoard[row][col] = -1; // Mark as miss
    }
    setPlayerBoardState(newBoard);
    setComputerHitCount(newComputerHitCount);

    if (isGameOver(newComputerHitCount, calculateTotalShips(playerBoard))) {
      alert('Game over! The computer has sunk all your ships.');
    }
  };

  return (
    <div>
      <h2>My Ships</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 30px)` }}>
        {playerBoardState.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                backgroundColor: cell === 2 ? 'red' : cell === -1 ? 'grey' : 'white' // Use number comparison
              }}
            />
          ))
        )}
      </div>
      <h2>Computer's Ships</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 30px)` }}>
        {computerBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handlePlayerAttack(rowIndex, colIndex)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                backgroundColor: playerHits[rowIndex][colIndex] === 1 ? 'red' : playerHits[rowIndex][colIndex] === -1 ? 'grey' : 'white' // Use number comparison
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BattleShipGame;
