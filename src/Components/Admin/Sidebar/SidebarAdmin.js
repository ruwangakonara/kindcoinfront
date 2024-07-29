import classes from "./SidebarAdmin.module.css"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ onItemClick }) => {

  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item)
    if(onItemClick){
      onItemClick(item);
    }
  };

  const items = [
    { name: 'Dashboard', path: '/admin/home' },
    { name: 'Donors', path: '/admin/Donor_List/Donors' },
    { name: 'Beneficiaries', path: '/admin/Beneficiary_List/Beneficiaries' },
    { name: 'Statistics', path: '/admin/overall_stats' },
    { name: 'Register', path: '/admin/register/crew_member' },
    { name: 'Complaints', path: '/admin/view/complaints' },
    { name: 'Settings', path: '/admin/settings' }
  ];

  return (
    <div className={classes.sidebar}>
      <nav>
        <ul>

          {items.map((item) => (
            <li
              key={item.name}
              className={`${classes.litags} ${activeItem === item.name ? classes.active : ''}`}
              onClick={() => handleItemClick(item.name)}
            >
              <Link to={item.path} 
              style={{ color: activeItem === item.name ? 'black' : 'blue' }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SidebarAdmin