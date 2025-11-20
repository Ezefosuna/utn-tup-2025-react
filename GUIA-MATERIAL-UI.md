# Guía de Material UI para Principiantes

## Índice
1. [Introducción](#introducción)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Tema y Personalización](#tema-y-personalización)
4. [Componentes de Superficie](#componentes-de-superficie)
5. [Componente Stack](#componente-stack)
6. [Sistema de Grid](#sistema-de-grid)
7. [Componentes de Tabla](#componentes-de-tabla)
8. [Formularios y Componentes de Entrada](#formularios-y-componentes-de-entrada)
9. [Botones](#botones)
10. [Componentes de Selección](#componentes-de-selección)
11. [Espaciado y Tamaños](#espaciado-y-tamaños)
12. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Introducción

Material UI (MUI) es una biblioteca de componentes React que implementa el sistema de diseño Material Design de Google. Proporciona componentes pre-construidos y estilizados que te permiten crear interfaces de usuario modernas y consistentes rápidamente.

### Ventajas de Material UI:
- ✅ Componentes listos para usar
- ✅ Diseño consistente y profesional
- ✅ Totalmente customizable
- ✅ Responsive por defecto
- ✅ Accesibilidad integrada
- ✅ Documentación excelente

---

## Instalación y Configuración

### Instalación

```bash
# Con npm
npm install @mui/material @emotion/react @emotion/styled

# Con yarn
yarn add @mui/material @emotion/react @emotion/styled

# Para iconos (opcional pero recomendado)
npm install @mui/icons-material
```

### Configuración Básica

```jsx
// En tu archivo principal (main.jsx o App.jsx)
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Crear tema básico
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos CSS */}
      <CssBaseline />
      {/* Tu aplicación aquí */}
    </ThemeProvider>
  );
}

export default App;
```

---

## Tema y Personalización

### Crear un Tema Personalizado

```jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#dc004e', // Rosa
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
    },
  },
  spacing: 8, // 1 unidad = 8px
});
```

---

## Componentes de Superficie

Los componentes de superficie en Material UI proporcionan la base visual para contener y organizar contenido. **Paper** y **Card** son los componentes fundamentales para crear interfaces bien estructuradas.

### Paper

Paper es el componente base que implementa la elevación (sombras) del Material Design. Es la base sobre la cual se construyen muchos otros componentes.

#### Paper Básico

```jsx
import { Paper, Typography, Box } from '@mui/material';

function PaperBasico() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
      {/* Paper sin elevación */}
      <Paper sx={{ p: 2, width: 200 }}>
        <Typography>Sin elevación (elevation=1)</Typography>
      </Paper>

      {/* Paper con diferentes elevaciones */}
      <Paper elevation={0} sx={{ p: 2, width: 200 }}>
        <Typography>Elevation = 0</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, width: 200 }}>
        <Typography>Elevation = 3</Typography>
      </Paper>

      <Paper elevation={6} sx={{ p: 2, width: 200 }}>
        <Typography>Elevation = 6</Typography>
      </Paper>

      <Paper elevation={12} sx={{ p: 2, width: 200 }}>
        <Typography>Elevation = 12</Typography>
      </Paper>

      <Paper elevation={24} sx={{ p: 2, width: 200 }}>
        <Typography>Elevation = 24</Typography>
      </Paper>
    </Box>
  );
}
```

#### Paper con Variantes

```jsx
import { Paper, Typography, Stack } from '@mui/material';

function PaperVariantes() {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* Paper por defecto */}
      <Paper sx={{ p: 2 }}>
        <Typography>Paper por defecto</Typography>
      </Paper>

      {/* Paper outlined */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography>Paper con borde (outlined)</Typography>
      </Paper>

      {/* Paper con fondo personalizado */}
      <Paper 
        sx={{ 
          p: 2, 
          backgroundColor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Typography>Paper con fondo azul</Typography>
      </Paper>

      {/* Paper cuadrado (sin border-radius) */}
      <Paper square sx={{ p: 2 }}>
        <Typography>Paper cuadrado (sin esquinas redondeadas)</Typography>
      </Paper>
    </Stack>
  );
}
```

### Card

Card es un componente más complejo que extiende Paper y está diseñado para mostrar información de manera estructurada. Es perfecto para mostrar contenido relacionado de forma compacta.

#### Card Básica

```jsx
import { 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography 
} from '@mui/material';

function CardBasica() {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Título de la Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Este es el contenido de la card. Aquí puedes poner cualquier 
          información relevante que quieras mostrar al usuario.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Compartir</Button>
        <Button size="small">Leer más</Button>
      </CardActions>
    </Card>
  );
}
```

#### Card con Header

```jsx
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import { MoreVert, Favorite, Share } from '@mui/icons-material';

function CardConHeader() {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            R
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title="Receta de Paella"
        subheader="14 de Septiembre, 2024"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Una deliciosa receta tradicional española de paella valenciana 
          con ingredientes frescos y auténticos sabores mediterráneos.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <Button size="small" sx={{ ml: 'auto' }}>
          Ver receta
        </Button>
      </CardActions>
    </Card>
  );
}
```

#### Card con Imagen

```jsx
import { 
  Card, 
  CardHeader,
  CardMedia, 
  CardContent, 
  CardActions,
  Avatar,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';
import { LocationOn, AccessTime } from '@mui/icons-material';

function CardConImagen() {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            V
          </Avatar>
        }
        title="Viaje a Barcelona"
        subheader="Planificado para Diciembre 2024"
      />
      
      <CardMedia
        component="img"
        height="200"
        image="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400"
        alt="Barcelona Sagrada Familia"
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip 
            icon={<LocationOn />} 
            label="Barcelona, España" 
            size="small" 
            variant="outlined" 
          />
          <Chip 
            icon={<AccessTime />} 
            label="5 días" 
            size="small" 
            variant="outlined" 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Explora la hermosa arquitectura de Gaudí, disfruta de la gastronomía 
          catalana y relájate en las playas del Mediterráneo.
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button size="small" variant="contained" fullWidth>
          Ver itinerario completo
        </Button>
      </CardActions>
    </Card>
  );
}
```

#### Card Expandible

```jsx
import { 
  Card, 
  CardHeader,
  CardContent, 
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  styled
} from '@mui/material';
import { 
  Favorite, 
  Share, 
  ExpandMore,
  Restaurant 
} from '@mui/icons-material';
import { useState } from 'react';

// Componente para el botón de expandir
const ExpandMoreButton = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CardExpandible() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <Restaurant />
          </Avatar>
        }
        title="Ensalada César"
        subheader="Receta fácil y rápida"
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Una ensalada clásica con lechuga romana, crutones caseros, 
          parmesano y nuestro aderezo césar especial.
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <ExpandMoreButton
          expand={expanded}
          onClick={handleExpandClick}
        >
          <ExpandMore />
        </ExpandMoreButton>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ingredientes:
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 1 lechuga romana grande<br/>
            • 1/2 taza de parmesano rallado<br/>
            • 2 tazas de crutones<br/>
            • 1/4 taza de aderezo césar<br/>
            • Pimienta negra al gusto
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Preparación:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. Lava y corta la lechuga en trozos medianos<br/>
            2. Mezcla con el aderezo césar<br/>
            3. Agrega el parmesano y los crutones<br/>
            4. Sazona con pimienta y sirve inmediatamente
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
```

#### Grid de Cards Responsive

```jsx
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Typography,
  Button,
  Container,
  Rating,
  Box
} from '@mui/material';
import { Star } from '@mui/icons-material';

const productos = [
  {
    id: 1,
    titulo: 'Laptop Gaming',
    precio: '$1,299',
    rating: 4.5,
    descripcion: 'Laptop de alto rendimiento para gaming y trabajo profesional.',
    imagen: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400'
  },
  {
    id: 2,
    titulo: 'Smartphone Pro',
    precio: '$899',
    rating: 4.8,
    descripcion: 'Smartphone con cámara profesional y batería de larga duración.',
    imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
  },
  {
    id: 3,
    titulo: 'Auriculares Wireless',
    precio: '$299',
    rating: 4.3,
    descripcion: 'Auriculares inalámbricos con cancelación de ruido activa.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  }
];

function GridDeCards() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Productos Destacados
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {productos.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 200,
                  width: '100%',
                  objectFit: 'cover'
                }}
                src={producto.imagen}
                alt={producto.titulo}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {producto.titulo}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating 
                    value={producto.rating} 
                    precision={0.1} 
                    readOnly 
                    size="small"
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({producto.rating})
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {producto.descripcion}
                </Typography>
                
                <Typography variant="h6" color="primary">
                  {producto.precio}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" fullWidth>
                  Agregar al Carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
```

### Comparación: Paper vs Card

| Característica | Paper | Card |
|----------------|--------|------|
| **Propósito** | Superficie base genérica | Contenedor estructurado para información |
| **Elevación** | ✅ Configurable | ✅ Por defecto |
| **Estructura** | ❌ Libre | ✅ Header, Content, Actions |
| **Componentes** | Solo Paper | CardHeader, CardContent, CardActions, CardMedia |
| **Casos de uso** | Fondos, contenedores simples | Productos, perfiles, artículos, posts |
| **Flexibilidad** | ✅ Alta | ⚖️ Media (más estructurado) |

### Mejores Prácticas

#### 1. **Uso de Paper**
```jsx
// ✅ BUENO - Para contenedores simples
<Paper sx={{ p: 2 }}>
  <Typography>Contenido simple</Typography>
</Paper>

// ❌ EVITAR - Para contenido estructurado complejo
<Paper>
  <div>Header</div>
  <div>Content</div>
  <div>Actions</div>
</Paper>
```

#### 2. **Uso de Card**
```jsx
// ✅ BUENO - Para contenido estructurado
<Card>
  <CardHeader title="Título" />
  <CardContent>Contenido</CardContent>
  <CardActions>Acciones</CardActions>
</Card>

// ✅ BUENO - Card responsive
<Grid item xs={12} sm={6} md={4}>
  <Card sx={{ height: '100%' }}>
    {/* Contenido */}
  </Card>
</Grid>
```

#### 3. **Elevaciones Recomendadas**
- `elevation={0}`: Elementos planos, divisores
- `elevation={1-3}`: Contenido principal, cards
- `elevation={4-8}`: Elementos flotantes, dropdowns
- `elevation={12-24}`: Modales, tooltips

---

## Componente Stack

Stack es uno de los componentes de layout más útiles y versátiles de Material UI. Te permite organizar elementos en filas o columnas con espaciado consistente, sin necesidad de CSS complejo. Es perfecto para crear layouts simples y limpios.

### ¿Qué es Stack?

Stack es un contenedor que:
- ✅ Organiza elementos en una dirección (horizontal o vertical)
- ✅ Maneja el espaciado automáticamente
- ✅ Es responsive por defecto
- ✅ Simplifica el código de layout
- ✅ Soporta dividers entre elementos

### Stack Básico

```jsx
import { Stack, Paper, Typography } from '@mui/material';

function StackBasico() {
  return (
    <div>
      {/* Stack vertical (por defecto) */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 1</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 2</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 3</Typography>
        </Paper>
      </Stack>

      {/* Stack horizontal */}
      <Stack direction="row" spacing={2}>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography>Item A</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography>Item B</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography>Item C</Typography>
        </Paper>
      </Stack>
    </div>
  );
}
```

### Propiedades Principales

#### Direction (Dirección)
```jsx
import { Stack, Button } from '@mui/material';

function StackDirection() {
  return (
    <div>
      {/* Vertical (por defecto) */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Button variant="contained">Botón 1</Button>
        <Button variant="contained">Botón 2</Button>
        <Button variant="contained">Botón 3</Button>
      </Stack>

      {/* Horizontal */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button variant="outlined">Botón A</Button>
        <Button variant="outlined">Botón B</Button>
        <Button variant="outlined">Botón C</Button>
      </Stack>

      {/* Column (equivalente al vertical) */}
      <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
        <Button variant="text">Opción 1</Button>
        <Button variant="text">Opción 2</Button>
      </Stack>

      {/* Row-reverse */}
      <Stack direction="row-reverse" spacing={1}>
        <Button>Último</Button>
        <Button>Medio</Button>
        <Button>Primero</Button>
      </Stack>
    </div>
  );
}
```

#### Spacing (Espaciado)
```jsx
import { Stack, Chip, Typography } from '@mui/material';

function StackSpacing() {
  return (
    <div>
      {/* Sin espaciado */}
      <Typography variant="h6" gutterBottom>Sin espaciado:</Typography>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Chip label="Tag 1" />
        <Chip label="Tag 2" />
        <Chip label="Tag 3" />
      </Stack>

      {/* Espaciado pequeño */}
      <Typography variant="h6" gutterBottom>Spacing = 1:</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label="Tag 1" />
        <Chip label="Tag 2" />
        <Chip label="Tag 3" />
      </Stack>

      {/* Espaciado medio */}
      <Typography variant="h6" gutterBottom>Spacing = 2:</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip label="Tag 1" />
        <Chip label="Tag 2" />
        <Chip label="Tag 3" />
      </Stack>

      {/* Espaciado grande */}
      <Typography variant="h6" gutterBottom>Spacing = 4:</Typography>
      <Stack direction="row" spacing={4}>
        <Chip label="Tag 1" />
        <Chip label="Tag 2" />
        <Chip label="Tag 3" />
      </Stack>
    </div>
  );
}
```

### Alineación en Stack

```jsx
import { Stack, Button, Typography, Paper } from '@mui/material';

function StackAlignment() {
  return (
    <div>
      {/* Alineación horizontal en Stack vertical */}
      <Typography variant="h6" gutterBottom>
        Alineación horizontal (Stack vertical):
      </Typography>
      
      <Stack spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
        <Button>Izquierda (flex-start)</Button>
        <Button>Izquierda</Button>
      </Stack>

      <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Button>Centro</Button>
        <Button>Centro</Button>
      </Stack>

      <Stack spacing={2} alignItems="flex-end" sx={{ mb: 4 }}>
        <Button>Derecha (flex-end)</Button>
        <Button>Derecha</Button>
      </Stack>

      {/* Alineación vertical en Stack horizontal */}
      <Typography variant="h6" gutterBottom>
        Alineación vertical (Stack horizontal):
      </Typography>

      <Paper sx={{ p: 2, height: 100 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ height: '100%' }}>
          <Button size="small">Arriba</Button>
          <Button>Arriba</Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, height: 100, mt: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
          <Button size="small">Centro</Button>
          <Button>Centro</Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, height: 100, mt: 2 }}>
        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ height: '100%' }}>
          <Button size="small">Abajo</Button>
          <Button>Abajo</Button>
        </Stack>
      </Paper>
    </div>
  );
}
```

### Justificación del Contenido

```jsx
import { Stack, Button, Paper, Typography } from '@mui/material';

function StackJustify() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Justificación en Stack horizontal:
      </Typography>

      {/* flex-start (por defecto) */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: flex-start</Typography>
        <Stack direction="row" spacing={1} justifyContent="flex-start">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
        </Stack>
      </Paper>

      {/* center */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: center</Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
        </Stack>
      </Paper>

      {/* flex-end */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: flex-end</Typography>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
        </Stack>
      </Paper>

      {/* space-between */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: space-between</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
          <Button size="small">C</Button>
        </Stack>
      </Paper>

      {/* space-around */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: space-around</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-around">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
          <Button size="small">C</Button>
        </Stack>
      </Paper>

      {/* space-evenly */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" gutterBottom>justify-content: space-evenly</Typography>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Button size="small">A</Button>
          <Button size="small">B</Button>
          <Button size="small">C</Button>
        </Stack>
      </Paper>
    </div>
  );
}
```

### Stack con Dividers

```jsx
import { Stack, Paper, Divider, Typography, Chip } from '@mui/material';

function StackDividers() {
  return (
    <div>
      {/* Dividers verticales */}
      <Typography variant="h6" gutterBottom>
        Stack vertical con dividers:
      </Typography>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
        sx={{ mb: 4 }}
      >
        <Paper sx={{ p: 2 }}>Sección 1</Paper>
        <Paper sx={{ p: 2 }}>Sección 2</Paper>
        <Paper sx={{ p: 2 }}>Sección 3</Paper>
      </Stack>

      {/* Dividers horizontales */}
      <Typography variant="h6" gutterBottom>
        Stack horizontal con dividers:
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        sx={{ mb: 4, p: 2, backgroundColor: 'grey.100' }}
      >
        <Chip label="Categoría 1" />
        <Chip label="Categoría 2" />
        <Chip label="Categoría 3" />
      </Stack>

      {/* Dividers personalizados */}
      <Typography variant="h6" gutterBottom>
        Stack con divider personalizado:
      </Typography>
      <Stack
        spacing={1}
        divider={
          <Divider 
            sx={{ 
              borderColor: 'primary.main',
              borderWidth: 1,
              mx: 1
            }} 
          />
        }
      >
        <Typography variant="body1">Elemento A</Typography>
        <Typography variant="body1">Elemento B</Typography>
        <Typography variant="body1">Elemento C</Typography>
      </Stack>
    </div>
  );
}
```

### Stack Responsive

```jsx
import { Stack, Button, Paper, Typography } from '@mui/material';

function StackResponsive() {
  return (
    <div>
      {/* Dirección responsive */}
      <Typography variant="h6" gutterBottom>
        Dirección responsive (vertical en móvil, horizontal en desktop):
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ mb: 4 }}
      >
        <Button variant="contained" fullWidth>Botón 1</Button>
        <Button variant="contained" fullWidth>Botón 2</Button>
        <Button variant="contained" fullWidth>Botón 3</Button>
      </Stack>

      {/* Espaciado responsive */}
      <Typography variant="h6" gutterBottom>
        Espaciado responsive:
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mb: 4 }}
      >
        <Paper sx={{ p: 2 }}>Spacing: xs=1, sm=2, md=3</Paper>
        <Paper sx={{ p: 2 }}>El espaciado se adapta al tamaño</Paper>
        <Paper sx={{ p: 2 }}>Más grande en pantallas grandes</Paper>
      </Stack>

      {/* Alineación responsive */}
      <Typography variant="h6" gutterBottom>
        Alineación responsive:
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <Button>Centrado en móvil</Button>
        <Button>Izquierda en desktop</Button>
      </Stack>
    </div>
  );
}
```

### Stack Anidado

```jsx
import { Stack, Card, CardContent, Typography, Chip, Button } from '@mui/material';

function StackAnidado() {
  const productos = [
    { nombre: 'Laptop Pro', precio: '$1,299', categoria: 'Tecnología', nuevo: true },
    { nombre: 'Auriculares', precio: '$199', categoria: 'Audio', nuevo: false },
    { nombre: 'Mouse Gaming', precio: '$79', categoria: 'Gaming', nuevo: true }
  ];

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Ejemplo de Stack anidado - Lista de productos:
      </Typography>
      
      {productos.map((producto, index) => (
        <Card key={index}>
          <CardContent>
            {/* Stack principal horizontal */}
            <Stack direction="row" spacing={2} alignItems="center">
              
              {/* Stack vertical para info del producto */}
              <Stack spacing={1} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6">{producto.nombre}</Typography>
                  {producto.nuevo && <Chip label="Nuevo" size="small" color="primary" />}
                </Stack>
                
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {producto.categoria}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {producto.precio}
                  </Typography>
                </Stack>
              </Stack>

              {/* Stack vertical para acciones */}
              <Stack spacing={1}>
                <Button variant="contained" size="small">
                  Comprar
                </Button>
                <Button variant="outlined" size="small">
                  Ver más
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
```

### Casos de Uso Comunes

#### 1. **Formularios**
```jsx
// ✅ EXCELENTE para formularios
<Stack spacing={3} component="form">
  <TextField label="Nombre" />
  <TextField label="Email" />
  <TextField label="Contraseña" type="password" />
  <Stack direction="row" spacing={2} justifyContent="flex-end">
    <Button variant="outlined">Cancelar</Button>
    <Button variant="contained">Enviar</Button>
  </Stack>
</Stack>
```

#### 2. **Navegación**
```jsx
// ✅ PERFECTO para barras de navegación
<Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
  <Typography variant="h6">Mi App</Typography>
  <Stack direction="row" spacing={1}>
    <Button>Inicio</Button>
    <Button>Productos</Button>
    <Button>Contacto</Button>
  </Stack>
</Stack>
```

#### 3. **Cards con acciones**
```jsx
// ✅ IDEAL para organizar contenido de cards
<CardContent>
  <Stack spacing={2}>
    <Typography variant="h5">Título</Typography>
    <Typography variant="body2">Descripción</Typography>
    <Stack direction="row" spacing={1}>
      <Chip label="Tag 1" />
      <Chip label="Tag 2" />
    </Stack>
  </Stack>
</CardContent>
```

### Stack vs Grid: ¿Cuándo usar cada uno?

| Aspecto | Stack | Grid |
|---------|--------|------|
| **Propósito** | Layout lineal simple | Layout complejo bidimensional |
| **Dirección** | Una dirección a la vez | Filas y columnas simultáneas |
| **Casos de uso** | Formularios, listas, navegación | Dashboards, galerías, layouts complejos |
| **Complejidad** | ✅ Simple | ⚖️ Media |
| **Responsive** | ✅ Fácil | ✅ Potente |
| **Espaciado** | ✅ Automático | ⚖️ Manual |

### Mejores Prácticas

#### ✅ **Cuándo usar Stack**
- Elementos en una sola dirección (vertical u horizontal)
- Formularios y listas
- Barras de navegación simples
- Cuando necesitas espaciado consistente
- Layouts simples que no requieren grid complejo

#### ❌ **Cuándo NO usar Stack**
- Layouts complejos bidimensionales
- Cuando necesitas control preciso de posición
- Galleries de imágenes con múltiples filas/columnas
- Dashboards complejos

#### 💡 **Consejos**
```jsx
// ✅ Combina Stack con otros componentes
<Container>
  <Stack spacing={4}>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h4">Título</Typography>
      <Button>Acción</Button>
    </Stack>
    
    <Grid container spacing={2}>
      {/* Contenido del grid */}
    </Grid>
  </Stack>
</Container>

// ✅ Usa Stack responsive
<Stack 
  direction={{ xs: 'column', md: 'row' }}
  spacing={{ xs: 2, md: 4 }}
/>
```

---

## Sistema de Grid

El sistema de Grid de Material UI está basado en CSS Flexbox y es fundamental para crear layouts responsive.

### Conceptos Básicos

- **Container**: Elemento padre que define el contexto del grid
- **Item**: Elementos hijos que se distribuyen en el grid
- **Breakpoints**: xs, sm, md, lg, xl

### Grid Container

```jsx
import { Grid } from '@mui/material';

function MiLayout() {
  return (
    <Grid 
      container 
      spacing={2}     // Espaciado entre elementos
      direction="row" // 'row' | 'column'
      justifyContent="center" // 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
      alignItems="center"     // 'flex-start' | 'center' | 'flex-end' | 'stretch'
    >
      {/* Grid items aquí */}
    </Grid>
  );
}
```

### Grid Items

```jsx
import { Grid, Paper, Typography } from '@mui/material';

function GridExample() {
  return (
    <Grid container spacing={3}>
      {/* Ocupa 12 columnas en móvil, 6 en tablet, 4 en desktop */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 1</Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 2</Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Elemento 3</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
```

### Breakpoints y Responsive

```jsx
// Breakpoints por defecto:
// xs: 0px
// sm: 600px
// md: 900px
// lg: 1200px
// xl: 1536px

<Grid item xs={12} sm={6} md={4} lg={3}>
  {/* 
    xs=12: Ocupa toda la fila en móviles
    sm=6:  Ocupa media fila en tablets
    md=4:  Ocupa 1/3 en desktop pequeño
    lg=3:  Ocupa 1/4 en desktop grande
  */}
</Grid>
```

---

## Componentes de Tabla

### Tabla Básica

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const datos = [
  { id: 1, nombre: 'Juan', edad: 25, ciudad: 'Madrid' },
  { id: 2, nombre: 'María', edad: 30, ciudad: 'Barcelona' },
  { id: 3, nombre: 'Carlos', edad: 28, ciudad: 'Valencia' },
];

function TablaBasica() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Edad</TableCell>
            <TableCell>Ciudad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datos.map((fila) => (
            <TableRow
              key={fila.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {fila.id}
              </TableCell>
              <TableCell>{fila.nombre}</TableCell>
              <TableCell align="right">{fila.edad}</TableCell>
              <TableCell>{fila.ciudad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

### Tabla con Funcionalidades Avanzadas

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Checkbox
} from '@mui/material';
import { useState } from 'react';

function TablaAvanzada() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datos.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < datos.length}
                  checked={datos.length > 0 && selected.length === datos.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel>Nombre</TableSortLabel>
              </TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Ciudad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((fila) => {
                const isItemSelected = selected.indexOf(fila.id) !== -1;
                
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, fila.id)}
                    selected={isItemSelected}
                    key={fila.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell>{fila.nombre}</TableCell>
                    <TableCell>{fila.edad}</TableCell>
                    <TableCell>{fila.ciudad}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={datos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
```

---

## Formularios y Componentes de Entrada

### TextField (Campo de Texto)

```jsx
import { TextField, Stack } from '@mui/material';
import { useState } from 'react';

function CamposDeTexto() {
  const [valores, setValores] = useState({
    nombre: '',
    email: '',
    password: '',
    descripcion: ''
  });

  const handleChange = (prop) => (event) => {
    setValores({ ...valores, [prop]: event.target.value });
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {/* Campo básico */}
      <TextField
        label="Nombre"
        value={valores.nombre}
        onChange={handleChange('nombre')}
        fullWidth
      />

      {/* Campo con variantes */}
      <TextField
        label="Email"
        type="email"
        value={valores.email}
        onChange={handleChange('email')}
        variant="outlined" // 'filled' | 'standard' | 'outlined'
        fullWidth
        required
        helperText="Ingresa un email válido"
      />

      {/* Campo de contraseña */}
      <TextField
        label="Contraseña"
        type="password"
        value={valores.password}
        onChange={handleChange('password')}
        fullWidth
        error={valores.password.length > 0 && valores.password.length < 6}
        helperText={
          valores.password.length > 0 && valores.password.length < 6
            ? "La contraseña debe tener al menos 6 caracteres"
            : ""
        }
      />

      {/* Campo multilínea */}
      <TextField
        label="Descripción"
        value={valores.descripcion}
        onChange={handleChange('descripcion')}
        multiline
        rows={4}
        fullWidth
        placeholder="Escribe una descripción..."
      />
    </Stack>
  );
}
```

### Validación de Formularios

```jsx
import { TextField, Button, Alert, Stack } from '@mui/material';
import { useState } from 'react';

function FormularioConValidacion() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Función de validación
  const validarCampo = (nombre, valor) => {
    let error = '';
    
    switch (nombre) {
      case 'nombre':
        if (!valor.trim()) error = 'El nombre es obligatorio';
        else if (valor.length < 2) error = 'El nombre debe tener al menos 2 caracteres';
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!valor.trim()) error = 'El email es obligatorio';
        else if (!emailRegex.test(valor)) error = 'Email inválido';
        break;
        
      case 'telefono':
        const telefonoRegex = /^\d{9,10}$/;
        if (valor && !telefonoRegex.test(valor)) error = 'Teléfono inválido (9-10 dígitos)';
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (campo) => (event) => {
    const valor = event.target.value;
    setDatos(prev => ({ ...prev, [campo]: valor }));
    
    // Validar en tiempo real
    const error = validarCampo(campo, valor);
    setErrores(prev => ({ ...prev, [campo]: error }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validar todos los campos
    const nuevosErrores = {};
    Object.keys(datos).forEach(campo => {
      const error = validarCampo(campo, datos[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    
    setErrores(nuevosErrores);
    
    // Si no hay errores, enviar
    if (Object.keys(nuevosErrores).length === 0) {
      console.log('Datos enviados:', datos);
      setEnviado(true);
      // Aquí harías la llamada a tu API
    }
  };

  if (enviado) {
    return (
      <Alert severity="success" sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
        ¡Formulario enviado correctamente!
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
        <TextField
          label="Nombre *"
          value={datos.nombre}
          onChange={handleChange('nombre')}
          error={!!errores.nombre}
          helperText={errores.nombre}
          fullWidth
        />

        <TextField
          label="Email *"
          type="email"
          value={datos.email}
          onChange={handleChange('email')}
          error={!!errores.email}
          helperText={errores.email}
          fullWidth
        />

        <TextField
          label="Teléfono"
          value={datos.telefono}
          onChange={handleChange('telefono')}
          error={!!errores.telefono}
          helperText={errores.telefono || "Opcional"}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
        >
          Enviar
        </Button>
      </Stack>
    </form>
  );
}
```

---

## Botones

### Tipos de Botones

```jsx
import { Button, IconButton, Fab, Stack } from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Download as DownloadIcon 
} from '@mui/icons-material';

function TiposDeBotones() {
  return (
    <Stack spacing={2} direction="column" alignItems="center" sx={{ p: 2 }}>
      {/* Botones básicos */}
      <Stack spacing={2} direction="row">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>

      {/* Botones con colores */}
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" color="success">Success</Button>
      </Stack>

      {/* Botones con tamaños */}
      <Stack spacing={2} direction="row" alignItems="center">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </Stack>

      {/* Botones con iconos */}
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
        >
          Descargar
        </Button>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
        >
          Agregar
        </Button>
      </Stack>

      {/* Botones de icono */}
      <Stack spacing={2} direction="row">
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Stack>

      {/* Floating Action Button */}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Stack>
  );
}
```

### Botones con Estado de Carga

```jsx
import { Button, CircularProgress, Stack } from '@mui/material';
import { useState } from 'react';

function BotonesConCarga() {
  const [cargando, setCargando] = useState(false);

  const handleClick = async () => {
    setCargando(true);
    // Simular operación async
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCargando(false);
  };

  return (
    <Stack spacing={2} direction="row" sx={{ p: 2 }}>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={cargando}
        startIcon={cargando ? <CircularProgress size={20} /> : null}
      >
        {cargando ? 'Cargando...' : 'Enviar'}
      </Button>

      <Button
        variant="outlined"
        onClick={handleClick}
        disabled={cargando}
      >
        {cargando ? (
          <CircularProgress size={24} />
        ) : (
          'Procesar'
        )}
      </Button>
    </Stack>
  );
}
```

---

## Componentes de Selección

### Select (Selector)

```jsx
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormHelperText
} from '@mui/material';
import { useState } from 'react';

const paises = [
  { codigo: 'es', nombre: 'España' },
  { codigo: 'mx', nombre: 'México' },
  { codigo: 'ar', nombre: 'Argentina' },
  { codigo: 'co', nombre: 'Colombia' },
];

function ComponentesSelect() {
  const [valores, setValores] = useState({
    pais: '',
    edad: '',
    multiple: []
  });

  const handleChange = (campo) => (event) => {
    setValores({ ...valores, [campo]: event.target.value });
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {/* Select básico */}
      <FormControl fullWidth>
        <InputLabel>País</InputLabel>
        <Select
          value={valores.pais}
          label="País"
          onChange={handleChange('pais')}
        >
          {paises.map((pais) => (
            <MenuItem key={pais.codigo} value={pais.codigo}>
              {pais.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select con opciones fijas */}
      <FormControl fullWidth>
        <InputLabel>Rango de Edad</InputLabel>
        <Select
          value={valores.edad}
          label="Rango de Edad"
          onChange={handleChange('edad')}
        >
          <MenuItem value="18-25">18-25</MenuItem>
          <MenuItem value="26-35">26-35</MenuItem>
          <MenuItem value="36-45">36-45</MenuItem>
          <MenuItem value="46+">46+</MenuItem>
        </Select>
        <FormHelperText>Selecciona tu rango de edad</FormHelperText>
      </FormControl>

      {/* Select múltiple */}
      <FormControl fullWidth>
        <InputLabel>Idiomas (múltiple)</InputLabel>
        <Select
          multiple
          value={valores.multiple}
          onChange={handleChange('multiple')}
          label="Idiomas (múltiple)"
        >
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="en">Inglés</MenuItem>
          <MenuItem value="fr">Francés</MenuItem>
          <MenuItem value="de">Alemán</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
```

### Autocomplete

```jsx
import { Autocomplete, TextField, Stack, Chip } from '@mui/material';
import { useState } from 'react';

const tecnologias = [
  'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript',
  'Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP'
];

const usuarios = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, nombre: 'María García', email: 'maria@example.com' },
  { id: 3, nombre: 'Carlos López', email: 'carlos@example.com' },
];

function ComponentesAutocomplete() {
  const [seleccionado, setSeleccionado] = useState(null);
  const [multiple, setMultiple] = useState([]);

  return (
    <Stack spacing={3} sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
      {/* Autocomplete básico */}
      <Autocomplete
        options={tecnologias}
        renderInput={(params) => (
          <TextField {...params} label="Tecnología favorita" />
        )}
        onChange={(event, newValue) => setSeleccionado(newValue)}
      />

      {/* Autocomplete múltiple */}
      <Autocomplete
        multiple
        options={tecnologias}
        value={multiple}
        onChange={(event, newValue) => setMultiple(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tecnologías conocidas"
            placeholder="Selecciona múltiples"
          />
        )}
      />

      {/* Autocomplete con objetos */}
      <Autocomplete
        options={usuarios}
        getOptionLabel={(option) => option.nombre}
        renderOption={(props, option) => (
          <li {...props}>
            <div>
              <div>{option.nombre}</div>
              <div style={{ color: '#666', fontSize: '0.8em' }}>
                {option.email}
              </div>
            </div>
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Buscar usuario" />
        )}
      />

      {/* Autocomplete con creación libre */}
      <Autocomplete
        multiple
        options={tecnologias}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags personalizados"
            placeholder="Escribe y presiona Enter"
          />
        )}
      />
    </Stack>
  );
}
```

### Radio Buttons y Checkboxes

```jsx
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Switch,
  Stack
} from '@mui/material';
import { useState } from 'react';

function ComponentesSeleccion() {
  const [genero, setGenero] = useState('');
  const [intereses, setIntereses] = useState({
    deportes: false,
    musica: false,
    lectura: false,
    viajes: false
  });
  const [notificaciones, setNotificaciones] = useState(true);

  const handleInteresChange = (event) => {
    setIntereses({
      ...intereses,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {/* Radio Buttons */}
      <FormControl>
        <FormLabel>Género</FormLabel>
        <RadioGroup
          value={genero}
          onChange={(event) => setGenero(event.target.value)}
        >
          <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
          <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
          <FormControlLabel value="otro" control={<Radio />} label="Otro" />
        </RadioGroup>
      </FormControl>

      {/* Checkboxes */}
      <FormControl>
        <FormLabel>Intereses</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={intereses.deportes}
                onChange={handleInteresChange}
                name="deportes"
              />
            }
            label="Deportes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={intereses.musica}
                onChange={handleInteresChange}
                name="musica"
              />
            }
            label="Música"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={intereses.lectura}
                onChange={handleInteresChange}
                name="lectura"
              />
            }
            label="Lectura"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={intereses.viajes}
                onChange={handleInteresChange}
                name="viajes"
              />
            }
            label="Viajes"
          />
        </FormGroup>
      </FormControl>

      {/* Switch */}
      <FormControlLabel
        control={
          <Switch
            checked={notificaciones}
            onChange={(event) => setNotificaciones(event.target.checked)}
          />
        }
        label="Recibir notificaciones"
      />
    </Stack>
  );
}
```

---

## Espaciado y Tamaños

### Sistema de Espaciado

Material UI usa un sistema de espaciado basado en múltiplos de 8px por defecto.

```jsx
import { Box, Paper, Typography, Stack } from '@mui/material';

function SistemaEspaciado() {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {/* Padding con números */}
      <Paper sx={{ p: 1 }}>p: 1 = 8px padding</Paper>
      <Paper sx={{ p: 2 }}>p: 2 = 16px padding</Paper>
      <Paper sx={{ p: 3 }}>p: 3 = 24px padding</Paper>

      {/* Padding específico */}
      <Paper sx={{ 
        pt: 2,  // padding-top
        pb: 2,  // padding-bottom
        pl: 4,  // padding-left
        pr: 4   // padding-right
      }}>
        Padding específico
      </Paper>

      {/* Margin */}
      <Box sx={{ 
        m: 2,   // margin: 16px
        mx: 4,  // margin horizontal: 32px
        my: 1   // margin vertical: 8px
      }}>
        <Paper sx={{ p: 2 }}>
          Con margin
        </Paper>
      </Box>

      {/* Gap en containers */}
      <Box sx={{ 
        display: 'flex',
        gap: 2,  // gap: 16px
        flexWrap: 'wrap'
      }}>
        <Paper sx={{ p: 1, minWidth: 100 }}>Item 1</Paper>
        <Paper sx={{ p: 1, minWidth: 100 }}>Item 2</Paper>
        <Paper sx={{ p: 1, minWidth: 100 }}>Item 3</Paper>
      </Box>
    </Stack>
  );
}
```

### Breakpoints y Responsive

```jsx
import { Box, Typography } from '@mui/material';

function ResponsiveEspaciado() {
  return (
    <Box sx={{
      // Padding responsive
      p: { 
        xs: 1,  // 8px en móvil
        sm: 2,  // 16px en tablet
        md: 3,  // 24px en desktop
        lg: 4,  // 32px en desktop grande
        xl: 5   // 40px en desktop XL
      },
      // Margin responsive
      m: {
        xs: 1,
        md: 2
      },
      // Ancho responsive
      width: {
        xs: '100%',    // Ancho completo en móvil
        sm: '80%',     // 80% en tablet
        md: 600,       // 600px fijo en desktop
        lg: 800,       // 800px en desktop grande
        xl: 1000       // 1000px en XL
      },
      mx: 'auto' // Centrar horizontalmente
    }}>
      <Typography variant="h4" gutterBottom>
        Contenido Responsive
      </Typography>
      <Typography>
        Este contenedor tiene espaciado y ancho que se adapta a diferentes tamaños de pantalla.
      </Typography>
    </Box>
  );
}
```

### Tamaños de Componentes

```jsx
import { 
  TextField, 
  Button, 
  Chip, 
  Avatar,
  Stack 
} from '@mui/material';

function TamañosComponentes() {
  return (
    <Stack spacing={4} sx={{ p: 2 }}>
      {/* Tamaños de TextField */}
      <Stack spacing={2}>
        <TextField size="small" label="Campo pequeño" />
        <TextField size="medium" label="Campo mediano (default)" />
        <TextField label="Campo normal" />
      </Stack>

      {/* Tamaños de Button */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button size="small" variant="contained">Small</Button>
        <Button size="medium" variant="contained">Medium</Button>
        <Button size="large" variant="contained">Large</Button>
      </Stack>

      {/* Tamaños de Chip */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="Small" size="small" />
        <Chip label="Medium" />
      </Stack>

      {/* Tamaños de Avatar */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
        <Avatar>M</Avatar>
        <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
        <Avatar sx={{ width: 72, height: 72 }}>XL</Avatar>
      </Stack>
    </Stack>
  );
}
```

---

## Ejemplos Prácticos

### Formulario Completo de Registro

```jsx
import {
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Stack,
  Divider
} from '@mui/material';
import { useState } from 'react';

function FormularioRegistro() {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    pais: '',
    ciudad: '',
    intereses: {
      tecnologia: false,
      deportes: false,
      arte: false,
      viajes: false
    },
    newsletter: false
  });

  const paises = [
    'España', 'México', 'Argentina', 'Colombia', 'Chile', 'Perú'
  ];

  const handleChange = (campo) => (event) => {
    if (campo.includes('.')) {
      const [parent, child] = campo.split('.');
      setDatos(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: event.target.checked
        }
      }));
    } else {
      const valor = event.target.type === 'checkbox' 
        ? event.target.checked 
        : event.target.value;
      setDatos(prev => ({ ...prev, [campo]: valor }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del formulario:', datos);
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Registro de Usuario
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Datos personales */}
          <Typography variant="h6" color="primary">
            Datos Personales
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={datos.nombre}
                onChange={handleChange('nombre')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                value={datos.apellido}
                onChange={handleChange('apellido')}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={datos.email}
                onChange={handleChange('email')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={datos.telefono}
                onChange={handleChange('telefono')}
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Ubicación */}
          <Typography variant="h6" color="primary">
            Ubicación
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>País</InputLabel>
                <Select
                  value={datos.pais}
                  label="País"
                  onChange={handleChange('pais')}
                >
                  {paises.map((pais) => (
                    <MenuItem key={pais} value={pais}>
                      {pais}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                value={datos.ciudad}
                onChange={handleChange('ciudad')}
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Intereses */}
          <FormControl>
            <FormLabel component="legend">
              <Typography variant="h6" color="primary">
                Intereses
              </Typography>
            </FormLabel>
            <FormGroup>
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={datos.intereses.tecnologia}
                        onChange={handleChange('intereses.tecnologia')}
                      />
                    }
                    label="Tecnología"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={datos.intereses.deportes}
                        onChange={handleChange('intereses.deportes')}
                      />
                    }
                    label="Deportes"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={datos.intereses.arte}
                        onChange={handleChange('intereses.arte')}
                      />
                    }
                    label="Arte y Cultura"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={datos.intereses.viajes}
                        onChange={handleChange('intereses.viajes')}
                      />
                    }
                    label="Viajes"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>

          <Divider />

          {/* Suscripción */}
          <FormControlLabel
            control={
              <Checkbox
                checked={datos.newsletter}
                onChange={handleChange('newsletter')}
              />
            }
            label="Suscribirse al newsletter"
          />

          {/* Botones */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" type="button">
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Registrarse
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
```

### Dashboard con Grid y Tabla

```jsx
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney
} from '@mui/icons-material';

const datosVentas = [
  { id: 1, producto: 'Laptop Dell', vendedor: 'Ana García', cantidad: 2, total: 2400, estado: 'completado' },
  { id: 2, producto: 'iPhone 13', vendedor: 'Carlos López', cantidad: 1, total: 999, estado: 'pendiente' },
  { id: 3, producto: 'Tablet Samsung', vendedor: 'María Rodríguez', cantidad: 3, total: 1200, estado: 'completado' },
  { id: 4, producto: 'Auriculares Sony', vendedor: 'Juan Pérez', cantidad: 5, total: 750, estado: 'cancelado' }
];

function Dashboard() {
  const tarjetas = [
    {
      titulo: 'Ventas Totales',
      valor: '$45,230',
      icono: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      progreso: 85
    },
    {
      titulo: 'Usuarios Activos',
      valor: '1,284',
      icono: <People sx={{ fontSize: 40 }} />,
      color: '#2196f3',
      progreso: 65
    },
    {
      titulo: 'Pedidos',
      valor: '342',
      icono: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      progreso: 75
    },
    {
      titulo: 'Conversión',
      valor: '12.5%',
      icono: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      progreso: 45
    }
  ];

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'completado': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelado': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Tarjetas de métricas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {tarjetas.map((tarjeta, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: tarjeta.color, mr: 2 }}>
                    {tarjeta.icono}
                  </Avatar>
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      {tarjeta.titulo}
                    </Typography>
                    <Typography variant="h5">
                      {tarjeta.valor}
                    </Typography>
                  </div>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={tarjeta.progreso}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: tarjeta.color
                    }
                  }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {tarjeta.progreso}% del objetivo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabla de ventas recientes */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ventas Recientes
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Vendedor</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosVentas.map((venta) => (
                    <TableRow
                      key={venta.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        #{venta.id}
                      </TableCell>
                      <TableCell>{venta.producto}</TableCell>
                      <TableCell>{venta.vendedor}</TableCell>
                      <TableCell align="right">{venta.cantidad}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          ${venta.total}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={venta.estado}
                          color={getColorEstado(venta.estado)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
```

---

## Consejos y Mejores Prácticas

### 1. Estructura de Proyecto
```
src/
  components/
    common/          # Componentes reutilizables
    forms/          # Componentes de formularios
    layout/         # Componentes de layout
  theme/
    index.js        # Configuración del tema
  utils/
    validation.js   # Utilidades de validación
```

### 2. Tema Consistente
```jsx
// theme/index.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Sin mayúsculas automáticas
          borderRadius: 8,
        },
      },
    },
  },
});
```

### 3. Validación de Formularios
```jsx
// utils/validation.js
export const validationRules = {
  required: (value) => value.trim() !== '' || 'Campo obligatorio',
  email: (value) => /\S+@\S+\.\S+/.test(value) || 'Email inválido',
  minLength: (min) => (value) => 
    value.length >= min || `Mínimo ${min} caracteres`
};
```

### 4. Responsive Design
- Usa Grid para layouts
- Define breakpoints consistentes
- Prueba en diferentes tamaños de pantalla
- Usa Stack para layouts simples y espaciado automático
- Combina Stack con Grid para layouts complejos

### 5. Accesibilidad
- Usa labels en formularios
- Proporciona feedback visual
- Usa colores con buen contraste
- Incluye textos alternativos

---

¡Esta guía te proporciona una base sólida para trabajar con Material UI! Recuerda que la práctica es clave para dominar estos conceptos. Comienza con componentes simples y gradualmente construye interfaces más complejas.

**Recursos adicionales:**
- [Documentación oficial de Material UI](https://mui.com/)
- [Playground en línea](https://codesandbox.io/s/material-ui)
- [Figma Design Kit](https://mui.com/design-kits/)
