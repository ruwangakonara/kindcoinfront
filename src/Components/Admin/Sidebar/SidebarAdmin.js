import classes from "./SidebarAdmin.module.css"
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className={classes.sidebar}>
      <nav>
        <ul>
          <li className={classes.litags}>
            <Link to="/admin/home">Dashboard</Link>
          </li>
          <li className={classes.litags}> 
            <Link to="/admin/Donor_List/Donors">Donor</Link>
          </li>
          <li className={classes.litags}>
            <Link to="/admin/Beneficiary_List/Beneficiaries">Beneficiaries</Link>
          </li>
          <li className={classes.litags}>
            <Link to="/admin/overall_stats">Statistics</Link>
          </li>
          <li className={classes.litags}>
            <Link to="/admin/register/crew_member">Register</Link>
          </li>
          <li className={classes.litags}>
            <Link to="/admin/view/complaints">Complaints</Link>
          </li>
          <li className={classes.litags}>
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarAdmin