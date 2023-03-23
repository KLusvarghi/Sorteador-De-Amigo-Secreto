import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Cabecalho from './components/Cabecalho';

ReactDOM.render(
  <React.StrictMode>
    <Cabecalho/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();
