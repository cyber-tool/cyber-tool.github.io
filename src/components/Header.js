"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./../../public/cyber-tool-logo.webp"
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import React from "react";

const services = [
  { name: 'Torrent To Magnet', path: 't2m' },
  { name: 'Magnet To Torrent', path: 'm2t' },
  { name: 'Remove Image Background', path: 'rmb' },
  { name: 'Word To PDF', path: 'w2p' },
  { name: 'PDF To Word', path: 'p2w' },
  { name: 'Base64 Encode', path: 'b64en' },
  { name: 'Base64 Decode', path: 'b64de' },
  { name: 'Convert to Leet Text', path: 'toleet' },
];

const Header = () => {
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: "row",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => router.push("/")}
          edge="start"
          aria-label="home"
        >
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            style={{ marginRight: 10 }}
            unoptimized
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.secondary.text }}
        >
          Cyber Tool
        </Typography>
        <Button onClick={() => router.push("/")} sx={{ color: theme.palette.secondary.text }}>
          <HomeIcon sx={{ mr: 0.5 }} />
          Home
        </Button>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="nav-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ color: theme.palette.secondary.text, ml: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {services.map((service) => (
            <MenuItem key={service.path} onClick={() => { router.push(`/${service.path}`); handleClose(); }}>
              {service.name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
