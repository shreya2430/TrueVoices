import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TrueVoices
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Features</Button>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;