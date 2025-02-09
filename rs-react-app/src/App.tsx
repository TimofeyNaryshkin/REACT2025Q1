import { Link, Route, Routes } from 'react-router';
import './App.css';
import React from 'react';
import Ships from './pages/Ships';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<Ships />} />
        <Route path='*' element={<h1>Nothing found</h1>}/>
      </Routes>
    </>
  );
};

const Navigation: React.FC = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
      <Link to="/">ships</Link>
    </nav>
  );
};

export default App;
