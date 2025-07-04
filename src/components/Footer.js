"use client";
import { Box, Container, Typography, Toolbar, useTheme, IconButton, Stack, Link as MuiLink } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Toolbar />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: theme.palette.secondary.main,
          borderTop: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <IconButton component="a" href="https://github.com/josephrds/cyber-tool.github.io" target="_blank" rel="noopener" color="inherit" aria-label="GitHub">
              <GitHubIcon />
            </IconButton>
            <IconButton component="a" href="https://www.linkedin.com/in/joseph-rasanjana/" target="_blank" rel="noopener" color="inherit" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton component="a" href="mailto:josephrds@gmail.com" color="inherit" aria-label="Email">
              <EmailIcon />
            </IconButton>
          </Stack>
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
            <MuiLink href="https://www.linkedin.com/in/joseph-rasanjana/" target="_blank" rel="noopener" underline="hover" color="inherit" sx={{ ml: 0.5 }}>
              Joseph Rasanjana
            </MuiLink>.
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
