import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//esto va a manejar rutas
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
