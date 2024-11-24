import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Hero = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to TrueVoices
      </Typography>
      <Typography variant="h5" paragraph>
        Collect and showcase authentic testimonials from your customers with ease.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Your customers’ voices are your most powerful marketing tool. With TrueVoices, you can effortlessly collect, manage, and embed testimonials—no coding required. Build trust and credibility through genuine feedback from satisfied customers. Set up your testimonial page in minutes and watch your brand thrive!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Sign Up
        </Button>
        <Button variant="outlined" color="primary">
          Learn More
        </Button>
      </Box>
    </Container>
  );
};

export default Hero;