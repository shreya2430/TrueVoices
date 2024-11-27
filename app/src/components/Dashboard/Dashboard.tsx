import React from "react";
import VideocamIcon from '@mui/icons-material/Videocam';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Button } from "@/components/ui/button";

import {
  Box,
  Typography,
  Card,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./dashboard.css"; 

const Dashboard: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="dashboard">
      {/* Header */}
      <Box className="header">
        <h2 className="dashboard-title">TrueVoices</h2>
        <IconButton onClick={handleMenuOpen}>
          <AccountCircleIcon className="menu-icon" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
        </Menu>
      </Box>

      <h3 className="heading-overview">Overview</h3>

      {/* Overview Section */}
      <Box className="overview-section">
       <Card className="card">
  <Box className="card-content">
              <Box className="upper">
        <Typography className="card-title">Total Videos</Typography>
         <VideocamIcon className="card-icon" />
          </Box>
          <Box className="lower">
           <Typography className="card-value">0/2</Typography>
            </Box>
  </Box>
</Card>

<Card className="card">
  <Box className="card-content">
    <Box className="upper">
        <Typography className="card-title">Total Spaces</Typography>
        <AutoAwesomeIcon className="card-icon"/>
          </Box>
          <Box className="lower">
            <Typography className="card-value">0</Typography>
            </Box>
            </Box>
</Card>

<Card className="card">
          <Box className="card-content">
            
              <Box className="upper">
         <Typography className="card-title">Current Plan</Typography>
        <BusinessCenterIcon className="card-icon" />
          </Box>
          <Box className="lower">
            <Typography className="card-value">Starter</Typography>
            <Button className="upgrade-button">Upgrade</Button>

            </Box>
            </Box>
</Card>
      </Box>
 <h3 className="heading-space">Spaces</h3>
      {/* Spaces Section */}
      <Card className="spaces-section">
        <Box className="no-spaces-text">
          <Typography>No spaces yet</Typography>
          <Typography>
            Create your first space to start collecting testimonials
          </Typography>
          <Button className="create-space-button">+ Create a new space</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
