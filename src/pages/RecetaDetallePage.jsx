import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import RecetaDetalle from '../components/recetas/RecetaDetalle';
import { useRecetas } from '../contexts/RecetasContext';
import { useEffect } from 'react';

export default function RecetaDetallePage() {
  const { id } = useParams();
  const { getRecetaById } = useRecetas();
  const receta = getRecetaById(id);

  useEffect(() => {
    if (receta) {
      document.title = `${receta.titulo} | Recetas Deliciosas`;
    } else {
      document.title = 'Receta no encontrada | Recetas Deliciosas';
    }
  }, [receta]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <RecetaDetalle receta={receta} />
    </Box>
  );
}