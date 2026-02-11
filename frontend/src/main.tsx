import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import './test-api.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="gradientbg">  
      <App />
    </div>
  </React.StrictMode>,
)