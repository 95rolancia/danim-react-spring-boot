import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import ProviderStores from './stores';

ReactDOM.render(
  <ProviderStores>
    <App />
  </ProviderStores>,
  document.getElementById('root'),
);
