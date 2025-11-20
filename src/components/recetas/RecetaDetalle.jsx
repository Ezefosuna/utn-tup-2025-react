import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Chip,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Rating,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import IngredientesList from './IngredientesList';
import { useRecetas } from '../../contexts/RecetasContext';
import { useState } from 'react';

export default function RecetaDetalle({ receta }) {
  const navigate = useNavigate();
  const { isFavorito, toggleFavorito, getRating, setRating } = useRecetas();
  const [showShareAlert, setShowShareAlert] = useState(false);
  const es_favorito = receta ? isFavorito(receta.id) : false;
  const rating = receta ? getRating(receta.id) : 0;

  if (!receta) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Receta no encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            La receta que buscas no existe o ha sido eliminada.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/recetas')}
          >
            Volver al Listado
          </Button>
        </Paper>
      </Container>
    );
  }

  const getDificultadColor = (dificultad) => {
    if (dificultad === 'Fácil') return 'success';
    if (dificultad === 'Media') return 'warning';
    return 'error';
  };

  const handleShare = () => {
    const texto = `Mira esta deliciosa receta: ${receta.titulo}`;
    const url = `${window.location.origin}/recetas/${receta.id}`;

    if (navigator.share) {
      navigator.share({
        title: receta.titulo,
        text: receta.descripcion,
        url: url,
      }).catch((err) => console.log('Error al compartir:', err));
    } else {
      const textoCompleto = `${texto}\n${url}`;
      navigator.clipboard.writeText(textoCompleto).then(() => {
        setShowShareAlert(true);
        setTimeout(() => setShowShareAlert(false), 3000);
      }).catch(() => {
        alert(`Comparte: ${textoCompleto}`);
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Share Alert */}
      {showShareAlert && (
        <Alert
          severity="success"
          icon={<CheckIcon />}
          sx={{
            mb: 2,
            animation: 'slideIn 0.3s ease-in-out',
            '@keyframes slideIn': {
              from: { transform: 'translateY(-20px)', opacity: 0 },
              to: { transform: 'translateY(0)', opacity: 1 },
            },
          }}
        >
          ¡Enlace copiado al portapapeles!
        </Alert>
      )}

      {/* Botón volver */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/recetas')}
        sx={{ mb: 3, transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'translateX(-4px)' } }}
        variant="outlined"
      >
        Volver al Listado
      </Button>

      {/* Imagen destacada */}
      <Card
        sx={{
          mb: 4,
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 8,
          },
          position: 'relative',
        }}
      >
        {/* Favorito badge en imagen */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
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
              onClick={() => toggleFavorito(receta.id)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {es_favorito ? (
                <FavoriteIcon sx={{ color: '#e74c3c' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <CardMedia
          component="img"
          height="400"
          image={receta.imagen}
          alt={receta.titulo}
          sx={{
            objectFit: 'cover',
            width: '100%',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        />
      </Card>

      {/* Información General */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          backgroundColor: 'background.paper',
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {receta.titulo}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {receta.descripcion}
            </Typography>
          </Box>
        </Box>

        {/* Chips de información */}
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1.5, mb: 2 }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={receta.tiempoPreparacion}
            color="primary"
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
          <Chip
            icon={<LocalFireDepartmentIcon />}
            label={receta.dificultad}
            color={getDificultadColor(receta.dificultad)}
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
          <Chip
            icon={<PeopleIcon />}
            label={`${receta.porciones} porciones`}
            color="success"
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
          {receta.categoria && (
            <Chip
              label={receta.categoria}
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </Stack>

        {/* Acciones */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button
            startIcon={es_favorito ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            variant={es_favorito ? 'contained' : 'outlined'}
            color={es_favorito ? 'error' : 'inherit'}
            onClick={() => toggleFavorito(receta.id)}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            {es_favorito ? 'Favorito' : 'Agregar a Favoritos'}
          </Button>
          <Button
            startIcon={<ShareIcon />}
            variant="outlined"
            onClick={handleShare}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Compartir
          </Button>
        </Stack>

        {/* Rating */}
        <Divider sx={{ my: 2 }} />
        <Paper sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Mi Calificación
          </Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(receta.id, newValue)}
            size="large"
          />
          {rating > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Has calificado esta receta con {rating} estrella{rating !== 1 ? 's' : ''}
            </Typography>
          )}
        </Paper>
      </Paper>

      {/* Ingredientes */}
      <Paper sx={{ p: 4, mb: 4, animation: 'fadeIn 0.7s ease-in-out' }}>
        <IngredientesList ingredientes={receta.ingredientes} />
      </Paper>

      {/* Preparación */}
      <Paper sx={{ p: 4, mb: 4, animation: 'fadeIn 0.9s ease-in-out' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            👨‍🍳 Preparación
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <List sx={{ pl: 0 }}>
          {receta.pasos.map((paso, index) => (
            <ListItem
              key={index}
              sx={{
                pb: 2,
                px: 0,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  pl: 1,
                },
              }}
            >
              <Box
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  mr: 2,
                  flexShrink: 0,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {index + 1}
              </Box>
              <Typography variant="body1">{paso}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Botón volver al final */}
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/recetas')}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            },
            '&:active': {
              transform: 'translateY(-2px)',
            },
          }}
        >
          Volver al Listado
        </Button>
      </Box>
    </Container>
  );
}