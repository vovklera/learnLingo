import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import 'modern-normalize/modern-normalize.css';
import './styles/reset.css';
import './styles/container.css';
import './styles/global.css';
import App from './component/App/App.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
