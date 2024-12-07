import "./App.css";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import StockPage from "./ui/pages/Stock/StockPage";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StockPage />
    </ThemeProvider>
  );
};

export default App;
