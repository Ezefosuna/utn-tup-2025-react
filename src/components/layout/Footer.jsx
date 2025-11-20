import { Box, Container, Typography, Stack, Link, Grid, Divider } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Recetas Deliciosas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Tu fuente de inspiración culinaria con recetas fáciles, deliciosas y accesibles para todos los niveles.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Enlaces Rápidos
            </Typography>
            <Stack spacing={1}>
              <Link href="/" underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Inicio
              </Link>
              <Link href="/recetas" underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Recetas
              </Link>
              <Link href="#" underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Sobre Nosotros
              </Link>
              <Link href="#" underline="hover" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                Contacto
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contacto
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Email sx={{ fontSize: 18, mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    ezefernandezosuna@gmail.com
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Phone sx={{ fontSize: 18, mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    +54 (11) 1234-5678
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOn sx={{ fontSize: 18, mt: 0.5, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Paraná, Entre Ríos
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Bottom Footer */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            © {currentYear} Recetas Deliciosas. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Hecho con pasión para los amantes de la cocina
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
