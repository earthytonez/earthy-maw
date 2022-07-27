import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { StoreProvider } from "./stores/useStore";
import { UIStoreProvider } from "./stores/UI/useUIStore";

const theme = createTheme({
  palette : {
    mode: "dark",
    error: {
      main: '#148C94',
    },
    primary: {
      main: '#148C94',
    },
  },
  zIndex: {
    drawer: 1200
  }
});

// theme.typography.h1 = {
//   fontFamily: "Fascinate, cursive",
//   fontSize: "2rem",
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <UIStoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UIStoreProvider>
  </StoreProvider>
);

// Removed <React.StrictMode></React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// {/* <CssVarsProvider disableTransitionOnChange theme={filesTheme}> */}
// </CssVarsProvider>
