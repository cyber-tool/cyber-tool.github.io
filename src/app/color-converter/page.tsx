'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function ColorConverter() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputColor, setInputColor] = useState('');
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [hslColor, setHslColor] = useState('');
  const [colorPreview, setColorPreview] = useState('#ffffff');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputColor(event.target.value);
  };

  const convertColor = () => {
    try {
      if (!inputColor.trim()) {
        showMessage('Please enter a color to convert.', 'warning');
        return;
      }

      let r = 0, g = 0, b = 0;
      let hex = '';

      // Handle HEX input
      if (inputColor.startsWith('#')) {
        hex = inputColor;
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
          r = parseInt(result[1], 16);
          g = parseInt(result[2], 16);
          b = parseInt(result[3], 16);
        } else {
          showMessage('Invalid HEX color format.', 'error');
          return;
        }
      }
      // Handle RGB input
      else if (inputColor.includes('rgb')) {
        const rgbMatch = inputColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (rgbMatch) {
          r = parseInt(rgbMatch[1]);
          g = parseInt(rgbMatch[2]);
          b = parseInt(rgbMatch[3]);
          hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        } else {
          showMessage('Invalid RGB color format.', 'error');
          return;
        }
      }
      // Handle HSL input
      else if (inputColor.includes('hsl')) {
        const hslMatch = inputColor.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)/);
        if (hslMatch) {
          const h = parseInt(hslMatch[1]);
          const s = parseInt(hslMatch[2]);
          const l = parseInt(hslMatch[3]);
          
          // Convert HSL to RGB
          const hue = h / 360;
          const sat = s / 100;
          const light = l / 100;
          
          const c = (1 - Math.abs(2 * light - 1)) * sat;
          const x = c * (1 - Math.abs((hue * 6) % 2 - 1));
          const m = light - c / 2;
          
          let r1 = 0, g1 = 0, b1 = 0;
          
          if (hue < 1/6) {
            r1 = c; g1 = x; b1 = 0;
          } else if (hue < 2/6) {
            r1 = x; g1 = c; b1 = 0;
          } else if (hue < 3/6) {
            r1 = 0; g1 = c; b1 = x;
          } else if (hue < 4/6) {
            r1 = 0; g1 = x; b1 = c;
          } else if (hue < 5/6) {
            r1 = x; g1 = 0; b1 = c;
          } else {
            r1 = c; g1 = 0; b1 = x;
          }
          
          r = Math.round((r1 + m) * 255);
          g = Math.round((g1 + m) * 255);
          b = Math.round((b1 + m) * 255);
          
          hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        } else {
          showMessage('Invalid HSL color format.', 'error');
          return;
        }
      } else {
        showMessage('Please enter a valid color format (HEX, RGB, or HSL).', 'error');
        return;
      }

      // Convert RGB to HSL
      const r1 = r / 255;
      const g1 = g / 255;
      const b1 = b / 255;
      
      const max = Math.max(r1, g1, b1);
      const min = Math.min(r1, g1, b1);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
          case g1: h = (b1 - r1) / d + 2; break;
          case b1: h = (r1 - g1) / d + 4; break;
        }
        h /= 6;
      }
      
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      setHexColor(hex);
      setRgbColor(`rgb(${r}, ${g}, ${b})`);
      setHslColor(`hsl(${h}, ${s}%, ${l}%)`);
      setColorPreview(hex);
      
      showMessage('Color converted successfully!', 'success');
    } catch (error) {
      console.error('Failed to convert color:', error);
      showMessage('Failed to convert color. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Color Converter</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Color Input"
                variant="outlined"
                fullWidth
                value={inputColor}
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
                placeholder="#ff0000 or rgb(255, 0, 0) or hsl(0, 100%, 50%)"
              />
              <Box textAlign="center" mt={2}>
                <Button variant="contained" color="secondary" onClick={convertColor} size="large">
                  Convert Color
                </Button>
              </Box>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: '100px', 
                  backgroundColor: colorPreview, 
                  border: '2px solid #ccc',
                  borderRadius: 1,
                  mt: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Converted Colors
              </Typography>
              <TextField
                label="HEX"
                variant="outlined"
                fullWidth
                value={hexColor}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="RGB"
                variant="outlined"
                fullWidth
                value={rgbColor}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="HSL"
                variant="outlined"
                fullWidth
                value={hslColor}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default ColorConverter; 