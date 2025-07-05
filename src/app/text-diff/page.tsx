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
  Compare as CompareIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

interface DiffResult {
  added: string[];
  removed: string[];
  unchanged: string[];
}

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const simpleDiff = (text1: string, text2: string): DiffResult => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const added: string[] = [];
    const removed: string[] = [];
    const unchanged: string[] = [];
    
    const maxLength = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        unchanged.push(line1);
      } else {
        if (line1) removed.push(line1);
        if (line2) added.push(line2);
      }
    }
    
    return { added, removed, unchanged };
  };

  const handleCompare = () => {
    if (!text1.trim() && !text2.trim()) {
      showMessage('Please enter text to compare', 'warning');
      return;
    }

    try {
      const result = simpleDiff(text1, text2);
      setDiffResult(result);
      showMessage('Comparison completed!', 'success');
    } catch (error) {
      showMessage('Error during comparison', 'error');
    }
  };

  const handleClear = () => {
    setText1('');
    setText2('');
    setDiffResult(null);
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

  const getSimilarityPercentage = () => {
    if (!diffResult) return 0;
    const totalLines = diffResult.added.length + diffResult.removed.length + diffResult.unchanged.length;
    if (totalLines === 0) return 100;
    return Math.round((diffResult.unchanged.length / totalLines) * 100);
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
          Text Diff Checker
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Compare two texts and find the differences. Perfect for code reviews and document comparison.
        </Typography>
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
                Text 1
              </Typography>
              <Tooltip title="Clear text">
                <IconButton
                  onClick={() => setText1('')}
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
              rows={12}
              variant="outlined"
              placeholder="Enter first text here..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Input Section 2 */}
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
                Text 2
              </Typography>
              <Tooltip title="Clear text">
                <IconButton
                  onClick={() => setText2('')}
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
              rows={12}
              variant="outlined"
              placeholder="Enter second text here..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Compare Button */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleCompare}
          disabled={!text1.trim() && !text2.trim()}
          startIcon={<CompareIcon />}
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Compare Texts
        </Button>
      </Box>

      {/* Results Section */}
      {diffResult && (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" gutterBottom color="primary.main">
            Comparison Results
          </Typography>
          
          {/* Similarity Score */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Typography variant="body1" color="text.primary">
              Similarity: <strong>{getSimilarityPercentage()}%</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {diffResult.unchanged.length} lines unchanged, {diffResult.added.length} added, {diffResult.removed.length} removed
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Added Lines */}
            {diffResult.added.length > 0 && (
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2, color: 'white' }}>
                  <Typography variant="h6" gutterBottom>
                    Added Lines ({diffResult.added.length})
                  </Typography>
                  <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {diffResult.added.map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                        + {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Removed Lines */}
            {diffResult.removed.length > 0 && (
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 2, color: 'white' }}>
                  <Typography variant="h6" gutterBottom>
                    Removed Lines ({diffResult.removed.length})
                  </Typography>
                  <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                    {diffResult.removed.map((line, index) => (
                      <Typography key={index} variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                        - {line}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Unchanged Lines */}
          {diffResult.unchanged.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Unchanged Lines ({diffResult.unchanged.length})
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, maxHeight: 200, overflow: 'auto' }}>
                {diffResult.unchanged.map((line, index) => (
                  <Typography key={index} variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      )}

      {/* Info Section */}
      <Alert 
        severity="info" 
        icon={<InfoIcon />}
        sx={{ mt: 4, borderRadius: 2 }}
      >
        <Typography variant="body2">
          This tool compares two texts line by line and shows added, removed, and unchanged lines.
          Perfect for comparing code, documents, or any text content.
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
                Line-by-Line
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compare texts line by line for accuracy
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Visual Diff
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Color-coded added and removed lines
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Similarity Score
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Percentage of similarity between texts
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Monospace Font
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perfect for code and structured text
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 