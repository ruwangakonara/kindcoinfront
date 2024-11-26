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
    <Card className='dashboard-card'>
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