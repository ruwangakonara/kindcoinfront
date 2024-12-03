import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Image,
  Button
} from 'semantic-ui-react';

import './DashboardCard.css';

const CrewDashboardCard = ({ title, description, imageSrc, buttonLabel, buttonPath }) => {
  const handleButtonClick = () => {
    window.location.href = buttonPath;
  };

  return (
    <Card
      className='crew-dashboard-card'
      style={{
        height: '400px', // Fixed card height
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem'
      }}
    >
      <Image src={imageSrc} />
      <CardContent>
        <CardHeader>{title}</CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button onClick={handleButtonClick}>{buttonLabel}</Button>
      </CardContent>
    </Card>
  );
}

export default CrewDashboardCard;