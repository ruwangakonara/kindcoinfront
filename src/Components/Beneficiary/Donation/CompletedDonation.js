import React from 'react';
import { Card, Image, Grid, Button } from 'semantic-ui-react';
import './donation.css';

const CompletedDonation = ({ donorImage, amount, type, id, donationTitle, donorName}) => {
    return (
        <Card fluid className="donation-card">
            <Card.Content>
                <Grid>
                    <Grid.Column width={6}>
                        <Image src={donorImage} circular className="donor-image" />
                        {/*<Image src={recipientImage} circular className="recipient-image" />*/}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {/*<Card.Header className="recipient-name">{recipientName}</Card.Header>*/}
                        <Card.Header className="recipient-name">{donationTitle}</Card.Header>
                        <Card.Description style = {{marginBottom: "10px"}} className="donation-amount">Donor: {donorName}</Card.Description>

                        <Card.Meta className="donation-type">{type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}</Card.Meta>
                        <Card.Description className="donation-amount">Amount: {amount}</Card.Description>
                    </Grid.Column>
                    <Grid.Column width={3} textAlign="right" className="right-column">
                        <a href={`/beneficiary/completed-donation/${id}`} style={{color: "black"}}> <Button size='tiny' className='view-button'>View Donation</Button></a>
                        {/*<div className="token-info">*/}
                        {/*    <h2>{tokens}</h2>*/}
                        {/*    <Image src="/token.png" circular className="token-image" />*/}

                        {/*</div>*/}
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>
    );
}

export default CompletedDonation;
