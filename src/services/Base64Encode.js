import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextareaAutosize, Typography } from '@mui/material';

function Base64Encode() {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const encodeText = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/b64en', {
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
      <Typography variant="h4" gutterBottom>
        Base64 Encode
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Text to Encode</Typography>
          <TextareaAutosize
            minRows={10}
            style={{ width: '100%' }}
            value={inputText}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Encoded Text</Typography>
          <TextareaAutosize
            minRows={10}
            style={{ width: '100%' }}
            value={encodedText}
            readOnly
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" onClick={encodeText}>
          Encode
        </Button>
      </Box>
    </Container>
  );
}

export default Base64Encode;
