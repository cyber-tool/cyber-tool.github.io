'use client'
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, LinearProgress, Typography, TextField, IconButton, Tooltip, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function TorrentToMagnet() {

  const theme = useTheme();

 const [file, setFile] = useState<File | null>(null);
 const [magnetLink, setMagnetLink] = useState('');
 const [uploading, setUploading] = useState(false);

 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    if (!file) {
      alert('Please select a file first.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://' + process.env.NEXT_PUBLIC_API_DOMAIN + '/t2m', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMagnetLink(result.magnet_link);
      } else {
        alert(result.error || 'An error occurred while converting the file.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setUploading(false);
    }
 };

 const handleCopy = async () => {
    if (magnetLink) {
      await navigator.clipboard.writeText(magnetLink);
      // alert('Copied to clipboard!');
    }
 };

 return (
    <Box>
      <br/>
      <hr/>
        <Typography align='center' sx={{ color: 'primary.main' }} variant="h3">Torrent to Magnet</Typography>
      <hr/>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Convert Torrent to Magnet
            </Typography>
            {uploading && <LinearProgress />}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <input
                accept=".torrent"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" color="secondary" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2 }}>
                 Upload Torrent
                </Button>
              </label>
              <Typography variant="body2">{file ? `File: ${file.name}` : 'No file selected'}</Typography>
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, display: 'block' }}>
                Convert
              </Button>
            </form>
          </CardContent>
        </Card>
        {magnetLink && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Magnet Link"
            variant="outlined"
            value={magnetLink}
            multiline
            rows={4}
            sx={{
              mt: 2,
              '& .MuiInputBase-input': {
                color: theme.palette.secondary.text,
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.secondary.contrastText,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.contrastText,
              },
            }}
            InputProps={{
              endAdornment: (
                <Tooltip title="Copy">
                 <IconButton sx={{color:"#ffffff"}} onClick={handleCopy}>
                    <FileCopyIcon />
                 </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Box>
      )}
      </Container>
    </Box>
 );
}

export default TorrentToMagnet;
