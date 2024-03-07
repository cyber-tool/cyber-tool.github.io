import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from "../images/cyber-tool-logo.webp";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ flexDirection: 'row', backgroundColor: theme.palette.secondary.main }}>
      <Toolbar>
        <IconButton edge="start" sx={{ color: theme.palette.primary.contrastText }} aria-label="home" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 10 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.primary.contrastText }}>
          Cyber Tool
        </Typography>
        <Button sx={{ color: theme.palette.primary.contrastText }} onClick={() => navigate('/')}>
          <HomeIcon sx={{ mr: 0.5 }} />
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
