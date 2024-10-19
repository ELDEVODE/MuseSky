import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: 'Onest, Arial, sans-serif',
    h1: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Bricolage Grotesque, Arial, sans-serif',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
