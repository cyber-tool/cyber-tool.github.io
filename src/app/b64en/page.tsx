'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function Base64Encode() {

  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const encodeText = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to encode.', 'warning');
        return;
      }
      
      const encoded = btoa(inputText);
      setEncodedText(encoded);
      showMessage('Text encoded successfully!', 'success');
    } catch (error) {
      console.error('Failed to encode:', error);
      showMessage('Failed to encode text. Please check your input.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Encode Base64</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Encode"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                value={inputText}
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
                minRows={15}
                maxRows={15}
                value={encodedText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Encoded text will appear here"
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
