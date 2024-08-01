import React from 'react'
import {
  MenuItem,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
import './SidebarCrew.css';
import { Link } from 'react-router-dom';
const SidebarCrew = () => (
  <Sidebar
    as={Menu}
    animation='overlay'
    icon='labeled'
    inverted
    vertical
    visible
    width='thin'
    style={{ minHeight: '100vh' }}

  >
    <MenuItem as={Link} to='/crew/home' className='home'>
      <Icon name='home' />
      Home
    </MenuItem>
    <MenuItem as={Link} to='/crew/requests' >
      <Icon name='book' />
      Verify Requests
    </MenuItem>
    <MenuItem as={Link} to='/crew/recipients'>
      <Icon name='male' />
      Verify Recepients
    </MenuItem>
    <MenuItem as={Link} to='/crew/proofs'>
      <Icon name='file outline' />
      Verify Donation Proofs
    </MenuItem>
    <MenuItem as={Link} to='/crew/token_transfer'>
      <Icon name='credit card' />
      Token Transfer
    </MenuItem>
    <MenuItem as={Link} to='/crew/settings' className='settings'>
      <Icon name='settings' />
      Settings
    </MenuItem>
  </Sidebar>
)

export default SidebarCrew;
