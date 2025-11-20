import { Box, Container, Typography, Button, Stack, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Restaurant, LocalDining, Kitchen } from '@mui/icons-material';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Inicio | Recetas Deliciosas';
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          py: { xs: 8, md: 16 },
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}
      >
        <Container maxWidth="md">
          <Restaurant sx={{ fontSize: { xs: 40, md: 60 }, mb: 4, color: '#06b6d4' }} />
          <Typography variant="h2" sx={{ fontWeight: 300, mb: 2, letterSpacing: -0.5 }}>
            Recetas Deliciosas
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.8, fontWeight: 300 }}>
            Descubre nuestras mejores recetas de cocina
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/recetas')}
            sx={{
              borderColor: '#06b6d4',
              color: '#06b6d4',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#06b6d4',
                color: 'white',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Explorar Recetas
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontWeight: 300,
            fontSize: { xs: '1.5rem', md: '2rem' },
            animation: 'slideIn 0.7s ease-in-out',
            '@keyframes slideIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Características principales
        </Typography>

        <Grid 
          container 
          spacing={4}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                borderColor: '#e2e8f0',
                boxShadow: 'none',
                backgroundColor: 'background.paper',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                },
                animation: 'slideIn 0.7s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <LocalDining sx={{ fontSize: 40, color: '#06b6d4', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  Fáciles de Preparar
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300 }}>
                  Recetas con instrucciones claras y detalladas, perfectas para todos los niveles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                borderColor: '#e2e8f0',
                boxShadow: 'none',
                backgroundColor: 'background.paper',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                },
                animation: 'slideIn 0.9s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Kitchen sx={{ fontSize: 40, color: '#06b6d4', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  Ingredientes Accesibles
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300 }}>
                  Ingredientes que encuentras fácilmente en tu mercado local. Recetas prácticas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={10} md={4}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                borderColor: '#e2e8f0',
                boxShadow: 'none',
                backgroundColor: 'background.paper',
                '&:hover': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                },
                animation: 'slideIn 1.1s ease-in-out',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Restaurant sx={{ fontSize: 40, color: '#06b6d4', mb: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  Sabor Garantizado
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 300 }}>
                  Todas probadas y garantizan resultados deliciosos en tu cocina.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bg: 'background.paper', py: 12, textAlign: 'center', borderTop: '1px solid', borderColor: '#e2e8f0' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 300, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Comienza a explorar
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, color: 'text.secondary', fontWeight: 300 }}>
            Descubre nuestro catálogo de recetas, guarda tus favoritas y disfruta cocinando.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/recetas')}
            sx={{
              backgroundColor: '#0891b2',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#06b6d4',
              }
            }}
          >
            Ver Recetas
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
