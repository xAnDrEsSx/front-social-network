import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ENVIRONMENT } from './config/environments.js';

library.add(fas);

const rootElement = document.getElementById('root');

// Determina si estamos en modo de desarrollo o producción
const isDevelopment = ENVIRONMENT === 'development';

// Renderiza la aplicación con o sin StrictMode según el entorno
ReactDOM.createRoot(rootElement!).render(
  isDevelopment ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
);
