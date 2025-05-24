import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './pages/Users';
import Questions from './pages/Questions';
import Kuesioner from './pages/Kuesioner';
import Export from './pages/Export';

const App = () => {
  return (
    <Router>
      <div className="p-4 space-x-4 bg-gray-100">
        <Link to="/">Users</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/kuesioner">Kuesioner</Link>
        <Link to="/export">Export</Link>
      </div>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/kuesioner" element={<Kuesioner />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </Router>
  );
};

export default App;