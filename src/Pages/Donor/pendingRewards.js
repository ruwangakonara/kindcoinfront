import React from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar2 from "../../Components/Donor/Sidebar/Sidebar2";
import PendingRewardDonation from "../../Components/Donor/Donation/PendingRewardDonation";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        id: 53454,
        requestTitle: "rambo",
        donationTitle: "rambo",
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        id: 833434,
        requestTitle: "rambo",
        donationTitle: "rambo",
    },
];

const PendingRewards = () => (

        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar2/>
            <div style={{flex: '1'}}>
                <Navbar2/>
                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                    <Header as="h2" style = {{}} className="page-header">Pending Rewards</Header>

                    <Grid>
                        {donations.map((donation, index) => (
                            <Grid.Column key={index} width={16}>
                                <PendingRewardDonation
                                    donorImage={donation.donorImage}
                                    recipientImage={donation.recipientImage}
                                    amount={donation.amount}
                                    type={donation.type}
                                    tokens={donation.tokens}
                                    recipientName={donation.recipientName}
                                    id = {donation.id}
                                    requestTitle={donation.requestTitle}
                                    donationTitle={donation.donationTitle}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow/>
        </div>
    )
;

export default PendingRewards;
