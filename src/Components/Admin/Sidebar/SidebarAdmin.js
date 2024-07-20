import "./SidebarAdmin.css"
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Person, Assessment, Assignment, Report, Settings } from '@mui/icons-material';

const SidebarAdmin = ({ visible }) => {
    // return (
    //     <div className={`sidebar ${visible ? 'visible' : ''}`}>
    //         <h1>Sidebar_Admin</h1>
    //         <div className="sidebar-item">
    //             <Link to="/donor">Donor</Link>
    //             <a href="">Donor</a>
    //         </div>
    //         <div className="sidebar-item">
    //             <Link to="/donees">Donees</Link>
    //             <a href="">Donor</a>
    //         </div>
    //         <div className="sidebar-item">
    //             {/* <Link to="/statistics">Statistics</Link> */}
    //             <a href="">Donor</a>
    //         </div>
    //         <div className="sidebar-item">
    //             {/* <Link to="/register">Register</Link> */}
    //             <a href="">Donor</a>
    //         </div>
    //         <div className="sidebar-item">
    //             {/* <Link to="/complaints">Complaints</Link> */}
    //             <a href="">Donor</a>
    //         </div>
    //         <div className="sidebar-item">
    //             {/* <Link to="/settings">Settings</Link> */}
    //             <a href="">Donor</a>
    //         </div>
    //   </div>
    // )

    return (
        <div className={`sidebar ${visible ? 'visible' : ''}`}>
          <List>
            <ListItem button component={Link} to="/donor">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Donor" />
            </ListItem>
            <ListItem button component={Link} to="/donees">
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="Donees" />
            </ListItem>
            <ListItem button component={Link} to="/statistics">
              <ListItemIcon><Assessment /></ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
            <ListItem button component={Link} to="/complaints">
              <ListItemIcon><Report /></ListItemIcon>
              <ListItemText primary="Complaints" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
    );
}

export default SidebarAdmin