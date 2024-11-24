// import { ThemeContext } from '../ThemeContext.jsx';
// import { Switch } from '@mui/material';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TrueVoices
        {/* <Switch checked={theme === 'dark'} onChange={toggleTheme} /> */}
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Features</Button>
        <Button color="inherit">Pricing</Button>
        <Button color="inherit">Sign In</Button>
        {/* <Button color="inherit" variant="outlined">Get Started</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;