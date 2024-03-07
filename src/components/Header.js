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

const Header = () => {
  const router = useRouter();
  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: "row",
        backgroundColor: "#808080",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => router.push("/")}
          edge="start"
          sx={{ color: "#696969" }}
          aria-label="home"
        >
          <Image
            src="/cyber-tool-logo.webp"
            alt="logo"
            width={40}
            height={40}
            style={{ marginRight: 10 }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#ffffff" }}
        >
          Cyber Tool
        </Typography>
        <Button onClick={() => router.push("/")} sx={{ color: "#ffffff" }}>
          <HomeIcon sx={{ mr: 0.5 }} />
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
