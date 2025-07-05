'use client';
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  useTheme,
  Divider,
  Chip
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Clear as ClearIcon,
  Info as InfoIcon,
  Wifi as WifiIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const morseCode: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', ' ': ' '
};

const reverseMorseCode: { [key: string]: string } = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
);

export default function MorseCode() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const textToMorse = (text: string): string => {
    return text.toUpperCase().split('').map(char => {
      return morseCode[char] || char;
    }).join(' ');
  };

  const morseToText = (morse: string): string => {
    return morse.split(' ').map(code => {
      return reverseMorseCode[code] || code;
    }).join('');
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      showMessage('Please enter some text', 'warning');
      return;
    }

    try {
      if (mode === 'text-to-morse') {
        const converted = textToMorse(inputText);
        setOutputText(converted);
        showMessage('Converted to Morse code!', 'success');
      } else {
        const converted = morseToText(inputText);
        setOutputText(converted);
        showMessage('Converted to text!', 'success');
      }
    } catch (error) {
      showMessage('Error during conversion', 'error');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    showMessage('Cleared all text', 'info');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('Copied to clipboard!', 'success');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const handleSwap = () => {
    setMode(mode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse');
    setInputText(outputText);
    setOutputText('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 2,
            '@media (max-width: 600px)': {
              fontSize: '2rem',
            }
          }}
        >
          Morse Code Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert text to Morse code and vice versa. Learn the universal language of dots and dashes.
        </Typography>
      </Box>

      {/* Mode Selection */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="Text to Morse"
            onClick={() => setMode('text-to-morse')}
            color={mode === 'text-to-morse' ? 'primary' : 'default'}
            variant={mode === 'text-to-morse' ? 'filled' : 'outlined'}
            icon={<WifiIcon />}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Morse to Text"
            onClick={() => setMode('morse-to-text')}
            color={mode === 'morse-to-text' ? 'primary' : 'default'}
            variant={mode === 'morse-to-text' ? 'filled' : 'outlined'}
            icon={<WifiIcon />}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #fab505, #ff6b35)',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="600" color="primary.main">
                {mode === 'text-to-morse' ? 'Input Text' : 'Input Morse Code'}
              </Typography>
              <Tooltip title="Clear input">
                <IconButton
                  onClick={handleClear}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder={mode === 'text-to-morse' ? 'Enter text to convert to Morse code...' : 'Enter Morse code (separate letters with spaces)...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: mode === 'morse-to-text' ? 'monospace' : 'inherit',
                }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleConvert}
              disabled={!inputText.trim()}
              startIcon={<WifiIcon />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Convert
            </Button>
          </Paper>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b35, #fab505)',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight="600" color="secondary.main">
                {mode === 'text-to-morse' ? 'Morse Code Output' : 'Text Output'}
              </Typography>
              {outputText && (
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    onClick={() => handleCopy(outputText)}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={outputText}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: mode === 'text-to-morse' ? 'monospace' : 'inherit',
                  backgroundColor: 'action.hover',
                }
              }}
            />
            
            {outputText && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Click the copy button to copy the result
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Morse Code Reference */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Morse Code Reference
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(morseCode).slice(0, 26).map(([char, code]) => (
            <Grid item xs={6} sm={4} md={2} key={char}>
              <Chip
                label={`${char}: ${code}`}
                variant="outlined"
                sx={{ width: '100%', fontFamily: 'monospace' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Info Section */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mt: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          Morse code uses dots (.) and dashes (-) to represent letters and numbers. 
          Letters are separated by spaces, and words are separated by three spaces.
        </Typography>
      </Alert>

      {/* Features Section */}
      <Box sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Features
          </Typography>
        </Divider>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Two-Way Conversion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Convert text to Morse and vice versa
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Complete Alphabet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supports A-Z, 0-9, and punctuation
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Reference Chart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick reference for all Morse codes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Easy Copy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Copy results to clipboard instantly
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 