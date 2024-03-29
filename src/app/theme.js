"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fab505",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#595959",
      contrastText: "#fab505",
      text: "#ffffff",
      dark: "#000000",
      light: "#ffffff",
    },
    background: {
      default: "#f0f0f0",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#fab505",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#fab505",
    },
    body1: {
      color: "#696969",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fab505",
          borderColor: "#fab505",
          "&:hover": {
            backgroundColor: "#696969",
          },
        },
      },
    },
  },
});

export default theme;
