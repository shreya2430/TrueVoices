import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.200', py: 3, mt: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          <Link href="#" color="inherit" sx={{ mx: 2 }}>About</Link>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>Privacy Policy</Link>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>Contact Us</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} TrueVoices. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;