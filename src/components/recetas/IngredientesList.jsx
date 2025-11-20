import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function IngredientesList({ ingredientes }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocalDiningIcon sx={{ mr: 1.5, color: '#e74c3c', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Ingredientes
        </Typography>
      </Box>

      <List sx={{ pl: 0 }}>
        {ingredientes.map((ingrediente, index) => (
          <ListItem
            key={index}
            sx={{
              pb: 1.5,
              px: 0,
              borderBottom: index !== ingredientes.length - 1 ? '1px solid #ecf0f1' : 'none',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)'
              }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Chip
                    label={`${ingrediente.cantidad} ${ingrediente.unidad}`}
                    size="small"
                    sx={{
                      backgroundColor: '#3498db',
                      color: 'white',
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}
                  />
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {ingrediente.nombre}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}