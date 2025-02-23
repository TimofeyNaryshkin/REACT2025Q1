import { Route, Routes } from 'react-router';
import './App.css';
import React from 'react';
import Ships from './pages/Ships';
import { ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Ships />} />
        <Route path="*" element={<h1>Nothing found</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
