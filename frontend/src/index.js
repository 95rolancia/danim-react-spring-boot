import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import authStore from './stores/auth-store';

ReactDOM.render(
  <React.StrictMode>
    <App authStore={authStore} />
  </React.StrictMode>,
  document.getElementById('root'),
);
