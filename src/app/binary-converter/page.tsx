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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

const numberSystems = [
  { value: 2, label: 'Binary (Base 2)', prefix: '0b' },
  { value: 8, label: 'Octal (Base 8)', prefix: '0o' },
  { value: 10, label: 'Decimal (Base 10)', prefix: '' },
  { value: 16, label: 'Hexadecimal (Base 16)', prefix: '0x' }
];

export default function BinaryConverter() {
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const convertNumber = (value: string, fromBase: number, toBase: number): string => {
    try {
      // Remove prefix if present
      let cleanValue = value;
      const fromSystem = numberSystems.find(sys => sys.value === fromBase);
      if (fromSystem?.prefix && value.startsWith(fromSystem.prefix)) {
        cleanValue = value.slice(fromSystem.prefix.length);
      }

      // Convert to decimal first
      const decimal = parseInt(cleanValue, fromBase);
      if (isNaN(decimal)) {
        throw new Error('Invalid number for the selected base');
      }

      // Convert from decimal to target base
      if (toBase === 10) {
        return decimal.toString();
      } else {
        const converted = decimal.toString(toBase).toUpperCase();
        const toSystem = numberSystems.find(sys => sys.value === toBase);
        return toSystem?.prefix ? toSystem.prefix + converted : converted;
      }
    } catch (error) {
      throw new Error('Invalid input or conversion error');
    }
  };

  const handleConvert = () => {
    if (!inputValue.trim()) {
      showMessage('Please enter a value', 'warning');
      return;
    }

    try {
      const converted = convertNumber(inputValue, fromBase, toBase);
      setResult(converted);
      showMessage('Conversion completed!', 'success');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'Error during conversion', 'error');
    }
  };

  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
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
          Number System Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert between different number systems: Binary, Octal, Decimal, and Hexadecimal.
        </Typography>
      </Box>

      {/* Conversion Form */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
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
        <Grid container spacing={3} alignItems="center">
          {/* From Base */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>From Base</InputLabel>
              <Select
                value={fromBase}
                label="From Base"
                onChange={(e) => setFromBase(e.target.value as number)}
              >
                {numberSystems.map((system) => (
                  <MenuItem key={system.value} value={system.value}>
                    {system.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Input Value */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter ${numberSystems.find(s => s.value === fromBase)?.label.toLowerCase()}`}
            />
          </Grid>

          {/* Swap Button */}
          <Grid item xs={12} sm={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Swap bases">
                <IconButton onClick={handleSwap} color="primary">
                  <SwapIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* To Base */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>To Base</InputLabel>
              <Select
                value={toBase}
                label="To Base"
                onChange={(e) => setToBase(e.target.value as number)}
              >
                {numberSystems.map((system) => (
                  <MenuItem key={system.value} value={system.value}>
                    {system.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Convert Button */}
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={handleConvert}
              disabled={!inputValue}
              startIcon={<CalculateIcon />}
              fullWidth
            >
              Convert
            </Button>
          </Grid>
        </Grid>

        {/* Result */}
        {result && (
          <Box sx={{ mt: 4, p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" color="primary.main">
                Result: {result}
              </Typography>
              <Tooltip title="Copy result">
                <IconButton onClick={() => handleCopy(result)}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {inputValue} ({numberSystems.find(s => s.value === fromBase)?.label}) = {result} ({numberSystems.find(s => s.value === toBase)?.label})
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Common Examples */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Common Examples
        </Typography>
        <Grid container spacing={2}>
          {[
            { decimal: '255', binary: '11111111', hex: 'FF', octal: '377' },
            { decimal: '16', binary: '10000', hex: '10', octal: '20' },
            { decimal: '42', binary: '101010', hex: '2A', octal: '52' },
            { decimal: '100', binary: '1100100', hex: '64', octal: '144' }
          ].map((example) => (
            <Grid item xs={12} sm={6} md={3} key={example.decimal}>
              <Chip
                label={`${example.decimal} = ${example.binary} = ${example.hex} = ${example.octal}`}
                onClick={() => {
                  setFromBase(10);
                  setToBase(2);
                  setInputValue(example.decimal);
                  setResult('');
                }}
                variant="outlined"
                sx={{ cursor: 'pointer', width: '100%', fontSize: '0.75rem' }}
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
          This converter supports Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) number systems.
          Prefixes (0b, 0o, 0x) are automatically handled.
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
                Four Bases
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Binary, Octal, Decimal, Hexadecimal
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Auto Prefixes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handles 0b, 0o, 0x prefixes automatically
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