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

const Header = () => {
  const router = useRouter();
  const theme = useTheme();
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
