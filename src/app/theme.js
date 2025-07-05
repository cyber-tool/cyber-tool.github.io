"use client";
import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") => createTheme({
  palette: {
    mode,
    primary: {
      main: "#fab505",
      contrastText: "#ffffff",
    },
    secondary: {
      main: mode === "dark" ? "#888888" : "#595959",
      contrastText: "#fab505",
      text: mode === "dark" ? "#ffffff" : "#ffffff",
      dark: mode === "dark" ? "#ffffff" : "#000000",
      light: mode === "dark" ? "#cccccc" : "#ffffff",
    },
    background: {
      default: mode === "dark" ? "#121212" : "#f0f0f0",
      paper: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
    },
    text: {
      primary: mode === "dark" ? "#ffffff" : "#fab505",
      secondary: mode === "dark" ? "#b0b0b0" : "#696969",
    },
    divider: mode === "dark" ? "#333333" : "#e0e0e0",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    h2: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    h3: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    h4: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    h5: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    h6: {
      color: mode === "dark" ? "#ffffff" : "#fab505",
    },
    body1: {
      color: mode === "dark" ? "#e0e0e0" : "#696969",
    },
    body2: {
      color: mode === "dark" ? "#b0b0b0" : "#696969",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fab505",
          borderColor: "#fab505",
          "&:hover": {
            backgroundColor: mode === "dark" ? "#333333" : "#696969",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          border: mode === "dark" ? "1px solid #333333" : "1px solid #e0e0e0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          border: mode === "dark" ? "1px solid #333333" : "1px solid #e0e0e0",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: mode === "dark" ? "#ffffff" : "#696969",
          },
          "& .MuiInputLabel-root": {
            color: mode === "dark" ? "#b0b0b0" : "#696969",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: mode === "dark" ? "#fab505" : "#fab505",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "dark" ? "#555555" : "#696969",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: mode === "dark" ? "#fab505" : "#fab505",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#1a1a1a" : "#595959",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#ffffff" : "#696969",
          borderColor: mode === "dark" ? "#555555" : "#696969",
          "&.Mui-selected": {
            backgroundColor: mode === "dark" ? "#fab505" : "#fab505",
            color: mode === "dark" ? "#000000" : "#ffffff",
          },
          "&:hover": {
            backgroundColor: mode === "dark" ? "#333333" : "#f0f0f0",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#b0b0b0" : "#696969",
          "&.Mui-checked": {
            color: "#fab505",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#fab505",
        },
        track: {
          backgroundColor: "#fab505",
        },
        thumb: {
          backgroundColor: "#fab505",
        },
      },
    },
  },
});

export default getTheme;
