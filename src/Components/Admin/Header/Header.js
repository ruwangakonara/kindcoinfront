import classes from "./Header.module.css";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import {Image} from 'semantic-ui-react'
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
            {/* <ProfilePic/> */}
            <Image src={'https://via.placeholder.com/150'} circular/>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

export default Header