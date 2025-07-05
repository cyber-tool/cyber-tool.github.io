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

  const leetMap: { [key: string]: string } = {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'i': '1', 'I': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
    't': '7', 'T': '7',
    'g': '9', 'G': '9',
    'l': '|', 'L': '|',
    'b': '8', 'B': '8',
    'z': '2', 'Z': '2'
  };

  const convertToLeet = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to convert.', 'warning');
        return;
      }
      
      let leetResult = inputText;
      for (const [char, leetChar] of Object.entries(leetMap)) {
        leetResult = leetResult.replace(new RegExp(char, 'g'), leetChar);
      }
      
      setLeetText(leetResult);
      showMessage('Text converted to leet successfully!', 'success');
    } catch (error) {
      console.error('Failed to convert to leet:', error);
      showMessage('Failed to convert text. Please try again.', 'error');
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
            <Button variant="contained" color="secondary" onClick={convertToLeet} size="large">
              Convert
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ToLeet;
