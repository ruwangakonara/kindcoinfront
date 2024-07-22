import "./Header.css";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

const Header = ({ toggleSidebar }) => {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Kindcoin
          </Typography>
          <Typography variant="h6">
            Howdy, admin
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

export default Header