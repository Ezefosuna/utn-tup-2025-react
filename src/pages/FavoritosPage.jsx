import { Box, Container, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useEffect } from 'react';
import { useRecetas } from '../contexts/RecetasContext';
import RecetaCard from '../components/recetas/RecetaCard';

export default function FavoritosPage() {
  const { darkMode, favoritos, recetas } = useRecetas();

  useEffect(() => {
    document.title = 'Favoritos | Recetas Deliciosas';
  }, []);

  // Filtrar solo las recetas que están en favoritos
  const recetasFavoritas = recetas.filter(r => favoritos.includes(r.id));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            mb: 6,
            textAlign: 'center',
            animation: 'slideInDown 0.6s ease-out',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
              mb: 3,
              boxShadow: '0 10px 40px rgba(231, 76, 60, 0.4)',
              animation: 'pulse 2s infinite',
            }}
          >
            <Favorite sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              background: 'linear-gradient(45deg, #e74c3c 0%, #c0392b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fadeIn 0.8s ease-in-out',
            }}
          >
            Mis Favoritos
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              animation: 'fadeIn 1s ease-in-out',
              fontWeight: 300,
            }}
          >
            {recetasFavoritas.length > 0
              ? `Tienes ${recetasFavoritas.length} receta${recetasFavoritas.length !== 1 ? 's' : ''} guardada${recetasFavoritas.length !== 1 ? 's' : ''} en favoritos`
              : 'Aún no tienes recetas en favoritos. ¡Agrega algunas!'}
          </Typography>
        </Box>
      </Container>

      {/* Mostrar recetas favoritas */}
      {recetasFavoritas.length > 0 ? (
        <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6 }}>
          <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontWeight: 600 }}>
              Mostrando <strong style={{ color: '#e74c3c' }}>{recetasFavoritas.length}</strong> receta{recetasFavoritas.length !== 1 ? 's' : ''}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 4,
                animation: 'fadeIn 0.3s ease-in-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
              }}
            >
              {recetasFavoritas.map((receta) => (
                <RecetaCard key={receta.id} receta={receta} />
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6 }}>
          <Box sx={{ textAlign: 'center', py: 12, maxWidth: 1600, mx: 'auto' }}>
            <Typography sx={{ fontSize: '5rem', mb: 2, animation: 'bounce 1s infinite' }}>
              ℹ️
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              No hay recetas en favoritos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
              Explora nuestras recetas y agrega tus favoritas haciendo click en el corazón
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
