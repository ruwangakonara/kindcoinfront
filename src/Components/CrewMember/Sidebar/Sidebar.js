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
    style={{ minHeight: '100vh', backgroundColor: '#0f1d29' }}

  >
    {/* Check semantic */}
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
    <MenuItem as={Link} to='/crew/doc_verify'>
      <Icon name='dochub' />
      Attestation Fee
    </MenuItem>
    <MenuItem as={Link} to='/crew/dispatch'>
      <Icon name='money' />
      Token Batch
    </MenuItem>
    <MenuItem as={Link} to='/crew/goods_donations' className='goods'>
      <Icon name='food' />
      Goods Donations
    </MenuItem>
  </Sidebar>
)

export default SidebarCrew;