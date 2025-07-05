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
  EmojiEmotions as EmojiIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const emojiMap: { [key: string]: string } = {
  'happy': '😊', 'sad': '😢', 'love': '❤️', 'heart': '❤️', 'smile': '😊',
  'laugh': '😂', 'cry': '😭', 'angry': '😠', 'cool': '😎', 'wink': '😉',
  'kiss': '😘', 'surprised': '😲', 'confused': '😕', 'sleepy': '😴', 'sick': '🤒',
  'fire': '🔥', 'star': '⭐', 'sun': '☀️', 'moon': '🌙', 'rain': '🌧️',
  'snow': '❄️', 'thunder': '⚡', 'cloud': '☁️', 'flower': '🌸', 'tree': '🌳',
  'cat': '🐱', 'dog': '🐕', 'bird': '🐦', 'fish': '🐟', 'pizza': '🍕',
  'coffee': '☕', 'beer': '🍺', 'wine': '🍷', 'cake': '🎂', 'ice cream': '🍦',
  'music': '🎵', 'guitar': '🎸', 'piano': '🎹', 'drum': '🥁', 'microphone': '🎤',
  'phone': '📱', 'computer': '💻', 'laptop': '💻', 'tablet': '📱', 'camera': '📷',
  'book': '📚', 'pen': '✏️', 'pencil': '✏️', 'paper': '📄', 'envelope': '✉️',
  'car': '🚗', 'bus': '🚌', 'train': '🚂', 'plane': '✈️', 'bike': '🚲',
  'house': '🏠', 'building': '🏢', 'school': '🏫', 'hospital': '🏥', 'bank': '🏦',
  'money': '💰', 'dollar': '💵', 'euro': '💶', 'pound': '💷', 'yen': '💴',
  'clock': '🕐', 'time': '⏰', 'calendar': '📅', 'date': '📅', 'watch': '⌚',
  'gift': '🎁', 'party': '🎉', 'balloon': '🎈', 'cake': '🎂', 'present': '🎁',
  'game': '🎮', 'controller': '🎮', 'dice': '🎲', 'cards': '🃏', 'chess': '♟️',
  'sport': '⚽', 'football': '⚽', 'basketball': '🏀', 'tennis': '🎾', 'golf': '⛳',
  'flag': '🏁', 'trophy': '🏆', 'medal': '🏅', 'crown': '👑', 'star': '⭐'
};

export default function EmojiConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'text-to-emoji' | 'emoji-to-text'>('text-to-emoji');
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const convertTextToEmoji = (text: string) => {
    const words = text.toLowerCase().split(/\s+/);
    return words.map(word => {
      // Remove punctuation for matching
      const cleanWord = word.replace(/[^\w]/g, '');
      return emojiMap[cleanWord] || word;
    }).join(' ');
  };

  const convertEmojiToText = (text: string) => {
    let result = text;
    Object.entries(emojiMap).forEach(([word, emoji]) => {
      result = result.replace(new RegExp(emoji, 'g'), word);
    });
    return result;
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      showMessage('Please enter some text', 'warning');
      return;
    }

    try {
      if (mode === 'text-to-emoji') {
        const converted = convertTextToEmoji(inputText);
        setOutputText(converted);
        showMessage('Text converted to emojis!', 'success');
      } else {
        const converted = convertEmojiToText(inputText);
        setOutputText(converted);
        showMessage('Emojis converted to text!', 'success');
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
    setMode(mode === 'text-to-emoji' ? 'emoji-to-text' : 'text-to-emoji');
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
          Emoji Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert text to emojis and vice versa. Make your messages more expressive and fun!
        </Typography>
      </Box>

      {/* Mode Selection */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label="Text to Emoji"
            onClick={() => setMode('text-to-emoji')}
            color={mode === 'text-to-emoji' ? 'primary' : 'default'}
            variant={mode === 'text-to-emoji' ? 'filled' : 'outlined'}
            icon={<EmojiIcon />}
            sx={{ cursor: 'pointer' }}
          />
          <Chip
            label="Emoji to Text"
            onClick={() => setMode('emoji-to-text')}
            color={mode === 'emoji-to-text' ? 'primary' : 'default'}
            variant={mode === 'emoji-to-text' ? 'filled' : 'outlined'}
            icon={<EmojiIcon />}
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
                {mode === 'text-to-emoji' ? 'Input Text' : 'Input Emojis'}
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
              placeholder={mode === 'text-to-emoji' ? 'Enter text to convert to emojis...' : 'Enter emojis to convert to text...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                }
              }}
            />
            
            <Button
              variant="contained"
              onClick={handleConvert}
              disabled={!inputText.trim()}
              startIcon={<EmojiIcon />}
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
                {mode === 'text-to-emoji' ? 'Emoji Output' : 'Text Output'}
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
                  fontSize: '1.1rem',
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

      {/* Common Emojis */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Common Emojis
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(emojiMap).slice(0, 20).map(([word, emoji]) => (
            <Chip
              key={word}
              label={`${word} ${emoji}`}
              onClick={() => {
                if (mode === 'text-to-emoji') {
                  setInputText(prev => prev + (prev ? ' ' : '') + word);
                } else {
                  setInputText(prev => prev + emoji);
                }
              }}
              variant="outlined"
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>

      {/* Info Section */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mt: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          This tool converts common words to emojis and vice versa. 
          Not all words have emoji equivalents, so some text may remain unchanged.
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
                Convert text to emojis and emojis to text
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Common Words
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supports hundreds of common words and emojis
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
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Fun & Expressive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Make your messages more engaging
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 