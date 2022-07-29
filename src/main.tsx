import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import 'normalize.css';
import 'animate.css';
import './index.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
