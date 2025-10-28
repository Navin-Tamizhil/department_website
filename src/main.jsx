import React from 'react';
import ReactDOM from 'react-dom/client';
// Import HashRouter instead of BrowserRouter
import { HashRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your App component with HashRouter */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);

