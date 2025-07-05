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
  Chip,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Clear as ClearIcon,
  Info as InfoIcon,
  DataObject as DataObjectIcon
} from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';

const sampleCSV = `Name,Age,City,Email
John Doe,30,New York,john@example.com
Jane Smith,25,Los Angeles,jane@example.com
Bob Johnson,35,Chicago,bob@example.com`;

export default function CsvToJson() {
  const [csvInput, setCsvInput] = useState(sampleCSV);
  const [jsonOutput, setJsonOutput] = useState('');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const { showMessage } = useSnackbar();
  const theme = useTheme();

  const csvToJson = (csv: string, includeHeaders: boolean = true): string => {
    try {
      const lines = csv.trim().split('\n');
      if (lines.length === 0) return '[]';

      const headers = includeHeaders ? lines[0].split(',').map(h => h.trim()) : [];
      const data = includeHeaders ? lines.slice(1) : lines;

      const jsonArray = data.map(line => {
        const values = line.split(',').map(v => v.trim());
        if (includeHeaders) {
          const obj: { [key: string]: string } = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || '';
          });
          return obj;
        } else {
          return values;
        }
      });

      return prettyPrint ? JSON.stringify(jsonArray, null, 2) : JSON.stringify(jsonArray);
    } catch (error) {
      throw new Error('Invalid CSV format');
    }
  };

  const handleConvert = () => {
    if (!csvInput.trim()) {
      showMessage('Please enter CSV data', 'warning');
      return;
    }

    try {
      const converted = csvToJson(csvInput, includeHeaders);
      setJsonOutput(converted);
      showMessage('CSV converted to JSON!', 'success');
    } catch (error) {
      showMessage('Error converting CSV to JSON', 'error');
    }
  };

  const handleClear = () => {
    setCsvInput('');
    setJsonOutput('');
    showMessage('Cleared all data', 'info');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('Copied to clipboard!', 'success');
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const handleLoadSample = () => {
    setCsvInput(sampleCSV);
    setJsonOutput('');
    showMessage('Loaded sample CSV', 'info');
  };

  const validateCSV = (csv: string): boolean => {
    const lines = csv.trim().split('\n');
    if (lines.length === 0) return false;
    
    const firstLine = lines[0];
    const columnCount = firstLine.split(',').length;
    
    return lines.every(line => line.split(',').length === columnCount);
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
          CSV to JSON Converter
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Convert CSV data to JSON format. Perfect for data processing and API integration.
        </Typography>
      </Box>

      {/* Options */}
      <Box sx={{ mb: 3, display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
            />
          }
          label="Include Headers"
        />
        <FormControlLabel
          control={
            <Switch
              checked={prettyPrint}
              onChange={(e) => setPrettyPrint(e.target.checked)}
            />
          }
          label="Pretty Print"
        />
        <Button
          variant="outlined"
          onClick={handleLoadSample}
          startIcon={<DataObjectIcon />}
        >
          Load Sample
        </Button>
        <Button
          variant="outlined"
          onClick={handleClear}
          startIcon={<ClearIcon />}
        >
          Clear
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* CSV Input */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '500px',
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
                CSV Input
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!validateCSV(csvInput) && csvInput.trim() && (
                  <Chip label="Invalid CSV" color="error" size="small" />
                )}
              </Box>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={20}
              variant="outlined"
              placeholder="Enter CSV data here..."
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
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

        {/* JSON Output */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '500px',
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
                JSON Output
              </Typography>
              {jsonOutput && (
                <Tooltip title="Copy JSON">
                  <IconButton
                    onClick={() => handleCopy(jsonOutput)}
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
              rows={20}
              variant="outlined"
              value={jsonOutput}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  backgroundColor: 'action.hover',
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Convert Button */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleConvert}
          disabled={!csvInput.trim() || !validateCSV(csvInput)}
          startIcon={<DataObjectIcon />}
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Convert to JSON
        </Button>
      </Box>

      {/* CSV Format Guide */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          CSV Format Guide
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: 'Headers', example: 'Name,Age,City', description: 'First row contains column names' },
            { title: 'Data Rows', example: 'John,30,NYC', description: 'Each row represents one record' },
            { title: 'Comma Separated', example: 'value1,value2,value3', description: 'Values separated by commas' },
            { title: 'No Spaces', example: 'John,30,NYC', description: 'Avoid spaces around commas' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="primary.main" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                  {item.example}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
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
          This converter transforms CSV data into JSON format. Choose whether to include headers as object keys 
          and whether to format the JSON output for readability. Perfect for data processing and API integration.
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
                Header Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Include or exclude CSV headers
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Pretty Print
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Format JSON for readability
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Validation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Validate CSV format before conversion
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Sample Data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Load sample CSV to get started
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 