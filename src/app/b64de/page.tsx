'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function Base64Decode() {

  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const decodeText = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to decode.', 'warning');
        return;
      }
      
      const decoded = atob(inputText);
      setDecodedText(decoded);
      showMessage('Text decoded successfully!', 'success');
    } catch (error) {
      console.error('Failed to decode:', error);
      showMessage('Failed to decode text. Please check if the input is valid Base64.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Decode Base64</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Decode"
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
                label="Decoded Text"
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