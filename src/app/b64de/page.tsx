'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';

function Base64Decode() {
  const [inputText, setInputText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const decodeText = async () => {
    try {
      const response = await fetch('https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/b64de', {
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
      setDecodedText(data.decoded_data); // Ensure this matches your JSON response key for decoded data
    } catch (error) {
      console.error('Failed to decode:', error);
      alert('Failed to decode text. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Decode Base64</Typography>
        <hr/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Decode"
                variant="outlined"
                fullWidth
                multiline
                minRows={10}
                color='secondary'
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter encoded text here"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Decoded Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={10}
                color='secondary'
                value={decodedText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Decoded text will appear here"
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="secondary" onClick={decodeText} size="large">
              Decode
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Base64Decode;