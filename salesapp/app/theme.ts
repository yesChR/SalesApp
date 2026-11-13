"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  modularCssLayers: true,
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
});

export default theme;
