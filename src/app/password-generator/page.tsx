'use client'
import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, FormControlLabel, Checkbox, Slider } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function PasswordGenerator() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    try {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      let chars = '';
      if (includeUppercase) chars += uppercase;
      if (includeLowercase) chars += lowercase;
      if (includeNumbers) chars += numbers;
      if (includeSymbols) chars += symbols;

      if (chars === '') {
        showMessage('Please select at least one character type.', 'warning');
        return;
      }

      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      setPassword(result);
      showMessage('Password generated successfully!', 'success');
    } catch (error) {
      console.error('Failed to generate password:', error);
      showMessage('Failed to generate password. Please try again.', 'error');
    }
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      showMessage('Password copied to clipboard!', 'success');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Password Generator</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Password Options
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>Password Length: {length}</Typography>
                <Slider
                  value={length}
                  onChange={(event, newValue) => setLength(newValue as number)}
                  min={4}
                  max={50}
                  valueLabelDisplay="auto"
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    sx={{ color: theme.palette.primary.main }}
                  />
                }
                label="Include Uppercase Letters (A-Z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    sx={{ color: theme.palette.primary.main }}
                  />
                }
                label="Include Lowercase Letters (a-z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    sx={{ color: theme.palette.primary.main }}
                  />
                }
                label="Include Numbers (0-9)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    sx={{ color: theme.palette.primary.main }}
                  />
                }
                label="Include Symbols (!@#$%^&*)"
              />
              <Box textAlign="center" mt={3}>
                <Button variant="contained" color="secondary" onClick={generatePassword} size="large">
                  Generate Password
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Generated Password
              </Typography>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                multiline
                minRows={8}
                maxRows={8}
                value={password}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Generated password will appear here"
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
              <Box textAlign="center" mt={2}>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={copyToClipboard} 
                  size="large"
                  disabled={!password}
                >
                  Copy to Clipboard
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default PasswordGenerator; 