import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TrialHome from './assets/TrialHome.jpg';

const Landing: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        color: '#fff',
        backgroundImage: `url(${TrialHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
        Welcome to Label Maker!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: 400 }}>
        Generate labels for your product with ease. Whatever your product, we've got you covered.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ADD8E6',
            color: '#000',
            '&:hover': { backgroundColor: '#72BCD4' },
          }}
        >
          Sign Up to Start
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#ADD8E6',
            color: '#ADD8E6',
            '&:hover': {
              backgroundColor: 'rgba(255, 183, 77, 0.2)',
            },
          }}
        >
          Watch Demo
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
