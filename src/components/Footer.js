"use client";
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton, 
  Divider,
  useTheme 
} from '@mui/material';
import { 
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'File Tools',
      links: [
        { name: 'Torrent to Magnet', href: '/t2m' },
        { name: 'Remove Background', href: '/rmb' },
        { name: 'Word to PDF', href: '/w2p' },
        { name: 'PDF to Word', href: '/p2w' },
      ]
    },
    {
      title: 'Text Tools',
      links: [
        { name: 'Base64 Encode', href: '/b64en' },
        { name: 'Base64 Decode', href: '/b64de' },
        { name: 'URL Encode', href: '/url-encode' },
        { name: 'Text Case', href: '/text-case' },
      ]
    },
    {
      title: 'Security Tools',
      links: [
        { name: 'Hash Generator', href: '/hash-generator' },
        { name: 'Password Generator', href: '/password-generator' },
        { name: 'Leet Text', href: '/toleet' },
        { name: 'JSON Formatter', href: '/json-formatter' },
      ]
    },
    {
      title: 'Design Tools',
      links: [
        { name: 'Color Converter', href: '/color-converter' },
        { name: 'Text Analyzer', href: '/text-analyzer' },
        { name: 'QR Generator', href: '/qr-generator' },
        { name: 'Magnet to Torrent', href: '/m2t' },
      ]
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              color="primary.main" 
              fontWeight="bold" 
              gutterBottom
            >
              Cyber Tool
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              Your comprehensive toolkit for file conversion, text processing, and utility tools. 
              Built with modern web technologies for the best user experience.
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
                onClick={() => window.open('mailto:contact@cybertool.com', '_blank')}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Tool Categories */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography 
                variant="h6" 
                color="text.primary" 
                fontWeight="600" 
                gutterBottom
                sx={{ fontSize: '1rem' }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Bottom Footer */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'center', sm: 'center' },
            gap: 2
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            © {currentYear} Cyber Tool. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Made with
            </Typography>
            <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} />
            <Typography variant="body2" color="text.secondary">
              by Joseph Rasanjana
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
