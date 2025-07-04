'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function ToLeet() {

  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [leetText, setLeetText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const decodeText = async () => {
    try {
      const response = await fetch('https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/toleet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLeetText(data.leet_text);
    } catch (error) {
      console.error('Failed to Leet:', error);
      showMessage('Failed to Leet text. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Convert To Leet Text</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Leet Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.contrastText,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.dark,
                  },
                }}
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter encoded text here"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Leet Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: theme.palette.secondary.dark,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.contrastText,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.secondary.dark,
                  },
                }}
                value={leetText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Decoded text will appear here"
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="secondary" onClick={decodeText} size="large">
              Convert
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ToLeet;
