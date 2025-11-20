import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  VpnKey as VpnKeyIcon,
  Logout as LogoutIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../components/auth/ProtectedRoute';

function ProfilePageContent() {
  const navigate = useNavigate();
  const { user, token, logout, loading, getProtectedData } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGetProtectedData = async () => {
    setDataLoading(true);
    setError(null);
    try {
      const data = await getProtectedData();
      setProtectedData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 300,
              mb: 1,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              letterSpacing: -0.5,
            }}
          >
            Mi Perfil
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Bienvenido, {user?.fullName}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* User Info Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                border: '1px solid #e2e8f0',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
                  Información de Cuenta
                </Typography>

                <Stack spacing={2}>
                  {/* Full Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon sx={{ color: '#0891b2' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Nombre Completo
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {user?.fullName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon sx={{ color: '#0891b2' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Correo Electrónico
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Username */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon sx={{ color: '#0891b2' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Usuario
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {user?.username}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    mt: 3,
                    backgroundColor: '#ef4444',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#dc2626',
                    },
                  }}
                >
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Info */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                border: '1px solid #e2e8f0',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
                  Seguridad
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <SecurityIcon sx={{ color: '#0891b2' }} />
                    <Typography variant="subtitle2">
                      Token de Autenticación
                    </Typography>
                  </Box>
                  <Chip
                    label="Activo"
                    color="success"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      wordBreak: 'break-all',
                      backgroundColor: '#f0f9ff',
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid #e0f2fe',
                      color: '#0c4a6e',
                      fontFamily: 'monospace',
                    }}
                  >
                    {token?.substring(0, 50)}...
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGetProtectedData}
                  disabled={dataLoading}
                  sx={{
                    borderColor: '#0891b2',
                    color: '#0891b2',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#06b6d4',
                      backgroundColor: '#f0f9ff',
                    },
                  }}
                >
                  {dataLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Cargando...
                    </>
                  ) : (
                    'Obtener Datos Protegidos'
                  )}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Protected Data */}
          {protectedData && (
            <Grid item xs={12}>
              <Card
                sx={{
                  boxShadow: '0 4px 12px rgba(6, 182, 212, 0.1)',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f0f9ff',
                }}
              >
                <CardContent>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Datos protegidos cargados exitosamente
                  </Alert>
                  
                  <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                    {protectedData.message}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Recetas Favoritas
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#0891b2' }}>
                          {protectedData.data.favoritos}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Recetas Guardadas
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#0891b2' }}>
                          {protectedData.data.recetasGuardadas}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 2 }}
                  >
                    Última actualización: {new Date(protectedData.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
