import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename="/REACT2025Q1/">
        <App />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
