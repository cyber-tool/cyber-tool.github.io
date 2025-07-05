'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function JSONFormatter() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [action, setAction] = useState('format');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleActionChange = (event: React.MouseEvent<HTMLElement>, newAction: string) => {
    if (newAction !== null) {
      setAction(newAction);
    }
  };

  const processJSON = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some JSON to process.', 'warning');
        return;
      }
      
      let parsed;
      try {
        parsed = JSON.parse(inputText);
      } catch (parseError) {
        showMessage('Invalid JSON format. Please check your input.', 'error');
        return;
      }
      
      let result = '';
      switch (action) {
        case 'format':
          result = JSON.stringify(parsed, null, 2);
          break;
        case 'minify':
          result = JSON.stringify(parsed);
          break;
        case 'validate':
          result = '✅ Valid JSON\n\n' + JSON.stringify(parsed, null, 2);
          break;
        default:
          result = JSON.stringify(parsed, null, 2);
      }
      
      setFormattedText(result);
      showMessage(`JSON ${action}ed successfully!`, 'success');
    } catch (error) {
      console.error('Failed to process JSON:', error);
      showMessage('Failed to process JSON. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">JSON Formatter</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="JSON Input"
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
                placeholder='{"example": "JSON input"}'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Processed JSON"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
                value={formattedText}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Processed JSON will appear here"
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
              value={action}
              exclusive
              onChange={handleActionChange}
              aria-label="json action"
              sx={{ mb: 2 }}
            >
              <ToggleButton value="format" aria-label="format">
                Format
              </ToggleButton>
              <ToggleButton value="minify" aria-label="minify">
                Minify
              </ToggleButton>
              <ToggleButton value="validate" aria-label="validate">
                Validate
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" color="secondary" onClick={processJSON} size="large">
              Process JSON
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default JSONFormatter; 