import React from 'react';
import { Card, Image, Icon, Label, Grid, Button } from 'semantic-ui-react';
import './donation.css';

const MyListing = ({ donorImage, recipientImage, amount, type, recipientName, requestTitle, donationTitle }) => {
    return (
        <Card fluid className="donation-card">
            <Card.Content>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src={donorImage} circular className="donor-image" />
                        <Image src={recipientImage} circular className="recipient-image" />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Card.Header className="recipient-name">Recipient: {recipientName}</Card.Header>
                        <Card.Header className="recipient-name">Request: {requestTitle}</Card.Header>
                        <Card.Header className="recipient-name">{donationTitle}</Card.Header>
                        <Card.Meta className="donation-type">{type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}</Card.Meta>
                        <Card.Description className="donation-amount">Amount: {amount}</Card.Description>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="right">
                        <Button size='tiny' className='view-button'>View Donation</Button>
                    </Grid.Column>
                </Grid>

            </Card.Content>
        </Card>
    );
}

export default MyListing;
