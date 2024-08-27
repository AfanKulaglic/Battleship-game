import React, { useState } from 'react';
import SetupBoard from './components/SetupBoard';
import BattleShipGame from './components/BattleShipGame';
import Auth from './components/Auth';  // Import the new Auth component

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'play' | 'username'>('username');
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);

  const handleUsernameSubmit = () => {
    setGamePhase('setup');
  };

  const handleSetupComplete = (board: number[][]) => {
    setPlayerBoard(board);
    setGamePhase('play');
  };

  return (
    <div>
      {gamePhase === 'username' ? (
        <Auth onUsernameSubmit={handleUsernameSubmit} />
      ) : gamePhase === 'setup' ? (
        <SetupBoard onSetupComplete={handleSetupComplete} />
      ) : (
        <BattleShipGame playerBoard={playerBoard} />
      )}
    </div>
  );
};

export default App;
