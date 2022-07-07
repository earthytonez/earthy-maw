import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { StoreProvider } from "./stores/useStore.tsx";
import { UIStoreProvider } from "./stores/UI/useUIStore.tsx";

import { CssVarsProvider } from "@mui/joy/styles";

import filesTheme from "./theme.ts";

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
    drawer: 1
  }
});

theme.typography.h1 = {
  fontFamily: "Fascinate, cursive",
  fontSize: "2rem",
};

console.log(filesTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <UIStoreProvider>
      <ThemeProvider theme={theme}>
        <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
          <App />
        </CssVarsProvider>
      </ThemeProvider>
    </UIStoreProvider>
  </StoreProvider>
);

// Removed <React.StrictMode></React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
