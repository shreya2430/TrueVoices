// src/components/Team.jsx

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
declare module "*.jpeg";
import './Team.css';  // Import the CSS file

const teamMembers = [
  {
    name: 'Shreya Wanisha',
    image: '/TeamImages/ShreyaWanisha.jpeg',  // Ensure the path is correct relative to public folder
    linkedin: 'https://www.linkedin.com/in/shreya-wanisha/',
    bio: 'Full-stack developer with a passion for building web applications. Expertise in Java, Spring Boot, React, and Node.js.',
  },
  {
    name: 'Team Member 2',
    image: '/assets/TeamImages/member2.jpg',
    linkedin: 'https://www.linkedin.com/in/team-member-2/',
    bio: 'Full-stack developer focusing on React and Node.js.',
  },
  {
    name: 'Team Member 3',
    image: '/assets/TeamImages/member2.jpg',
    linkedin: 'https://www.linkedin.com/in/team-member-2/',
    bio: 'Full-stack developer focusing on React and Node.js.',
  },
  {
    name: 'Team Member 4',
    image: '/assets/TeamImages/member2.jpg',
    linkedin: 'https://www.linkedin.com/in/team-member-2/',
    bio: 'Full-stack developer focusing on React and Node.js.',
  },
  // Add more team members here
];

const Team = () => {
  return (
    <Container sx={{ textAlign: 'center', my: 8 }}>
      <Typography variant="h4" gutterBottom>Meet Our Team</Typography>
      <Grid container spacing={2} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className="team-member-img-container">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Box
                  component="img"
                  className="team-member-img"
                  src={member.image}
                  alt={member.name}
                />
                <div className="bioOverlay">
                  <Typography variant="body2">{member.bio}</Typography>
                </div>
              </a>
            </div>
            {/* Name as plain text but clickable */}
            <Typography 
              variant="h6" 
              className="team-member-name" 
              component="span"
              sx={{ cursor: 'pointer', color: 'inherit' }}
              onClick={() => window.open(member.linkedin, "_blank")}
            >
              {member.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;