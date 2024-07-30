import React from 'react'
import {
  MenuItem,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
import './SidebarCrew.css';
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
    <MenuItem as='a' className='home'>
      <Icon name='home' />
      Home
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='book' />
      Verify Requests
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='male' />
      Verify Recepients
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='file outline' />
      Verify Donation Proofs
    </MenuItem>
    <MenuItem as='a'>
      <Icon name='credit card' />
      Token Transfer
    </MenuItem>
    <MenuItem as='a' className='settings'>
      <Icon name='settings' />
      Settings
    </MenuItem>
  </Sidebar>
)

export default SidebarCrew;
