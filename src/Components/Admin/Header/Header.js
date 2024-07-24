import "./Header.css";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ProfilePic from "../Profile/ProfilePic";

const Header = ({ toggleSidebar }) => {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Kindcoin
          </Typography>
          <Typography variant="h6">
            <ProfilePic/>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

export default Header