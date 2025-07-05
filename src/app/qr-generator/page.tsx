'use client'
import React, { useState, ChangeEvent, useRef } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, Slider } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';
import QRCode from 'qrcode';

function QRGenerator() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [inputText, setInputText] = useState('');
  const [qrSize, setQrSize] = useState(200);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const generateQR = async () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to generate QR code.', 'warning');
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Clear canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Generate QR code using the qrcode library
      await QRCode.toCanvas(canvas, inputText, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      showMessage('QR code generated successfully!', 'success');
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      showMessage('Failed to generate QR code. Please try again.', 'error');
    }
  };

  const downloadQR = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      showMessage('QR code downloaded successfully!', 'success');
    } catch (error) {
      console.error('Failed to download QR code:', error);
      showMessage('Failed to download QR code. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">QR Code Generator</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Encode"
                variant="outlined"
                fullWidth
                multiline
                minRows={8}
                maxRows={8}
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
                placeholder="Enter text, URL, or any data to encode"
              />
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography gutterBottom>QR Code Size: {qrSize}px</Typography>
                <Slider
                  value={qrSize}
                  onChange={(event, newValue) => setQrSize(newValue as number)}
                  min={100}
                  max={400}
                  step={50}
                  valueLabelDisplay="auto"
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>
              <Box textAlign="center">
                <Button variant="contained" color="secondary" onClick={generateQR} size="large" sx={{ mr: 1 }}>
                  Generate QR Code
                </Button>
                <Button variant="outlined" color="secondary" onClick={downloadQR} size="large">
                  Download
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Generated QR Code
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '300px',
                  border: '2px dashed #ccc',
                  borderRadius: 1,
                  p: 2
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    border: '1px solid #ccc',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                This QR code can be scanned by any QR code reader app.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default QRGenerator; 