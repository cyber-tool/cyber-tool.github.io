import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, useTheme, Toolbar } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import CachedIcon from '@mui/icons-material/Cached';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NumbersIcon from '@mui/icons-material/Numbers';

const services = [
  { id: 1, name: 'Torrent To Magnet', path: 't2m', Icon: LinkIcon },
  { id: 2, name: 'Magnet To Torrent', path: 'm2t', Icon: CachedIcon },
  { id: 3, name: 'Remove Image Background', path: 'rmb', Icon: ImageIcon },
  { id: 4, name: 'Word To PDF', path: 'w2p', Icon: ArticleIcon },
  { id: 5, name: 'PDF To Word', path: 'p2w', Icon: PictureAsPdfIcon },
  { id: 6, name: 'Base64 Encode', path: 'b64en', Icon: NumbersIcon },
  { id: 7, name: 'Base64 Decode', path: 'b64de', Icon: NumbersIcon },
];

function MainPage() {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, color: theme.palette.text.primary }}>
      <Typography variant="h2" gutterBottom textAlign="center" sx={{ mb: 5, color: 'primary.main' }}>
        Welcome to Cyber Tool
      </Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Link to={`/${service.path}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'secondary.main', 
                  color: 'primary.contrastText',
                  '&:hover': { 
                    boxShadow: `0 8px 16px 0 ${theme.palette.primary.main}` 
                  },
                  transition: '0.3s',
                }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <service.Icon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                  <Typography gutterBottom variant="h4" component="h2" sx={{ color: 'primary.contrastText' }}>
                    {service.name}
                  </Typography>
                  {/* <Typography sx={{ color: 'text.secondary', size: 48 }}>
                    {service.description}
                  </Typography> */}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MainPage;
