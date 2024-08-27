import React, { useState } from 'react';

const boardSize = 10;
const shipSizes = [7, 5, 4, 3, 2]; // Removed one ship of size 3
const maxShips = shipSizes.length;

const generateEmptyBoard = () => Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

const SetupBoard: React.FC<{ onSetupComplete: (board: number[][]) => void }> = ({ onSetupComplete }) => {
  const [board, setBoard] = useState(generateEmptyBoard());
  const [currentShip, setCurrentShip] = useState<number[]>([]);
  const [placing, setPlacing] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [shipsPlaced, setShipsPlaced] = useState<number>(0);
  const [placedShips, setPlacedShips] = useState<Map<number, { row: number, col: number, orientation: 'horizontal' | 'vertical' }>>(new Map());

  const canPlaceShip = (row: number, col: number, length: number, orientation: 'horizontal' | 'vertical'): boolean => {
    // Provjera da li brod može da se postavi na traženu poziciju
    if (orientation === 'horizontal') {
      if (col + length > boardSize) return false;
      for (let i = 0; i < length; i++) {
        // Ako je kvadratić zauzet ili se već nalazi brod, vrati false
        if (board[row][col + i] !== null) return false;
      }
    } else {
      if (row + length > boardSize) return false;
      for (let i = 0; i < length; i++) {
        if (board[row + i][col] !== null) return false;
      }
    }
    return true;
  };

  const removeShip = (row: number, col: number, length: number, orientation: 'horizontal' | 'vertical') => {
    const newBoard = board.map(row => [...row]);
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        newBoard[row][col + i] = null;
      }
    } else {
      for (let i = 0; i < length; i++) {
        newBoard[row + i][col] = null;
      }
    }
    setBoard(newBoard);
  };

  const handleCellClick = (row: number, col: number) => {
    if (placing) {
      const length = currentShip.length;
      if (!canPlaceShip(row, col, length, orientation)) return;

      const newBoard = [...board];
      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          newBoard[row][col + i] = 'ship';
        }
      } else {
        for (let i = 0; i < length; i++) {
          newBoard[row + i][col] = 'ship';
        }
      }
      setBoard(newBoard);
      setPlacing(false);
      setCurrentShip([]);
      setPlacedShips(prev => new Map(prev).set(currentShip.length, { row, col, orientation }));
      setShipsPlaced(prev => prev + 1);
    }
  };

  const handlePlaceShip = (size: number) => {
    const existingShip = placedShips.get(size);
    if (existingShip) {
      // Remove existing ship
      removeShip(existingShip.row, existingShip.col, size, existingShip.orientation);
      setShipsPlaced(prev => prev - 1);
    }

    if (shipsPlaced >= maxShips && !existingShip) {
      alert('Sve brodove ste već postavili!');
      return;
    }
    setCurrentShip(Array(size).fill(null));
    setPlacing(true);
  };

  const handleOrientationChange = (newOrientation: 'horizontal' | 'vertical') => {
    setOrientation(newOrientation);
  };

  const handleSubmit = async () => {
    if (shipsPlaced < maxShips) {
      alert('Morate postaviti sve brodove pre nego što završite!');
      return;
    }
    const finalBoard = board.map(row =>
      row.map(cell => (cell === 'ship' ? 1 : 0)) // Convert to number 1 or 0
    );

    try {
      const response = await fetch('http://localhost:5000/api/update-ships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ships: finalBoard })
      });

      if (response.ok) {
        alert('Brodovi su uspešno postavljeni!');
        onSetupComplete(finalBoard);
      } else {
        alert('Došlo je do greške prilikom slanja podataka.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Došlo je do greške prilikom slanja podataka.');
    }
  };

  return (
    <div>
      <div>
        {shipSizes.map(size => (
          <button key={size} onClick={() => handlePlaceShip(size)}>
            {placedShips.has(size) ? `Premesti brod veličine ${size}` : `Postavi brod veličine ${size}`}
          </button>
        ))}
        <button onClick={() => handleOrientationChange('horizontal')}>Horizontalno</button>
        <button onClick={() => handleOrientationChange('vertical')}>Vertikalno</button>
        <button onClick={handleSubmit}>Završi postavljanje</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 30px)` }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                backgroundColor: cell === 'ship' ? 'blue' : 'white'
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SetupBoard;
