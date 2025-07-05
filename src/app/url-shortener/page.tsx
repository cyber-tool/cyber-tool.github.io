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
  CircularProgress,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Clear as ClearIcon,
  Link as LinkIcon,
  Info as InfoIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

interface ShortenedUrl {
  id: string;
  original: string;
  shortened: string;
  timestamp: number;
}

export default function UrlShortener() {
  const [inputUrl, setInputUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const generateShortUrl = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      showMessage('Please enter a URL to shorten', 'warning');
      return;
    }

    // Basic URL validation
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      new URL(url);
    } catch {
      showMessage('Please enter a valid URL', 'error');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const shortened = generateShortUrl();
      const newShortenedUrl: ShortenedUrl = {
        id: Date.now().toString(),
        original: url,
        shortened: `https://short.url/${shortened}`,
        timestamp: Date.now()
      };

      setShortenedUrls(prev => [newShortenedUrl, ...prev]);
      setInputUrl('');
      showMessage('URL shortened successfully!', 'success');
    } catch (error) {
      showMessage('Error shortening URL. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
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

  const handleClear = () => {
    setInputUrl('');
    showMessage('Cleared input', 'info');
  };

  const handleDelete = (id: string) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
    showMessage('URL removed from history', 'info');
  };

  const clearHistory = () => {
    setShortenedUrls([]);
    showMessage('History cleared', 'info');
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
          URL Shortener
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Create short, shareable links for your long URLs. Perfect for social media and messaging.
        </Typography>
      </Box>

      {/* Info Alert */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mb: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          This tool generates short URLs for easy sharing. All URLs are processed locally in your browser.
        </Typography>
      </Alert>

      <Grid container spacing={4}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: 'fit-content',
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
                Shorten URL
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
              variant="outlined"
              placeholder="Enter your long URL here..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleShorten}
              disabled={!inputUrl.trim() || isProcessing}
              startIcon={isProcessing ? <CircularProgress size={16} /> : <LinkIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              {isProcessing ? 'Shortening...' : 'Shorten URL'}
            </Button>

            <Typography variant="caption" color="text.secondary">
              Enter any valid URL to create a shortened version
            </Typography>
          </Paper>
        </Grid>

        {/* History Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: 'fit-content',
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
                Recent URLs
              </Typography>
              {shortenedUrls.length > 0 && (
                <Button
                  size="small"
                  onClick={clearHistory}
                  sx={{ color: 'text.secondary' }}
                >
                  Clear All
                </Button>
              )}
            </Box>
            
            {shortenedUrls.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <LinkIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  No shortened URLs yet. Create your first one!
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {shortenedUrls.map((url, index) => (
                  <Box key={url.id}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {url.shortened}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                            {url.original}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Copy shortened URL">
                            <IconButton
                              size="small"
                              onClick={() => handleCopy(url.shortened)}
                              sx={{ color: 'text.secondary' }}
                            >
                              <CopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(url.id)}
                              sx={{ color: 'text.secondary' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < shortenedUrls.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
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
                Instant Shortening
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create short URLs instantly with just one click
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                URL History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep track of your recently shortened URLs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Easy Copy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Copy shortened URLs to clipboard with one click
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Privacy First
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All processing happens locally in your browser
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 