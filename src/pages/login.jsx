import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Chip
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validaciones básicas
    if (!username.trim() || !password.trim()) {
      setLocalError('Por favor, complete todos los campos');
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      // Redirigir al dashboard después del login exitoso
      navigate('/dashboard');
    } else {
      setLocalError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        {/* Icono y título */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <LockOutlinedIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>

        <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
          Iniciar Sesión
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ingrese sus credenciales para acceder
        </Typography>

        {/* Información de credenciales de prueba */}
        <Paper 
          sx={{ 
            width: '100%', 
            p: 2, 
            mb: 3, 
            bgcolor: 'info.light',
            border: '1px solid',
            borderColor: 'info.main'
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            📋 Credenciales de prueba:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2">
              <strong>Usuario:</strong> admin
            </Typography>
            <Typography variant="body2">
              <strong>Contraseña:</strong> admin123
            </Typography>
          </Box>
        </Paper>

        {/* Mensajes de error */}
        {(localError || error) && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {localError || error}
          </Alert>
        )}

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Chip label="o" size="small" />
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?{' '}
              <Button size="small" sx={{ textTransform: 'none' }}>
                Registrarse
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Información adicional */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Este es un ejemplo de autenticación con Context API
        </Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;

