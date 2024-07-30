import React from 'react';
import { Card, Image, Icon, Label, Grid, Button } from 'semantic-ui-react';
import './donation.css';
import {Link} from "react-router-dom";

const Accepted = ({ donorImage, amount, type, donationTitle , id, accepted}) => {
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
                        <Card.Meta className="donation-type">{type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}</Card.Meta>
                        <Card.Description className="donation-amount">Amount: {amount}</Card.Description>
                        {accepted && (
                            <Label style = {{marginTop: '10px'}} color='green' className='not-accepted-label'>Accepted</Label>
                        )}
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="right">
                        <a href={`/beneficiary/accepted-donation/${id}`} style={{color: "black"}}> <Button size='tiny' className='view-button'>View Donation</Button></a>
                    </Grid.Column>
                </Grid>
                {/*{verified ? (*/}
                {/*    <Label color='green' ribbon className="verified-label">*/}
                {/*        <Icon name="check circle" /> Verified*/}
                {/*    </Label>*/}
                {/*) : (*/}
                {/*    <Label color='red' ribbon className="verified-label">*/}
                {/*        <Icon name="check circle" /> Not Verified*/}
                {/*    </Label>*/}
                {/*)}*/}
            </Card.Content>
        </Card>
    );
}

export default Accepted;
