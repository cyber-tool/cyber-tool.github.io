'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function URLDecode() {
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
      
      const decoded = decodeURIComponent(inputText);
      setDecodedText(decoded);
      showMessage('Text URL decoded successfully!', 'success');
    } catch (error) {
      console.error('Failed to decode:', error);
      showMessage('Failed to decode text. Please check if the input is valid URL encoded text.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">URL Decode</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to URL Decode"
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
                placeholder="Enter URL encoded text here"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="URL Decoded Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                value={decodedText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="URL decoded text will appear here"
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
            <Button variant="contained" color="secondary" onClick={decodeText} size="large">
              URL Decode
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default URLDecode; 