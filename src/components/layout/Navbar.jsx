import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  TextField, 
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Stack,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  FilterList as FilterListIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useRecetas } from '../../contexts/RecetasContext';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    favoritos,
    getCategorias,
    getDificultades,
    darkMode,
    toggleDarkMode,
  } = useRecetas();
  const { user, isAuthenticated, logout } = useAuth();

  const [anchorCategoria, setAnchorCategoria] = useState(null);
  const [anchorDificultad, setAnchorDificultad] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const categorias = getCategorias();
  const dificultades = getDificultades();

  const handleCategoryClick = (event) => {
    setAnchorCategoria(event.currentTarget);
  };

  const handleDifficultyClick = (event) => {
    setAnchorDificultad(event.currentTarget);
  };

  const handleCategorySelect = (categoria) => {
    setCategoryFilter(categoria === categoryFilter ? '' : categoria);
    setAnchorCategoria(null);
  };

  const handleDifficultySelect = (dificultad) => {
    setDifficultyFilter(dificultad === difficultyFilter ? '' : dificultad);
    setAnchorDificultad(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Recetas', path: '/recetas' },
    { label: `Favoritos (${favoritos.length})`, path: '/favoritos' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        animation: 'slideDown 0.3s ease-in-out',
        '@keyframes slideDown': {
          from: {
            transform: 'translateY(-100%)',
            opacity: 0,
          },
          to: {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, display: 'flex', gap: 1 }}>
          {/* Logo */}
          <Tooltip title="Ir a inicio">
            <Box
              onClick={() => handleNavigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                userSelect: 'none',
              }}
            >
              <MenuBookIcon sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
              {!isMobile && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  Recetas
                </Typography>
              )}
            </Box>
          </Tooltip>

          {/* Search Bar */}
          {!isMobile && location.pathname === '/recetas' && (
            <TextField
              size="small"
              placeholder="Buscar recetas..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                ml: 2,
                backgroundColor: 'background.default',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              }}
            />
          )}

          <Box sx={{ flex: 1 }} />

          {/* Desktop Menu */}
          {!isMobile && (
            <Stack direction="row" spacing={1} alignItems="center">
              {location.pathname === '/recetas' && (
                <>
                  {/* Category Filter */}
                  <Button
                    startIcon={<FilterListIcon />}
                    onClick={handleCategoryClick}
                    variant={categoryFilter ? 'contained' : 'text'}
                    size="small"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {categoryFilter || 'Categoría'}
                  </Button>
                  <Menu
                    anchorEl={anchorCategoria}
                    open={Boolean(anchorCategoria)}
                    onClose={() => setAnchorCategoria(null)}
                  >
                    <MenuItem onClick={() => handleCategorySelect('')}>Todas</MenuItem>
                    {categorias.map((cat) => (
                      <MenuItem
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        selected={categoryFilter === cat}
                      >
                        {cat}
                      </MenuItem>
                    ))}
                  </Menu>

                  {/* Difficulty Filter */}
                  <Button
                    startIcon={<FilterListIcon />}
                    onClick={handleDifficultyClick}
                    variant={difficultyFilter ? 'contained' : 'text'}
                    size="small"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {difficultyFilter || 'Dificultad'}
                  </Button>
                  <Menu
                    anchorEl={anchorDificultad}
                    open={Boolean(anchorDificultad)}
                    onClose={() => setAnchorDificultad(null)}
                  >
                    <MenuItem onClick={() => handleDifficultySelect('')}>Todas</MenuItem>
                    {dificultades.map((dif) => (
                      <MenuItem
                        key={dif}
                        onClick={() => handleDifficultySelect(dif)}
                        selected={difficultyFilter === dif}
                      >
                        {dif}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Favorites Badge */}
              <Tooltip title="Mis Favoritos">
                <Badge badgeContent={favoritos.length} color="primary">
                  <IconButton
                    onClick={() => navigate('/favoritos')}
                    size="small"
                    sx={{
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Badge>
              </Tooltip>

              {/* Dark Mode Toggle */}
              <Tooltip title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}>
                <IconButton
                  onClick={toggleDarkMode}
                  size="small"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'rotate(20deg)',
                    },
                  }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>

              {/* Auth Button */}
              {isAuthenticated() ? (
                <Tooltip title="Mi Perfil">
                  <IconButton
                    onClick={() => navigate('/profile')}
                    size="small"
                    sx={{
                      backgroundColor: '#f0f9ff',
                      color: '#0891b2',
                      '&:hover': {
                        backgroundColor: '#e0f2fe',
                      },
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#0891b2',
                    color: '#0891b2',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#06b6d4',
                      backgroundColor: '#f0f9ff',
                    },
                  }}
                >
                  Iniciar Sesión
                </Button>
              )}
            </Stack>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}>
                <IconButton
                  onClick={toggleDarkMode}
                  size="small"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'rotate(20deg)',
                    },
                  }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
              <Badge badgeContent={favoritos.length} color="primary">
                <IconButton size="small" onClick={() => navigate('/favoritos')}>
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                size="small"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Stack>
          )}
        </Toolbar>

        {/* Mobile Search Bar */}
        {isMobile && location.pathname === '/recetas' && (
          <Box sx={{ pb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar recetas..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'background.default',
                borderRadius: 1,
              }}
            />
          </Box>
        )}
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: '100%', p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={location.pathname === item.path}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {location.pathname === '/recetas' && (
              <>
                <ListItem>
                  <ListItemText primary="Categoría" />
                </ListItem>
                {categorias.map((cat) => (
                  <ListItem key={cat} disablePadding>
                    <ListItemButton
                      onClick={() => handleCategorySelect(cat)}
                      selected={categoryFilter === cat}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={cat} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="Dificultad" />
                </ListItem>
                {dificultades.map((dif) => (
                  <ListItem key={dif} disablePadding>
                    <ListItemButton
                      onClick={() => handleDifficultySelect(dif)}
                      selected={difficultyFilter === dif}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={dif} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}