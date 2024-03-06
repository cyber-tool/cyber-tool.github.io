import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';

function Base64Encode() {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const encodeText = async () => {
    try {
      console.log(process.env.REACT_APP_API_DOMAIN);
      const response = await fetch('https://' + process.env.REACT_APP_API_DOMAIN + '/b64en', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ string: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEncodedText(data.base64_data);
    } catch (error) {
      console.error('Failed to encode:', error);
      alert('Failed to encode text. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Encode Base64</Typography>
        <hr/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Encode"
                variant="outlined"
                fullWidth
                multiline
                minRows={10}
                value={inputText}
                color='secondary'
                onChange={handleInputChange}
                placeholder="Enter text here"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Encoded Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={10}
                value={encodedText}
                InputProps={{
                  readOnly: true,
                }}
                color='secondary'
                placeholder="Encoded text will appear here"
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="secondary" onClick={encodeText} size="large">
              Encode
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Base64Encode;
