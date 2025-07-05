'use client'
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
  CircularProgress,
  useTheme,
  Fade,
  Divider
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Clear as ClearIcon,
  SwapHoriz as SwapIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

export default function Base64Encode() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const handleEncode = async () => {
    if (!inputText.trim()) {
      showMessage('Please enter some text to encode', 'warning');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const encoded = btoa(inputText);
      setOutputText(encoded);
      showMessage('Text encoded successfully!', 'success');
    } catch (error) {
      showMessage('Error encoding text. Please check your input.', 'error');
    } finally {
      setIsProcessing(false);
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
    setInputText(outputText);
    setOutputText('');
    showMessage('Swapped input and output', 'info');
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
          Base64 Encoder
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert your text to Base64 encoding format. Perfect for encoding binary data or special characters.
        </Typography>
      </Box>

      {/* Info Alert */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          Base64 encoding converts binary data into ASCII characters, making it safe for transmission over text-based protocols.
        </Typography>
      </Alert>

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
                Input Text
              </Typography>
              <Box>
                <Tooltip title="Clear all">
                  <IconButton
                    onClick={handleClear}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              placeholder="Enter text to encode..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }
              }}
            />
            
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleEncode}
                disabled={!inputText.trim() || isProcessing}
                startIcon={isProcessing ? <CircularProgress size={16} /> : null}
                sx={{ flex: 1 }}
              >
                {isProcessing ? 'Encoding...' : 'Encode'}
              </Button>
            </Box>
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
                Encoded Output
              </Typography>
              <Box>
                <Tooltip title="Swap input/output">
                  <IconButton
                    onClick={handleSwap}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <SwapIcon />
                  </IconButton>
                </Tooltip>
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
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              value={outputText}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  backgroundColor: 'action.hover',
                }
              }}
            />
            
            {outputText && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Output length: {outputText.length} characters
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

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
                Fast Encoding
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Instant Base64 encoding with real-time processing
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Secure
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All processing happens locally in your browser
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Easy Copy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                One-click copy to clipboard functionality
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                No Limits
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handle large amounts of text without restrictions
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
