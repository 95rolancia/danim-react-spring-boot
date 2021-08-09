import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
import ProviderStores from './stores';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
      fontFamily:('MingukRegular'),
  },
  palette: {
    primary: {
      main: '#4F9EE8',
      dark:'#85C3FC',
      light:'#A5D7EC' ,
    },
    secondary: {
      main:'#EC9361'
    },
    textPrimary: {
      dark:'#36434C',
      main: '#667580',
      light:'#F5F5F5'
    },
    textSecondary: {
      main:'F5F5F5'   
    },
  }
  
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <ProviderStores>
    <App />
  </ProviderStores>
  </ThemeProvider>,
  document.getElementById('root'),
);
