import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
// import UnzipIcon from '@mui/icons-material/Unarchive';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import CachedIcon from '@mui/icons-material/Cached';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NumbersIcon from '@mui/icons-material/Numbers';

const services = [
 { id: 1, name: 't2m', description: 'Convert torrent files to magnet links.', Icon: LinkIcon },
 {id: 2, name: 'm2t', description:'Convert magnet links to torrent files.', Icon: CachedIcon},
 { id: 3, name: 'rmb', description: 'Image Background Remover.', Icon: ImageIcon },
 {id: 4, name: 'w2p', description:'Convert word file to pdf', Icon: ArticleIcon},
 {id: 5, name: 'p2w', description:'Convert pdf to word file.', Icon: PictureAsPdfIcon},
 {id: 6, name: 'b64en', description:'Base64 encode.', Icon: NumbersIcon},
 {id: 7, name: 'b64de', description:'Base64 decode', Icon: NumbersIcon},
//  {id: 8, name: 'unzip', description: 'Effortlessly unzip files and manage your data.', Icon: UnzipIcon }
];

function MainPage() {
 return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom textAlign="center" sx={{ mb: 5 }}>
        Welcome to Cyber Tool
      </Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Link to={`/${service.name}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  '&:hover': { 
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' 
                  },
                  transition: '0.3s',
                }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <service.Icon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    {service.name.toUpperCase()}
                  </Typography>
                  <Typography>
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: 'white',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
 );
}

export default MainPage;
