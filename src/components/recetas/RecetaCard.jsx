import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  IconButton,
  Tooltip,
  Rating,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useRecetas } from '../../contexts/RecetasContext';
import RecetaImageModal from './RecetaImageModal';
import { useState } from 'react';

export default function RecetaCard({ receta }) {
  const navigate = useNavigate();
  const { isFavorito, toggleFavorito, getRating, setRating } = useRecetas();
  const [showRating, setShowRating] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const es_favorito = isFavorito(receta.id);
  const rating = getRating(receta.id);

  const getDificultadColor = (dificultad) => {
    if (dificultad === 'Fácil') return 'success';
    if (dificultad === 'Media') return 'warning';
    return 'error';
  };

  const handleVerReceta = () => {
    navigate(`/recetas/${receta.id}`);
  };

  const handleToggleFavorito = (e) => {
    e.stopPropagation();
    toggleFavorito(receta.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const texto = `Mira esta deliciosa receta: ${receta.titulo}`;
    const url = `${window.location.origin}/recetas/${receta.id}`;

    // Intentar usar Web Share API si está disponible
    if (navigator.share) {
      navigator.share({
        title: receta.titulo,
        text: receta.descripcion,
        url: url,
      }).catch((err) => console.log('Error al compartir:', err));
    } else {
      // Fallback: copiar al portapapeles
      const textoCompleto = `${texto}\n${url}`;
      navigator.clipboard.writeText(textoCompleto).then(() => {
        alert('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        alert(`Comparte: ${textoCompleto}`);
      });
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: '#e2e8f0',
        boxShadow: 'none',
        '&:hover': {
          borderColor: '#06b6d4',
          boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
        },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Favorito Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          animation: es_favorito ? 'heartBeat 0.6s ease-in-out' : 'none',
          '@keyframes heartBeat': {
            '0%, 100%': { transform: 'scale(1)' },
            '25%': { transform: 'scale(1.3)' },
            '50%': { transform: 'scale(1.1)' },
          },
        }}
      >
        <Tooltip title={es_favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
          <IconButton
            size="small"
            onClick={handleToggleFavorito}
            sx={{
              backgroundColor: es_favorito ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #e2e8f0',
              '&:hover': {
                backgroundColor: es_favorito ? 'rgba(239, 68, 68, 1)' : '#f0f9ff',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {es_favorito ? (
              <FavoriteIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: '1.2rem', color: '#64748b' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Imagen con Modal */}
      <RecetaImageModal 
        image={receta.imagen}
        title={receta.titulo}
        onViewRecipe={handleVerReceta}
      />

      {/* Contenido */}
      <CardContent sx={{ flexGrow: 1, p: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'color 0.2s ease-in-out',
            fontSize: '0.95rem',
            '&:hover': {
              color: 'primary.main',
            },
          }}
          onClick={handleVerReceta}
        >
          {receta.titulo}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2rem',
            flex: 1,
            fontSize: '0.85rem',
          }}
        >
          {receta.descripcion}
        </Typography>

        {/* Chips de información */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            mb: 0.5,
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          <Chip
            icon={<AccessTimeIcon />}
            label={receta.tiempoPreparacion}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: 'background.default',
            }}
          />
          <Chip
            icon={<LocalFireDepartmentIcon />}
            label={receta.dificultad}
            size="small"
            color={getDificultadColor(receta.dificultad)}
            variant="filled"
          />
        </Stack>

        {/* Porciones */}
        <Chip
          icon={<PeopleIcon />}
          label={`${receta.porciones} porciones`}
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: 'background.default',
            mb: 0.5,
          }}
        />

        {/* Rating */}
        {!isMobile && (
          <Box
            sx={{
              mt: 0.5,
              pt: 0.5,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
            onMouseEnter={() => setShowRating(true)}
            onMouseLeave={() => setShowRating(false)}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              Calificación
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => {
                setRating(receta.id, newValue);
              }}
              size="small"
              sx={{
                transition: 'all 0.2s ease-in-out',
              }}
            />
          </Box>
        )}
      </CardContent>

      {/* Acciones */}
      <CardActions sx={{ pt: 0.5, pb: 1, px: 1.5, gap: 0.5 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleVerReceta}
          sx={{
            backgroundColor: '#0891b2',
            fontWeight: 500,
            transition: 'all 0.2s ease-in-out',
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#06b6d4',
            },
          }}
        >
          {isMobile ? 'Ver' : 'Ver Receta'}
        </Button>
        <Tooltip title="Compartir">
          <IconButton
            size="small"
            onClick={handleShare}
            sx={{
              transition: 'all 0.2s ease-in-out',
              color: '#0891b2',
              '&:hover': {
                backgroundColor: '#f0f9ff',
              },
            }}
          >
            <ShareIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}