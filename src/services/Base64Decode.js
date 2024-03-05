import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextareaAutosize, Typography } from '@mui/material';

function Base64Decode() {
  const [inputText, setInputText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const decodeText = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/b64de', {
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
      setDecodedText(data.base64_data);
    } catch (error) {
      console.error('Failed to decode:', error);
      alert('Failed to decode text. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Base64 Decode
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Text to Decode</Typography>
          <TextareaAutosize
            minRows={10}
            style={{ width: '100%' }}
            value={inputText}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Decoded Text</Typography>
          <TextareaAutosize
            minRows={10}
            style={{ width: '100%' }}
            value={decodedText}
            readOnly
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" onClick={decodeText}>
          Decode
        </Button>
      </Box>
    </Container>
  );
}

export default Base64Decode;
