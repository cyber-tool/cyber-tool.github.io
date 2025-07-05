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
  Article as ArticleIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const sampleMarkdown = `# Welcome to Markdown Editor

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- \`Inline code\`

## Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Lists
1. Numbered list item 1
2. Numbered list item 2

- Bullet point 1
- Bullet point 2

## Blockquote
> This is a blockquote

## Table
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [showPreview, setShowPreview] = useState(true);
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const handleClear = () => {
    setMarkdown('');
    showMessage('Cleared editor', 'info');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      showMessage('Copied to clipboard!', 'success');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const handleLoadSample = () => {
    setMarkdown(sampleMarkdown);
    showMessage('Loaded sample markdown', 'info');
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering (basic implementation)
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Lists
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n/g, '<br>');

    return html;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          Markdown Editor
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Write and preview Markdown content in real-time. Perfect for documentation, notes, and content creation.
        </Typography>
      </Box>

      {/* Toolbar */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleLoadSample}
          startIcon={<ArticleIcon />}
        >
          Load Sample
        </Button>
        <Button
          variant="outlined"
          onClick={handleCopy}
          startIcon={<CopyIcon />}
        >
          Copy Markdown
        </Button>
        <Button
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearIcon />}
        >
          Clear
        </Button>
        <Chip
          label={showPreview ? 'Hide Preview' : 'Show Preview'}
          onClick={() => setShowPreview(!showPreview)}
          icon={<VisibilityIcon />}
          color={showPreview ? 'primary' : 'default'}
          variant={showPreview ? 'filled' : 'outlined'}
          sx={{ cursor: 'pointer' }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Editor Section */}
        <Grid item xs={12} md={showPreview ? 6 : 12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '600px',
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
                Markdown Editor
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={25}
              variant="outlined"
              placeholder="Write your Markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Preview Section */}
        {showPreview && (
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '600px',
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
                  Live Preview
                </Typography>
              </Box>
              
              <Box
                sx={{
                  height: 'calc(100% - 60px)',
                  overflow: 'auto',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  '& h1': { fontSize: '2rem', fontWeight: 'bold', mb: 2, color: 'primary.main' },
                  '& h2': { fontSize: '1.5rem', fontWeight: 'bold', mb: 1.5, color: 'primary.main' },
                  '& h3': { fontSize: '1.25rem', fontWeight: 'bold', mb: 1, color: 'primary.main' },
                  '& p': { mb: 1, lineHeight: 1.6 },
                  '& code': { 
                    backgroundColor: 'action.hover', 
                    padding: '2px 4px', 
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.9em'
                  },
                  '& pre': { 
                    backgroundColor: 'action.hover', 
                    padding: 2, 
                    borderRadius: 1,
                    overflow: 'auto',
                    mb: 2
                  },
                  '& pre code': { backgroundColor: 'transparent', padding: 0 },
                  '& blockquote': { 
                    borderLeft: `4px solid ${theme.palette.primary.main}`, 
                    pl: 2, 
                    ml: 0,
                    fontStyle: 'italic',
                    color: 'text.secondary'
                  },
                  '& a': { color: 'primary.main', textDecoration: 'none' },
                  '& a:hover': { textDecoration: 'underline' },
                  '& li': { mb: 0.5 },
                  '& table': { 
                    borderCollapse: 'collapse', 
                    width: '100%', 
                    mb: 2 
                  },
                  '& th, & td': { 
                    border: `1px solid ${theme.palette.divider}`, 
                    padding: '8px', 
                    textAlign: 'left' 
                  },
                  '& th': { 
                    backgroundColor: 'action.hover', 
                    fontWeight: 'bold' 
                  }
                }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
              />
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Markdown Cheatsheet */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Markdown Cheatsheet
        </Typography>
        <Grid container spacing={2}>
          {[
            { syntax: '# Heading', description: 'Header 1' },
            { syntax: '## Heading', description: 'Header 2' },
            { syntax: '**bold**', description: 'Bold text' },
            { syntax: '*italic*', description: 'Italic text' },
            { syntax: '[link](url)', description: 'Create link' },
            { syntax: '`code`', description: 'Inline code' },
            { syntax: '```\ncode block\n```', description: 'Code block' },
            { syntax: '> quote', description: 'Blockquote' },
            { syntax: '- item', description: 'Bullet list' },
            { syntax: '1. item', description: 'Numbered list' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Chip
                label={`${item.syntax} - ${item.description}`}
                variant="outlined"
                sx={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8rem' }}
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
          This editor provides real-time preview of Markdown content. Use the toolbar to load samples, 
          copy content, or toggle the preview panel. Perfect for writing documentation, blog posts, and notes.
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
                Live Preview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See changes in real-time as you type
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Sample Content
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Load sample markdown to get started
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Cheatsheet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quick reference for markdown syntax
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Easy Copy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Copy markdown content instantly
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 