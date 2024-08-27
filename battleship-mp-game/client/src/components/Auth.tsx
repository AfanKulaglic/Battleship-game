import React, { useState } from 'react';
import axios from 'axios';

interface AuthProps {
  onUsernameSubmit: () => void;
}

const Auth: React.FC<AuthProps> = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUsernameSubmit = async () => {
    try {
      // Replace with your backend URL
      const response = await axios.post('https://battleship-game-mwca.onrender.com/api/users', { username });
      console.log('Response:', response.data);
      onUsernameSubmit();  // Notify parent component that submission was successful
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error details:', err.response?.data || err.message);
        setError(`Error: ${err.message}`);
      } else {
        console.error('Unexpected error:', err);
        setError('Unexpected error occurred');
      }
    }
  };

  return (
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
  );
};

export default Auth;
