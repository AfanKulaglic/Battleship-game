import React, { useState } from 'react';
import SetupBoard from './components/SetupBoard';
import BattleShipGame from './components/BattleShipGame';
import axios from 'axios';

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<'setup' | 'play' | 'username'>('username');
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUsernameSubmit = async () => {
    try {
      await axios.post('http://battleship-game-mwca.onrender.com/api/data', { username });
      setGamePhase('setup');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error details:', err.response?.data || err.message);
      } else {
        console.error('Unexpected error:', err);
      }
      setError('Failed to submit username');
    }
  };

  const handleSetupComplete = (board: number[][]) => {
    setPlayerBoard(board);
    setGamePhase('play');
  };

  return (
    <div>
      {gamePhase === 'username' ? (
        <div>
          <h1>Enter Username</h1>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username" 
          />
          <button onClick={handleUsernameSubmit}>Submit</button>
          {error && <p>{error}</p>}
        </div>
      ) : gamePhase === 'setup' ? (
        <SetupBoard onSetupComplete={handleSetupComplete} />
      ) : (
        <BattleShipGame playerBoard={playerBoard} />
      )}
    </div>
  );
};

export default App;
