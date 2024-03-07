import { Box, Container, Typography, Toolbar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <>
      <Toolbar />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#808080",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              pt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Made With <FavoriteIcon sx={{ fontSize: "1rem", mx: 0.5 }} /> By
            Joseph Rasanjana.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ pt: 3 }}
          >
            © {new Date().getFullYear()} Cyber Tool. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
