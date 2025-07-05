"use client";
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Tooltip
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Article as ArticleIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Analytics as AnalyticsIcon,
  QrCode as QrCodeIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useThemeMode } from '../app/layout';

const navigationItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Torrent Tools', path: '/t2m', icon: LinkIcon, category: 'File Conversion' },
  { name: 'Image Tools', path: '/rmb', icon: ImageIcon, category: 'File Conversion' },
  { name: 'Document Tools', path: '/w2p', icon: ArticleIcon, category: 'File Conversion' },
  { name: 'Text Tools', path: '/b64en', icon: CodeIcon, category: 'Text Processing' },
  { name: 'Security Tools', path: '/hash-generator', icon: SecurityIcon, category: 'Security' },
  { name: 'Design Tools', path: '/color-converter', icon: PaletteIcon, category: 'Design' },
  { name: 'Analytics', path: '/text-analyzer', icon: AnalyticsIcon, category: 'Analytics' },
  { name: 'QR Generator', path: '/qr-generator', icon: QrCodeIcon, category: 'Utilities' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter tools
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const filteredItems = searchQuery 
    ? navigationItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : navigationItems;

  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const drawer = (
    <Box sx={{ width: 280, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          Cyber Tool
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggleMode} size="small">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </form>

      <Divider sx={{ mb: 2 }} />

      {Object.entries(groupedItems).map(([category, items]) => (
        <Box key={category} sx={{ mb: 3 }}>
          <Chip 
            label={category} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ mb: 1, fontSize: '0.75rem' }}
          />
          <List dense>
            {items.map((item) => (
              <ListItem 
                key={item.path} 
                component={Link} 
                href={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <item.icon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.dark',
                  }
                }}
              >
                Cyber Tool
              </Typography>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.slice(0, 6).map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  startIcon={<item.icon />}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Right side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dark mode toggle */}
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton
                onClick={toggleMode}
                sx={{ 
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
