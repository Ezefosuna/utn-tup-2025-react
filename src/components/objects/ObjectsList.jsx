import { useObjects } from "../../contexts/ObjectsContext";
import SingleObject from "./SingleObject";
import { 
    Card, 
    CardContent, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Chip, 
    Box,
    Divider 
} from "@mui/material";

function ObjectData({data}) {
    return (
        <>
            {data && (
                <Chip 
                    label={`Color: ${data.color}`} 
                    size="small" 
                    color="secondary" 
                    sx={{ ml: 1 }}
                />
            )}
        </>
    )
}

function ObjectList() {
    const { objects } = useObjects()
    
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Lista de Objetos
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {objects?.length || 0} objetos encontrados
                    </Typography>
                    
                    {objects && objects.length > 0 ? (
                        <List>
                            {objects.map((obj, index) => (
                                <div key={obj.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={obj.name}
                                            secondary={`ID: ${obj.id}`}
                                        />
                                        <ObjectData data={obj.data}/>
                                    </ListItem>
                                    {index < objects.length - 1 && <Divider />}
                                </div>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 2 }}>
                            Cargando objetos...
                        </Typography>
                    )}
                </CardContent>
            </Card>
            
            <Box sx={{ mt: 3 }}>
                <SingleObject id={7}/>
            </Box>
        </Box>
    )
}

export default ObjectList;