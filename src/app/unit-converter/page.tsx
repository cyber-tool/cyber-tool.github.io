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

interface ConversionCategory {
  name: string;
  units: { value: string; label: string; }[];
  convert: (value: number, from: string, to: string) => number;
}

const conversionCategories: ConversionCategory[] = [
  {
    name: 'Length',
    units: [
      { value: 'm', label: 'Meters' },
      { value: 'km', label: 'Kilometers' },
      { value: 'cm', label: 'Centimeters' },
      { value: 'mm', label: 'Millimeters' },
      { value: 'mi', label: 'Miles' },
      { value: 'yd', label: 'Yards' },
      { value: 'ft', label: 'Feet' },
      { value: 'in', label: 'Inches' }
    ],
    convert: (value: number, from: string, to: string) => {
      // Convert to meters first, then to target unit
      const toMeters: { [key: string]: number } = {
        m: 1, km: 1000, cm: 0.01, mm: 0.001,
        mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254
      };
      const meters = value * toMeters[from];
      return meters / toMeters[to];
    }
  },
  {
    name: 'Weight',
    units: [
      { value: 'kg', label: 'Kilograms' },
      { value: 'g', label: 'Grams' },
      { value: 'mg', label: 'Milligrams' },
      { value: 'lb', label: 'Pounds' },
      { value: 'oz', label: 'Ounces' },
      { value: 'ton', label: 'Metric Tons' }
    ],
    convert: (value: number, from: string, to: string) => {
      const toGrams: { [key: string]: number } = {
        kg: 1000, g: 1, mg: 0.001,
        lb: 453.592, oz: 28.3495, ton: 1000000
      };
      const grams = value * toGrams[from];
      return grams / toGrams[to];
    }
  },
  {
    name: 'Temperature',
    units: [
      { value: 'c', label: 'Celsius' },
      { value: 'f', label: 'Fahrenheit' },
      { value: 'k', label: 'Kelvin' }
    ],
    convert: (value: number, from: string, to: string) => {
      // Convert to Celsius first
      let celsius: number;
      switch (from) {
        case 'c': celsius = value; break;
        case 'f': celsius = (value - 32) * 5/9; break;
        case 'k': celsius = value - 273.15; break;
        default: celsius = value;
      }
      
      // Convert from Celsius to target
      switch (to) {
        case 'c': return celsius;
        case 'f': return celsius * 9/5 + 32;
        case 'k': return celsius + 273.15;
        default: return celsius;
      }
    }
  },
  {
    name: 'Volume',
    units: [
      { value: 'l', label: 'Liters' },
      { value: 'ml', label: 'Milliliters' },
      { value: 'gal', label: 'Gallons' },
      { value: 'qt', label: 'Quarts' },
      { value: 'pt', label: 'Pints' },
      { value: 'cup', label: 'Cups' }
    ],
    convert: (value: number, from: string, to: string) => {
      const toLiters: { [key: string]: number } = {
        l: 1, ml: 0.001, gal: 3.78541,
        qt: 0.946353, pt: 0.473176, cup: 0.236588
      };
      const liters = value * toLiters[from];
      return liters / toLiters[to];
    }
  }
];

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const currentCategory = conversionCategories[selectedCategory];

  const handleConvert = () => {
    if (!inputValue || !fromUnit || !toUnit) {
      showMessage('Please fill in all fields', 'warning');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      showMessage('Please enter a valid number', 'error');
      return;
    }

    try {
      const converted = currentCategory.convert(numValue, fromUnit, toUnit);
      setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
      showMessage('Conversion completed!', 'success');
    } catch (error) {
      showMessage('Error during conversion', 'error');
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result) {
      setInputValue(result);
      setResult('');
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('Copied to clipboard!', 'success');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const handleCategoryChange = (categoryIndex: number) => {
    setSelectedCategory(categoryIndex);
    setFromUnit('');
    setToUnit('');
    setInputValue('');
    setResult('');
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
          Unit Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert between different units of measurement. Supports length, weight, temperature, and volume.
        </Typography>
      </Box>

      {/* Category Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Select Category
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {conversionCategories.map((category, index) => (
            <Chip
              key={category.name}
              label={category.name}
              onClick={() => handleCategoryChange(index)}
              color={selectedCategory === index ? 'primary' : 'default'}
              variant={selectedCategory === index ? 'filled' : 'outlined'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
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
          {/* From Unit */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>From Unit</InputLabel>
              <Select
                value={fromUnit}
                label="From Unit"
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {currentCategory.units.map((unit) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Input Value */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
          </Grid>

          {/* Swap Button */}
          <Grid item xs={12} sm={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Swap units">
                <IconButton onClick={handleSwap} color="primary">
                  <SwapIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* To Unit */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>To Unit</InputLabel>
              <Select
                value={toUnit}
                label="To Unit"
                onChange={(e) => setToUnit(e.target.value)}
              >
                {currentCategory.units.map((unit) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
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
              disabled={!inputValue || !fromUnit || !toUnit}
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
                Result: {result} {currentCategory.units.find(u => u.value === toUnit)?.label}
              </Typography>
              <Tooltip title="Copy result">
                <IconButton onClick={() => handleCopy(result)}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {inputValue} {currentCategory.units.find(u => u.value === fromUnit)?.label} = {result} {currentCategory.units.find(u => u.value === toUnit)?.label}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Info Section */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mt: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          This converter supports common units for length, weight, temperature, and volume. 
          All calculations are performed locally in your browser for privacy.
        </Typography>
      </Alert>

      {/* Features Section */}
      <Box sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Supported Conversions
          </Typography>
        </Divider>
        
        <Grid container spacing={3}>
          {conversionCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.units.map(u => u.label).join(', ')}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
} 