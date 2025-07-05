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
  Storage as StorageIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const fileSizeUnits = [
  { value: 'B', label: 'Bytes (B)', multiplier: 1 },
  { value: 'KB', label: 'Kilobytes (KB)', multiplier: 1024 },
  { value: 'MB', label: 'Megabytes (MB)', multiplier: 1024 * 1024 },
  { value: 'GB', label: 'Gigabytes (GB)', multiplier: 1024 * 1024 * 1024 },
  { value: 'TB', label: 'Terabytes (TB)', multiplier: 1024 * 1024 * 1024 * 1024 },
  { value: 'PB', label: 'Petabytes (PB)', multiplier: 1024 * 1024 * 1024 * 1024 * 1024 }
];

export default function FileSizeConverter() {
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const convertFileSize = (value: number, from: string, to: string) => {
    const fromUnit = fileSizeUnits.find(u => u.value === from);
    const toUnit = fileSizeUnits.find(u => u.value === to);
    
    if (!fromUnit || !toUnit) return 0;
    
    // Convert to bytes first, then to target unit
    const bytes = value * fromUnit.multiplier;
    return bytes / toUnit.multiplier;
  };

  const handleConvert = () => {
    if (!inputValue) {
      showMessage('Please enter a value', 'warning');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 0) {
      showMessage('Please enter a valid positive number', 'error');
      return;
    }

    try {
      const converted = convertFileSize(numValue, fromUnit, toUnit);
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

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
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
          File Size Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert between different file size units. Perfect for understanding storage requirements and file sizes.
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
          {/* From Unit */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>From Unit</InputLabel>
              <Select
                value={fromUnit}
                label="From Unit"
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {fileSizeUnits.map((unit) => (
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
              label="Size"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter file size"
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
                {fileSizeUnits.map((unit) => (
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
              disabled={!inputValue}
              startIcon={<StorageIcon />}
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
                Result: {result} {fileSizeUnits.find(u => u.value === toUnit)?.label}
              </Typography>
              <Tooltip title="Copy result">
                <IconButton onClick={() => handleCopy(result)}>
                  <CopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {inputValue} {fileSizeUnits.find(u => u.value === fromUnit)?.label} = {result} {fileSizeUnits.find(u => u.value === toUnit)?.label}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Common File Sizes */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Common File Sizes
        </Typography>
        <Grid container spacing={2}>
          {[
            { name: 'Text File', size: 1024 },
            { name: 'Image (JPEG)', size: 2 * 1024 * 1024 },
            { name: 'MP3 Song', size: 5 * 1024 * 1024 },
            { name: 'Video (HD)', size: 100 * 1024 * 1024 },
            { name: 'Movie (4K)', size: 2 * 1024 * 1024 * 1024 },
            { name: 'Game', size: 50 * 1024 * 1024 * 1024 }
          ].map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file.name}>
              <Chip
                label={`${file.name}: ${formatFileSize(file.size)}`}
                onClick={() => {
                  setInputValue((file.size / fileSizeUnits.find(u => u.value === fromUnit)!.multiplier).toString());
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
          File sizes are converted using binary prefixes (1024 bytes = 1 KB). 
          This is the standard used by most operating systems and storage devices.
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
                Binary Conversion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uses standard binary prefixes (1024-based)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Common Sizes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick reference for common file types
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Precise Results
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accurate conversions up to petabytes
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