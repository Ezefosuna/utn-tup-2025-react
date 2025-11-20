import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Stack,
  Chip,
  Rating,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useRecetas } from '../../contexts/RecetasContext';
import { useState } from 'react';

export default function RecetaModal({ open, onClose, receta }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { isFavorito, toggleFavorito, getRating, setRating } = useRecetas();
  const [showRating, setShowRating] = useState(false);

  if (!receta) return null;

  const es_favorito = isFavorito(receta.id);
  const rating = getRating(receta.id);

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
        alert('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        alert(`Comparte: ${textoCompleto}`);
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: fullScreen ? '100vh' : '90vh',
          overflow: 'auto',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {receta.titulo}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Imagen */}
        <Box
          component="img"
          src={receta.imagen}
          alt={receta.titulo}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 2,
            mb: 2,
            objectFit: 'cover',
            maxHeight: 300,
          }}
        />

        {/* Descripción */}
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
          {receta.descripcion}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Información General */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={receta.tiempoPreparacion}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<LocalFireDepartmentIcon />}
            label={receta.dificultad}
            size="small"
            color={getDificultadColor(receta.dificultad)}
            variant="filled"
          />
          <Chip
            icon={<PeopleIcon />}
            label={`${receta.porciones} porciones`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Acciones */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button
            startIcon={es_favorito ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            variant="outlined"
            size="small"
            onClick={() => toggleFavorito(receta.id)}
            sx={{ flex: 1 }}
          >
            {es_favorito ? 'Favorito' : 'Agregar'}
          </Button>
          <Button
            startIcon={<ShareIcon />}
            variant="outlined"
            size="small"
            onClick={handleShare}
            sx={{ flex: 1 }}
          >
            Compartir
          </Button>
        </Stack>

        {/* Rating */}
        <Paper sx={{ p: 2, mb: 2, backgroundColor: 'background.default' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Mi Calificación
          </Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => {
              setRating(receta.id, newValue);
            }}
            size="medium"
          />
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Ingredientes */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          📝 Ingredientes ({receta.ingredientes.length})
        </Typography>
        <List dense sx={{ mb: 2, backgroundColor: 'background.default', borderRadius: 1, p: 1 }}>
          {receta.ingredientes.map((ingrediente, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={ingrediente.nombre}
                secondary={`${ingrediente.cantidad} ${ingrediente.unidad}`}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Pasos de Preparación */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          👨‍🍳 Preparación ({receta.pasos.length} pasos)
        </Typography>
        <List dense>
          {receta.pasos.map((paso, index) => (
            <ListItem key={index} disableGutters sx={{ mb: 1 }}>
              <Paper
                sx={{
                  p: 1.5,
                  width: '100%',
                  backgroundColor: 'background.default',
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Box
                    sx={{
                      minWidth: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="body2" sx={{ pt: 0.5 }}>
                    {paso}
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
