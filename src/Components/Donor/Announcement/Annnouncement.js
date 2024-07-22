import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import './announcement.css';

const Announcement = ({ announcement }) => {
    return (
        <Card fluid className="announcement-card">
            <Card.Content>
                <Card.Header className="announcement-title">{announcement.title}</Card.Header>
                <Card.Meta className="announcement-meta">
                    <Icon name="calendar" /> {announcement.created}
                </Card.Meta>
                <Card.Description className="announcement-body">
                    {announcement.body}
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default Announcement;
