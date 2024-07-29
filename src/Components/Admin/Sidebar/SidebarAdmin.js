// import classes from "./SidebarAdmin.module.css"
import "./sidebarAdmin.css"
// import React, { useState } from 'react';
import {
  MenuItem,
  Header,
  Icon,
  Image,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ visible }) => {

  const items = [
    { name: 'Dashboard', path: '/admin/home', icon: 'home' },
    { name: 'Donors', path: '/admin/Donor_List/Donors', icon: 'address book' },
    { name: 'Beneficiaries', path: '/admin/Beneficiary_List/Beneficiaries', icon: 'address card outline' },
    { name: 'Statistics', path: '/admin/overall_stats', icon: 'chart line' },
    { name: 'Register', path: '/admin/register/crew_member', icon: 'registered' },
    { name: 'Complaints', path: '/admin/view/complaints', icon: 'compose' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' }
  ];

  return (
    <div>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
      >
          {/* {items.map((item, index) => (
            <MenuItem as={Link} to={item.path} key={index}>
              <Icon name={item.icon} />
              {item.name}
            </MenuItem>
          ))} */}

          <MenuItem as='a' className="home">
            <Icon name='home' />
            Home
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='address book' />
            Donors
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='address card outline' />
            Beneficiaries
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='chart line' />
            Statistics
          </MenuItem>
          <MenuItem as='a'>
            <Icon name='registered' />
            Register
          </MenuItem>
          <MenuItem as='a'>
          <Icon name='compose' />
          Complaints
        </MenuItem>
          <MenuItem as='a'>
            <Icon name='settings' />
            Settings
          </MenuItem>
      </Sidebar>
    </div>
  )
}

export default SidebarAdmin