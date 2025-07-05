'use client'
import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Paper, useTheme, Card, CardContent } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvider';

function TextAnalyzer() {
  const theme = useTheme();
  const { showMessage } = useSnackbar();

  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const analyzeText = () => {
    try {
      if (!inputText.trim()) {
        showMessage('Please enter some text to analyze.', 'warning');
        return;
      }
      
      const text = inputText;
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
      const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
      
      // Character analysis
      const totalChars = text.length;
      const charsWithoutSpaces = text.replace(/\s/g, '').length;
      const letters = text.replace(/[^a-zA-Z]/g, '').length;
      const numbers = text.replace(/[^0-9]/g, '').length;
      const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;
      
      // Word analysis
      const wordCount = words.length;
      const uniqueWords = new Set(words.map(word => word.toLowerCase())).size;
      const avgWordLength = wordCount > 0 ? (letters / wordCount).toFixed(1) : 0;
      
      // Reading time (average 200 words per minute)
      const readingTimeMinutes = Math.ceil(wordCount / 200);
      const readingTimeSeconds = Math.round((wordCount / 200) * 60);
      
      // Most common words
      const wordFreq: { [key: string]: number } = {};
      words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^a-zA-Z]/g, '');
        if (cleanWord.length > 0) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });
      
      const sortedWords = Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([word, count]) => ({ word, count }));
      
      const result = {
        characters: {
          total: totalChars,
          withoutSpaces: charsWithoutSpaces,
          letters,
          numbers,
          specialChars
        },
        words: {
          total: wordCount,
          unique: uniqueWords,
          averageLength: avgWordLength
        },
        structure: {
          sentences: sentences.length,
          paragraphs: paragraphs.length,
          lines: text.split('\n').length
        },
        reading: {
          minutes: readingTimeMinutes,
          seconds: readingTimeSeconds
        },
        commonWords: sortedWords
      };
      
      setAnalysis(result);
      showMessage('Text analyzed successfully!', 'success');
    } catch (error) {
      console.error('Failed to analyze text:', error);
      showMessage('Failed to analyze text. Please try again.', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <hr/>
          <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Text Analyzer</Typography>
        <hr/>
        <br/>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Text to Analyze"
                variant="outlined"
                fullWidth
                multiline
                minRows={15}
                maxRows={15}
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
                placeholder="Enter text here to analyze"
              />
              <Box textAlign="center" mt={2}>
                <Button variant="contained" color="secondary" onClick={analyzeText} size="large">
                  Analyze Text
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {analysis ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Analysis Results
                  </Typography>
                  
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Characters</Typography>
                      <Typography>Total: {analysis.characters.total}</Typography>
                      <Typography>Without spaces: {analysis.characters.withoutSpaces}</Typography>
                      <Typography>Letters: {analysis.characters.letters}</Typography>
                      <Typography>Numbers: {analysis.characters.numbers}</Typography>
                      <Typography>Special characters: {analysis.characters.specialChars}</Typography>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Words</Typography>
                      <Typography>Total: {analysis.words.total}</Typography>
                      <Typography>Unique: {analysis.words.unique}</Typography>
                      <Typography>Average length: {analysis.words.averageLength}</Typography>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Structure</Typography>
                      <Typography>Sentences: {analysis.structure.sentences}</Typography>
                      <Typography>Paragraphs: {analysis.structure.paragraphs}</Typography>
                      <Typography>Lines: {analysis.structure.lines}</Typography>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Reading Time</Typography>
                      <Typography>~{analysis.reading.minutes} minute{analysis.reading.minutes !== 1 ? 's' : ''} ({analysis.reading.seconds} seconds)</Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Most Common Words</Typography>
                      {analysis.commonWords.map((item: any, index: number) => (
                        <Typography key={index}>
                          {item.word}: {item.count} time{item.count !== 1 ? 's' : ''}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Analysis results will appear here
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default TextAnalyzer; 