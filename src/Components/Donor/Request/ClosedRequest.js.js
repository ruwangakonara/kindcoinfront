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
                    src={(request.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + request.profile_image): "https://via.placeholder.com/150"}
                    wrapped
                    ui={false}
                    className="request-image"
                />
                <Card.Header>{request.requestDetails.title}</Card.Header>
                <Card.Meta>{request.name}</Card.Meta>
                <Card.Description>
                    {request.requestDetails.verified ? (
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
                <Button as={Link} to={`${request.requestDetails._id}`} color="blue" fluid>
                    View Request
                </Button>
            </Card.Content>
        </Card>
    );
};

export default ClosedRequest;
