import React from 'react';
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './OpenRequest.css';

const ClosedRequest = ({ request }) => {
    return (
        <Card className="request-card">
            <Card.Content>
                <Label color="red" ribbon="right" className="request-status-label">
                    Closed Request
                </Label>
                <Image
                    src={request.image}
                    wrapped
                    ui={false}
                    className="request-image"
                />
                <Card.Header>{request.title}</Card.Header>
                <Card.Meta>{request.beneficiaryName}</Card.Meta>
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
                <Button as={Link} to={`${request.id}`} color="blue" fluid>
                    View Request
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ClosedRequest;
