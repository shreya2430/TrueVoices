import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';

const features = [
  {
    title: 'Collect and Display Testimonials',
    subtitle: 'All in one solution',
    description: 'Create a dedicated landing page for your business. Share the page link easily via email, social media, or SMS. Setup can be done in two minutes.',
  },
  {
    title: 'Easy to Manage',
    subtitle: 'A dashboard to manage all testimonials',
    description: 'You will have a simple & clean dashboard to manage all testimonials in one place. It\'s like your email inbox, but designed for your social proof!',
  },
  {
    title: 'Track the Metrics',
    subtitle: 'Understand how video testimonials are performing',
    description: 'Track metrics from all embedded videos, help your marketing team understand performance, and promote the best-performing videos.',
    note: '* Available in the Ultimate plan',
  },
  {
    title: 'More Social Proof',
    subtitle: 'Not only text and video testimonials',
    description: 'Manage testimonials from social media, video platforms, and review sites in a single place!',
  },
  {
    title: 'Embed the Wall of Love',
    subtitle: 'The best testimonials all in one place',
    description: 'Showcase all your favorite testimonials. Embed it on your website in under a minute with no coding knowledge required!',
  },
];

const Features = () => {
  return (
    <Container sx={{ py: 8 }} id="features">
      <Typography variant="h4" align="center" gutterBottom>Our Features</Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{feature.subtitle}</Typography>
                <Typography variant="body2" mt={1}>{feature.description}</Typography>
                {feature.note && (
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">{feature.note}</Typography>
                  </Box>
                )}
              </CardContent>
              <Button variant="contained" color="primary" sx={{ mt: 'auto' }}>Try it for Free</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;