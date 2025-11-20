import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLocalError('');
    setError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setLocalError('Por favor completa todos los campos');
      return;
    }

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/');
    }
  };

  const demoAccounts = [
    { username: 'usuario1', password: 'password123', name: 'Usuario Demo' },
    { username: 'chef', password: 'chef123', name: 'Chef Principal' },
    { username: 'admin', password: 'admin123', name: 'Administrador' },
  ];

  const handleDemoLogin = (username, password) => {
    setFormData({ username, password });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
            border: '1px solid #e2e8f0',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: -0.5,
                }}
              >
                Iniciar Sesión
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accede a tu cuenta para ver tus recetas favoritas
              </Typography>
            </Box>

            {/* Alerts */}
            {(error || localError) && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error || localError}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                disabled={loading}
                placeholder="Ingresa tu usuario"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#06b6d4',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                disabled={loading}
                placeholder="Ingresa tu contraseña"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#06b6d4',
                    },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#0891b2',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#06b6d4',
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>O usa una cuenta demo</Divider>

            {/* Demo Accounts */}
            <Grid container spacing={1}>
              {demoAccounts.map((account, index) => (
                <Grid item xs={12} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => handleDemoLogin(account.username, account.password)}
                    disabled={loading}
                    sx={{
                      borderColor: '#e2e8f0',
                      color: '#0891b2',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#06b6d4',
                        backgroundColor: '#f0f9ff',
                      },
                    }}
                  >
                    {account.name}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {/* Info */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                backgroundColor: '#f0f9ff',
                borderRadius: 1,
                border: '1px solid #e0f2fe',
              }}
            >
              <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#0c4a6e', fontWeight: 600 }}>
                Para probar el sistema de autenticación:
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#0c4a6e' }}>
                👤 Usuario: <strong>admin</strong>
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: '#0c4a6e' }}>
                🔑 Contraseña: <strong>admin123</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
