import { Box, Container, Typography } from '@mui/material';
import { RestaurantMenu } from '@mui/icons-material';
import RecetasList from '../components/recetas/RecetasList';
import { useEffect } from 'react';
import { useRecetas } from '../contexts/RecetasContext';

export default function RecetasListPage() {
  const { darkMode } = useRecetas();

  useEffect(() => {
    document.title = 'Recetas | Recetas Deliciosas';
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            mb: 8,
            textAlign: 'center',
            animation: 'slideInDown 0.6s ease-out',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 300,
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              animation: 'fadeIn 0.8s ease-in-out',
              letterSpacing: -0.5,
            }}
          >
            Nuestras Recetas
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              animation: 'fadeIn 1s ease-in-out',
              fontWeight: 300,
            }}
          >
            Descubre deliciosas recetas caseras, fáciles de preparar. Desde clásicos hasta innovaciones culinarias.
          </Typography>
        </Box>
      </Container>
      <RecetasList />
    </Box>
  );
}