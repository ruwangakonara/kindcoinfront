import React from 'react';
import { Card, Image, Icon, Label, Grid, Button } from 'semantic-ui-react';
import './donation.css';
import {Link} from 'react-router-dom';

const Donation = ({ donorImage, recipientImage, amount, type, tokens, recipientName, id, donationTitle, requestTitle }) => {
    return (
        <Card fluid className="donation-card">
            <Card.Content>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src={donorImage} circular className="donor-image" />
                        <Image src={recipientImage} circular className="recipient-image" />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Card.Header style = {{marginBottom:"15px"}} className="recipient-name">{donationTitle}</Card.Header>
                        <Card.Content style = {{marginBottom:"15px"}} className="donation-amount">request: {requestTitle}</Card.Content>
                        <Card.Content className="donation-amount">beneficiary: {recipientName}</Card.Content>
                        <Card.Meta className="donation-type">{type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}</Card.Meta>
                        <Card.Description className="donation-amount">Amount: {amount}</Card.Description>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="right">
                        <Button as={Link} to={`${id}`} size='tiny' className='view-button'>View Donation</Button>
                    </Grid.Column>
                </Grid>

            </Card.Content>
        </Card>
    );
}

export default Donation;
