import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Videos } from './pages/Videos';
import { News } from './pages/News';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/video' element={<Videos />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/news' element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
