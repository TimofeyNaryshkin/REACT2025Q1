import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import UncontrolledForm from '@components/UncontrolledForm.tsx';
import ReactHookForm from '@components/ReactHookForm.tsx';
import { Provider } from 'react-redux';
import { store } from '@store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/react-hook-form" element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
