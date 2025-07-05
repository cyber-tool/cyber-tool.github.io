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
  SwapHoriz as SwapIcon,
  Info as InfoIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

export default function RomanNumeral() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'decimal-to-roman' | 'roman-to-decimal'>('decimal-to-roman');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const decimalToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return 'Invalid number (1-3999)';
    
    let result = '';
    for (const { value, numeral } of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const romanToDecimal = (roman: string): number => {
    const romanMap: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    let prev = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
      const current = romanMap[roman[i].toUpperCase()];
      if (!current) return 0; // Invalid character
      
      if (current >= prev) {
        result += current;
      } else {
        result -= current;
      }
      prev = current;
    }
    
    return result;
  };

  const handleConvert = () => {
    if (!inputValue.trim()) {
      showMessage('Please enter a value', 'warning');
      return;
    }

    try {
      if (mode === 'decimal-to-roman') {
        const num = parseInt(inputValue);
        if (isNaN(num)) {
          showMessage('Please enter a valid number', 'error');
          return;
        }
        const converted = decimalToRoman(num);
        setResult(converted);
        showMessage('Converted to Roman numeral!', 'success');
      } else {
        const converted = romanToDecimal(inputValue);
        if (converted === 0) {
          showMessage('Please enter a valid Roman numeral', 'error');
          return;
        }
        setResult(converted.toString());
        showMessage('Converted to decimal!', 'success');
      }
    } catch (error) {
      showMessage('Error during conversion', 'error');
    }
  };

  const handleSwap = () => {
    setMode(mode === 'decimal-to-roman' ? 'roman-to-decimal' : 'decimal-to-roman');
    setInputValue(result);
    setResult('');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('Copied to clipboard!', 'success');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
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
          Roman Numeral Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert between decimal numbers and Roman numerals. Supports numbers from 1 to 3999.
        </Typography>
      </Box>

      {/* Mode Selection */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="Decimal to Roman"
            onClick={() => setMode('decimal-to-roman')}
            color={mode === 'decimal-to-roman' ? 'primary' : 'default'}
            variant={mode === 'decimal-to-roman' ? 'filled' : 'outlined'}
            icon={<CalculateIcon />}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Roman to Decimal"
            onClick={() => setMode('roman-to-decimal')}
            color={mode === 'roman-to-decimal' ? 'primary' : 'default'}
            variant={mode === 'roman-to-decimal' ? 'filled' : 'outlined'}
            icon={<CalculateIcon />}
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
                {mode === 'decimal-to-roman' ? 'Decimal Number' : 'Roman Numeral'}
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              variant="outlined"
              placeholder={mode === 'decimal-to-roman' ? 'Enter decimal number (1-3999)...' : 'Enter Roman numeral...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleConvert}
              disabled={!inputValue.trim()}
              startIcon={<CalculateIcon />}
              fullWidth
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
                {mode === 'decimal-to-roman' ? 'Roman Numeral' : 'Decimal Number'}
              </Typography>
              {result && (
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    onClick={() => handleCopy(result)}
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
              variant="outlined"
              value={result}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  backgroundColor: 'action.hover',
                }
              }}
            />
            
            {result && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Click the copy button to copy the result
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Common Examples */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Common Examples
        </Typography>
        <Grid container spacing={2}>
          {[
            { decimal: '1', roman: 'I' },
            { decimal: '5', roman: 'V' },
            { decimal: '10', roman: 'X' },
            { decimal: '50', roman: 'L' },
            { decimal: '100', roman: 'C' },
            { decimal: '500', roman: 'D' },
            { decimal: '1000', roman: 'M' },
            { decimal: '2024', roman: 'MMXXIV' }
          ].map((example) => (
            <Grid item xs={6} sm={3} key={example.decimal}>
              <Chip
                label={`${example.decimal} = ${example.roman}`}
                onClick={() => {
                  if (mode === 'decimal-to-roman') {
                    setInputValue(example.decimal);
                  } else {
                    setInputValue(example.roman);
                  }
                  setResult('');
                }}
                variant="outlined"
                sx={{ cursor: 'pointer', width: '100%' }}
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
          Roman numerals use letters to represent numbers. The basic symbols are: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.
          This converter supports numbers from 1 to 3999.
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
                Convert decimal to Roman and vice versa
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Range 1-3999
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supports standard Roman numeral range
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Common Examples
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick reference for common conversions
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