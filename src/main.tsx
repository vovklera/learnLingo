import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import 'modern-normalize/modern-normalize.css';
import './styles/reset.css';
import './styles/container.css';
import './styles/global.css';

import AuthProvider from './components/AuthProvider/AuthProvider.tsx';
import App from './components/App/App.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
