import {
  Modal,
  Box,
  IconButton,
  Tooltip,
  Button,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useState } from 'react';

export default function RecetaImageModal({ image, title, onViewRecipe }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(102, 126, 234, 0)',
            transition: 'background 0.3s ease-in-out',
          },
          '&:hover::after': {
            background: 'rgba(102, 126, 234, 0.2)',
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: '160px',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.95)',
            transition: 'filter 0.3s ease-in-out',
          }}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'scaleUp 0.3s ease-out',
            '@keyframes scaleUp': {
              from: {
                transform: 'scale(0.8)',
                opacity: 0,
              },
              to: {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        >
          {/* Imagen grande */}
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />

          {/* Botón cerrar */}
          <Tooltip title="Cerrar">
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'rotate(90deg)',
                },
                transition: 'all 0.3s ease-in-out',
                zIndex: 10,
              }}
            >
              <CloseIcon sx={{ color: '#333' }} />
            </IconButton>
          </Tooltip>

          {/* Botón ver receta completa */}
          <Button
            onClick={() => {
              handleClose();
              onViewRecipe();
            }}
            startIcon={<OpenInNewIcon />}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
              py: 1,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.6)',
                transform: 'translateX(-50%) translateY(-2px)',
              },
              zIndex: 10,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Ver Receta Completa
          </Button>
        </Box>
      </Modal>
    </>
  );
}
