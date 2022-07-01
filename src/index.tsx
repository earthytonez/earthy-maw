import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { StoreProvider } from "./stores/useStore.tsx";
import { UIStoreProvider } from "./stores/UI/useUIStore.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

theme.typography.h1 = {
  fontFamily: "Fascinate, cursive",
  fontSize: "2rem",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <StoreProvider>
      <UIStoreProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UIStoreProvider>
    </StoreProvider>
  </div>
);

// Removed <React.StrictMode></React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
