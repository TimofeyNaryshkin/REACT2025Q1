import { Route, Routes } from 'react-router';
import './App.css';
import React from 'react';
import Ships from './pages/Ships';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Ships />} />
        <Route path="*" element={<h1>Nothing found</h1>} />
      </Routes>
    </>
  );
};

export default App;
