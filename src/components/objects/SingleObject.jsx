import { useEffect, useState } from "react";
import { 
    Card, 
    CardContent, 
    Typography, 
    Chip, 
    Box,
    CircularProgress 
} from "@mui/material";

function SingleObject({id}) {
    const [object, setObject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.restful-api.dev/objects/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al traer objecto ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            setObject(data)
            setLoading(false)
        })
        .catch(error =>  {
            console.log(`error al obtener objects ${error} `)
            setError(true)
            setLoading(false)
        })
    },[id]);
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
            </Box>
        )
    }
    
    if (error) {
        return (
            <Card variant="outlined" sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}>
                <CardContent>
                    <Typography variant="body1">
                        Error al cargar el objeto
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                    Objeto Individual
                </Typography>
                {object ? (
                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Nombre:</strong> {object.name}
                        </Typography>
                        {object.data?.year && (
                            <Chip 
                                label={`Año: ${object.data.year}`} 
                                variant="outlined" 
                                color="primary" 
                                size="small"
                            />
                        )}
                        {object.data && Object.keys(object.data).length > 1 && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Datos adicionales disponibles
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No se encontró información del objeto
                    </Typography>
                )}
            </CardContent>
        </Card>
    )       
}

export default SingleObject;