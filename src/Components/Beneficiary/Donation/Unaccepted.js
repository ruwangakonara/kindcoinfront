import React from 'react';
import { Card, Image, Icon, Label, Grid, Button } from 'semantic-ui-react';
import './donation.css';
import {Link} from "react-router-dom";

const Unaccepted = ({ donorImage, amount, type, donationTitle, accepted, id, donorName }) => {
    return (
        <Card fluid className="donation-card">
            <Card.Content>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src={donorImage} circular className="donor-image" />
                        {/*<Image src={recipientImage} circular className="recipient-image" />*/}
                    </Grid.Column>
                    <Grid.Column width={8}>
                        {/*<Card.Header className="recipient-name">Recipient: {recipientName}</Card.Header>*/}
                        {/*<Card.Header className="recipient-name">Request: {requestTitle}</Card.Header>*/}
                        <Card.Header className="recipient-name">{donationTitle}</Card.Header>
                        <Card.Description style = {{marginBottom: "10px"}} className="donation-amount">Donor: {donorName}</Card.Description>

                        <Card.Meta className="donation-type">{type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}</Card.Meta>
                        <Card.Description className="donation-amount">Amount:{(type === "goods" ) ? (amount ? amount: "Pending") : amount}</Card.Description>
                        {!accepted && (
                            <Label style = {{marginTop: '10px'}} color='red' className='not-accepted-label'>Not Accepted</Label>
                        )}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="right">
                        <a href={`/beneficiary/unaccepted-donation/${id}`} style={{color: "black"}}> <Button size='tiny' className='view-button'>View Donation</Button></a>
                </Grid.Column>
            </Grid>
        </Card.Content>
        </Card>
    );
}

export default Unaccepted;
