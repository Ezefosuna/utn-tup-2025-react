import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline, Home } from '@mui/icons-material';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Página no encontrada | Recetas Deliciosas';
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              fontSize: { xs: 80, md: 120 },
              mb: 2,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(-20px)',
                }
              }
            }}
          >
            <ErrorOutline sx={{ fontSize: { xs: 60, md: 80 }, opacity: 0.3 }} />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'primary.main',
              fontSize: { xs: '3rem', md: '4rem' }
            }}
          >
            404
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            ¡Página no encontrada!
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Lo sentimos, la página que estás buscando no existe o ha sido removida. 
            No te preocupes, ¡aún puedes explorar nuestras deliciosas recetas!
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Ir a Inicio
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/recetas')}
              sx={{
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Ver Recetas
            </Button>
          </Stack>

          {/* Decoración */}
          <Box
            sx={{
              mt: 6,
              p: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Si crees que esto es un error, por favor intenta navegando desde el menú principal.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
