import React from 'react';
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './OpenRequest.css';


const ClosedRequest = ({ request , image, beneficiary}) => {
    const requestTypeIcon = request.type === 'goods' ? 'box' : 'money bill alternate'; // Box for goods, Money for monetary
    const requestTypeColor = request.type === 'goods' ? 'brown' : 'orange'; // Brown for goods, Orange for monetary
    const requestTypeText = request.type === 'goods' ? 'Goods Request' : 'Monetary Request';
    return (
        <Card className="request-card">
            <Card.Content>
                <Label color="red" ribbon="right" className="request-status-label">
                    Closed Request
                </Label>
                <Image
                    src={(image !== "https://via.placeholder.com/150")
                        ? `http://localhost:9013/images/profileimages/beneficiary/${image}`
                        : image}
                    wrapped
                    ui={false}
                    className="request-image"
                />
                <Card.Header style = {{marginTop: "15px"}}>{request.title}</Card.Header>
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
                    <Label style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: requestTypeColor, color: 'white' }}>
                        <Icon name={requestTypeIcon} />
                        {requestTypeText}
                    </Label>
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

export default ClosedRequest;
