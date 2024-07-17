import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, description }) => {
    return (
        <div className='dashboard-card'>
            <h3>{title}</h3>
            <p>{description}</p>
            <button>Button</button>
        </div>
    );
}

export default DashboardCard;