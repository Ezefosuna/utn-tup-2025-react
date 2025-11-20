import { Typography, Box, CircularProgress, Button, Stack, Chip } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import RecetaCard from './RecetaCard';
import { useRecetas } from '../../contexts/RecetasContext';

export default function RecetasList() {
  const {
    isLoading,
    error,
    getRecetasFiltradas,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
  } = useRecetas();

  const recetasFiltradas = getRecetasFiltradas();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  const hasFilters = searchTerm || categoryFilter || difficultyFilter;

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6 }}>
      {/* Active Filters Display */}
      {hasFilters && (
        <Box sx={{ mb: 4, maxWidth: 1600, mx: 'auto' }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
            sx={{
              animation: 'slideIn 0.3s ease-in-out',
              '@keyframes slideIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(-10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Filtros activos:
            </Typography>
            {searchTerm && (
              <Chip
                label={`Búsqueda: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                size="small"
                color="primary"
                variant="filled"
                sx={{
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              />
            )}
            {categoryFilter && (
              <Chip
                label={`Categoría: ${categoryFilter}`}
                onDelete={() => setCategoryFilter('')}
                size="small"
                color="primary"
                variant="filled"
                sx={{
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              />
            )}
            {difficultyFilter && (
              <Chip
                label={`Dificultad: ${difficultyFilter}`}
                onDelete={() => setDifficultyFilter('')}
                size="small"
                color="primary"
                variant="filled"
                sx={{
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              />
            )}
            <Button
              startIcon={<ClearIcon />}
              size="small"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setDifficultyFilter('');
              }}
              sx={{
                ml: 1,
                background: 'linear-gradient(45deg, #e74c3c 0%, #c0392b 100%)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(231, 76, 60, 0.4)',
                },
              }}
            >
              Limpiar todos
            </Button>
          </Stack>
        </Box>
      )}

      {/* Results */}
      {recetasFiltradas.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 12, maxWidth: 1600, mx: 'auto' }}>
          <Typography sx={{ fontSize: '5rem', mb: 2, animation: 'bounce 1s infinite' }}>
            ⚠️
          </Typography>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            No se encontraron recetas
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
            {hasFilters
              ? 'Intenta modificar los filtros de búsqueda para encontrar lo que buscas'
              : 'No hay recetas disponibles en este momento'}
          </Typography>
          {hasFilters && (
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setDifficultyFilter('');
              }}
              sx={{
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
                },
              }}
            >
              Limpiar Filtros
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontWeight: 600 }}>
              Resultados: <strong style={{ color: '#667eea' }}>{recetasFiltradas.length}</strong> receta{recetasFiltradas.length !== 1 ? 's' : ''}
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
              {recetasFiltradas.map((receta) => (
                <RecetaCard key={receta.id} receta={receta} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}