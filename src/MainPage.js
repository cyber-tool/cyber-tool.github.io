import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import UnzipIcon from '@mui/icons-material/Unarchive'; // For the unzip service
import LinkIcon from '@mui/icons-material/Link'; // A generic choice for t2m and rmb temporarily
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Suggested icon for rmb

const services = [
 { id: 1, name: 'unzip', description: 'Effortlessly unzip files and manage your data.', Icon: UnzipIcon },
 { id: 2, name: 't2m', description: 'Convert torrent files to magnet links.', Icon: LinkIcon },
 { id: 3, name: 'rmb', description: 'Image Background Remover.', Icon: RemoveCircleOutlineIcon }, // Updated with a more appropriate icon
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
