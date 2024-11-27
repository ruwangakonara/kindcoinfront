import React from 'react';
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './OpenRequest.css';

const OpenRequest = ({ request , image, beneficiary}) => {
    return (
        <Card className="request-card">
            <Card.Content>
                <Label color="green" ribbon="right" className="request-status-label">
                    Open Request
                </Label>
                <Image
                    src={(image !== "https://via.placeholder.com/150")
                        ? `http://localhost:9013/images/profileimages/beneficiary/${image}`
                        : image}
                    wrapped
                    ui={false}
                    className="request-image"
                />
                <Card.Header>{request.title}</Card.Header>
                <Card.Meta>{beneficiary.name}</Card.Meta>
                <Card.Description>
                    {request.verified ? (
                        <span style={{ color: 'green' }}>
                            <Icon name="flag" color="green" /> Verified
                        </span>
                    ) : (
                        <span style={{ color: 'red' }}>
                            <Icon name="flag" color="red" /> Not Verified
                        </span>
                    )}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={`${request._id}`} color="blue" fluid>
                    View Request
                </Button>
            </Card.Content>
        </Card>
    );
};

export default OpenRequest;
