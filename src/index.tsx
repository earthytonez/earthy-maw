/*
 * index.tsx
 *
 * If we need more detailed performance information, bring back reportWebVitals.
 *
 */

import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { StoreProvider } from "./stores/useStore";
import { UIStoreProvider } from "./stores/UI/useUIStore";

import mixpanel from "mixpanel-browser";

mixpanel.init("0b6a191b9807f7281e6a54e8395a788d", { debug: true });
mixpanel.track("Landing Page");

const theme = createTheme({
  palette: {
    mode: "dark",
    error: {
      main: "#148C94",
    },
    primary: {
      main: "#148C94",
    },
  },
  zIndex: {
    drawer: 1200,
  },
});

declare module "@mui/material/Grid" {
  interface ButtonPropsVariantOverrides {
    "tight-border": true;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
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
