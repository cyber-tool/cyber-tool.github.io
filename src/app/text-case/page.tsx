'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function TextCase() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [caseType, setCaseType] = useState('uppercase');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleCaseChange = (event: React.MouseEvent<HTMLElement>, newCase: string) => {
    if (newCase !== null) {
      setCaseType(newCase);
    }
  };

  const convertCase = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to convert.', 'warning');
        return;
      }
      
      let result = '';
      switch (caseType) {
        case 'uppercase':
          result = inputText.toUpperCase();
          break;
        case 'lowercase':
          result = inputText.toLowerCase();
          break;
        case 'titlecase':
          result = inputText.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          );
          break;
        case 'camelcase':
          result = inputText.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
            .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
          break;
        case 'snakecase':
          result = inputText.toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/^_|_$/g, '');
          break;
        case 'kebabcase':
          result = inputText.toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
          break;
        default:
          result = inputText;
      }
      
      setConvertedText(result);
      showMessage(`Text converted to ${caseType} successfully!`, 'success');
    } catch (error) {
      console.error('Failed to convert case:', error);
      showMessage('Failed to convert text. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Text Case Converter</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Convert"
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
                label="Converted Text"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                value={convertedText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Converted text will appear here"
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
              value={caseType}
              exclusive
              onChange={handleCaseChange}
              aria-label="text case"
              sx={{ mb: 2 }}
            >
              <ToggleButton value="uppercase" aria-label="uppercase">
                UPPERCASE
              </ToggleButton>
              <ToggleButton value="lowercase" aria-label="lowercase">
                lowercase
              </ToggleButton>
              <ToggleButton value="titlecase" aria-label="titlecase">
                Title Case
              </ToggleButton>
              <ToggleButton value="camelcase" aria-label="camelcase">
                camelCase
              </ToggleButton>
              <ToggleButton value="snakecase" aria-label="snakecase">
                snake_case
              </ToggleButton>
              <ToggleButton value="kebabcase" aria-label="kebabcase">
                kebab-case
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" color="secondary" onClick={convertCase} size="large">
              Convert Case
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default TextCase; 