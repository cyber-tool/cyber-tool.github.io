'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function HashGenerator() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [hashType, setHashType] = useState('SHA-256');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleHashTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) {
      setHashType(newType);
    }
  };

  const generateHash = async () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to hash.', 'warning');
        return;
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      
      let hashBuffer;
      switch (hashType) {
        case 'SHA-1':
          hashBuffer = await crypto.subtle.digest('SHA-1', data);
          break;
        case 'SHA-256':
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
          break;
        case 'SHA-512':
          hashBuffer = await crypto.subtle.digest('SHA-512', data);
          break;
        default:
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
      }
      
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHashResult(hashHex);
      showMessage(`${hashType} hash generated successfully!`, 'success');
    } catch (error) {
      console.error('Failed to generate hash:', error);
      showMessage('Failed to generate hash. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Hash Generator</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Hash"
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
                label="Generated Hash"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                value={hashResult}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Hash will appear here"
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
            <ToggleButtonGroup
              value={hashType}
              exclusive
              onChange={handleHashTypeChange}
              aria-label="hash type"
              sx={{ mb: 2 }}
            >
              <ToggleButton value="SHA-1" aria-label="SHA-1">
                SHA-1
              </ToggleButton>
              <ToggleButton value="SHA-256" aria-label="SHA-256">
                SHA-256
              </ToggleButton>
              <ToggleButton value="SHA-512" aria-label="SHA-512">
                SHA-512
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" color="secondary" onClick={generateHash} size="large">
              Generate Hash
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default HashGenerator; 