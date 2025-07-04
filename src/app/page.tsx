'use client';
import Link from 'next/link';
import { Container, Typography, Grid, Card, CardContent, Box, useTheme } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import CachedIcon from '@mui/icons-material/Cached';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NumbersIcon from '@mui/icons-material/Numbers';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CodeIcon from '@mui/icons-material/Code';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PaletteIcon from '@mui/icons-material/Palette';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ShortTextIcon from '@mui/icons-material/ShortText';
import StraightenIcon from '@mui/icons-material/Straighten';
import StorageIcon from '@mui/icons-material/Storage';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalculateIcon from '@mui/icons-material/Calculate';
import WifiIcon from '@mui/icons-material/Wifi';
import { useThemeMode } from './layout';

const services = [
  { id: 1, name: 'Torrent To Magnet', path: 't2m', Icon: LinkIcon, description: 'Convert torrent files to magnet links' },
  { id: 2, name: 'Magnet To Torrent', path: 'm2t', Icon: CachedIcon, description: 'Convert magnet links to torrent files' },
  { id: 3, name: 'Remove Image Background', path: 'rmb', Icon: ImageIcon, description: 'Remove background from images' },
  { id: 4, name: 'Word To PDF', path: 'w2p', Icon: ArticleIcon, description: 'Convert Word documents to PDF' },
  { id: 5, name: 'PDF To Word', path: 'p2w', Icon: PictureAsPdfIcon, description: 'Convert PDF files to Word documents' },
  { id: 6, name: 'Base64 Encode', path: 'b64en', Icon: NumbersIcon, description: 'Encode text to Base64 format' },
  { id: 7, name: 'Base64 Decode', path: 'b64de', Icon: NumbersIcon, description: 'Decode Base64 text to original format' },
  { id: 8, name: 'Convert to Leet Text', path: 'toleet', Icon: FormatShapesIcon, description: 'Convert text to leet speak' },
  { id: 9, name: 'URL Encode', path: 'url-encode', Icon: CodeIcon, description: 'Encode text for URL usage' },
  { id: 10, name: 'URL Decode', path: 'url-decode', Icon: CodeIcon, description: 'Decode URL-encoded text' },
  { id: 11, name: 'Text Case Converter', path: 'text-case', Icon: TextFieldsIcon, description: 'Convert text between different cases' },
  { id: 12, name: 'Hash Generator', path: 'hash-generator', Icon: SecurityIcon, description: 'Generate cryptographic hashes' },
  { id: 13, name: 'Password Generator', path: 'password-generator', Icon: VpnKeyIcon, description: 'Generate secure passwords' },
  { id: 14, name: 'JSON Formatter', path: 'json-formatter', Icon: DataObjectIcon, description: 'Format and validate JSON data' },
  { id: 15, name: 'Color Converter', path: 'color-converter', Icon: PaletteIcon, description: 'Convert between color formats' },
  { id: 16, name: 'Text Analyzer', path: 'text-analyzer', Icon: AnalyticsIcon, description: 'Analyze text statistics and metrics' },
  { id: 17, name: 'QR Code Generator', path: 'qr-generator', Icon: QrCodeIcon, description: 'Generate QR codes from text' },
  { id: 18, name: 'URL Shortener', path: 'url-shortener', Icon: ShortTextIcon, description: 'Create short, shareable links' },
  { id: 19, name: 'Unit Converter', path: 'unit-converter', Icon: StraightenIcon, description: 'Convert between different units' },
  { id: 20, name: 'File Size Converter', path: 'file-size-converter', Icon: StorageIcon, description: 'Convert file size units' },
  { id: 21, name: 'Emoji Converter', path: 'emoji-converter', Icon: EmojiEmotionsIcon, description: 'Convert text to emojis' },
  { id: 22, name: 'Roman Numeral', path: 'roman-numeral', Icon: CalculateIcon, description: 'Convert decimal to Roman numerals' },
  { id: 23, name: 'Morse Code', path: 'morse-code', Icon: WifiIcon, description: 'Convert text to Morse code' },
  { id: 24, name: 'Binary Converter', path: 'binary-converter', Icon: NumbersIcon, description: 'Convert between number systems' },
  { id: 25, name: 'Text Diff Checker', path: 'text-diff', Icon: TextFieldsIcon, description: 'Compare and find differences in text' },
  { id: 26, name: 'Markdown Editor', path: 'markdown-editor', Icon: ArticleIcon, description: 'Edit and preview Markdown' },
  { id: 27, name: 'CSV to JSON', path: 'csv-to-json', Icon: DataObjectIcon, description: 'Convert CSV data to JSON format' },
];

function MainPage() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            mb: 3, 
            color: 'primary.main',
            fontWeight: 'bold',
            textShadow: mode === 'light' ? '2px 2px 4px rgba(0,0,0,0.1)' : '2px 2px 4px rgba(0,0,0,0.3)',
            '@media (max-width: 600px)': {
              fontSize: '2rem',
            }
          }}
        >
          Welcome to Cyber Tool
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Your comprehensive toolkit for file conversion, text processing, and utility tools
        </Typography>
      </Box>

      {/* Tools Grid */}
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
            <Link href={`/${service.path}`} passHref style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: mode === 'light' 
                      ? '0 12px 24px rgba(0,0,0,0.15)' 
                      : '0 12px 24px rgba(0,0,0,0.4)',
                    borderColor: 'primary.main',
                    '& .service-icon': {
                      transform: 'scale(1.1)',
                      color: 'primary.main',
                    },
                    '& .service-name': {
                      color: 'primary.main',
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #fab505, #ff6b35)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::before': {
                    transform: 'scaleX(1)',
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    textAlign: 'center',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px'
                  }}
                >
                  <Box
                    className="service-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: mode === 'light' 
                        ? 'rgba(250, 181, 5, 0.1)' 
                        : 'rgba(250, 181, 5, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <service.Icon 
                      sx={{ 
                        fontSize: 40, 
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                      }} 
                    />
                  </Box>
                  <Typography 
                    className="service-name"
                    gutterBottom 
                    variant="h6" 
                    component="h2" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 1,
                      transition: 'color 0.3s ease',
                      '@media (max-width: 600px)': {
                        fontSize: '1rem',
                      }
                    }}
                  >
                    {service.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      lineHeight: 1.4,
                      fontSize: '0.875rem'
                    }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', mt: 6, pt: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">
          All tools are designed for ease of use and maximum efficiency
        </Typography>
      </Box>
    </Container>
  );
}

export default MainPage;
