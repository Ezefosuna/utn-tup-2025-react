import { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Typography,
    Alert,
    CircularProgress
} from '@mui/material';
import { useObjects } from '../../contexts/ObjectsContext';

const ObjectForm = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const { addObject, isLoading } = useObjects();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!name.trim()) {
            setError('El nombre es requerido');
            return;
        }
        
        if (!color.trim()) {
            setError('El color es requerido');
            return;
        }

        try {
            setError('');
            await addObject(name.trim(), color.trim());
            
            // Limpiar formulario después del éxito
            setName('');
            setColor('');
            setSuccess(true);
            
            // Quitar mensaje de éxito después de 3 segundos
            setTimeout(() => setSuccess(false), 3000);
            
        } catch (err) {
            setError('Error al crear el objeto. Por favor, intenta nuevamente.');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Agregar Nuevo Objeto
            </Typography>
            
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    ¡Objeto creado exitosamente!
                </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Nombre del objeto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    disabled={isLoading}
                    required
                />
                
                <TextField
                    fullWidth
                    label="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    sx={{ mb: 3 }}
                    disabled={isLoading}
                    required
                    placeholder="ej: rojo, azul, verde..."
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{ position: 'relative' }}
                >
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                    {isLoading ? 'Creando...' : 'Crear Objeto'}
                </Button>
            </Box>
        </Paper>
    );
};

export default ObjectForm;
