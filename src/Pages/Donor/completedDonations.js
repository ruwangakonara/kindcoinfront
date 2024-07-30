import React from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar2 from "../../Components/Donor/Sidebar/Sidebar2";
import PendingRewardDonation from "../../Components/Donor/Donation/PendingRewardDonation";
import CompletedDonation from "../../Components/Donor/Donation/CompletedDonation";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
    },
];

const CompletedDonations = () => (

        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar2/>
            <div style={{flex: '1'}}>
                <Navbar2/>
                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                    <Header as="h2" style = {{}} className="page-header">Completed Donations</Header>

                    <Grid>
                        {donations.map((donation, index) => (
                            <Grid.Column key={index} width={16}>
                                <CompletedDonation
                                    donorImage={donation.donorImage}
                                    recipientImage={donation.recipientImage}
                                    amount={donation.amount}
                                    type={donation.type}
                                    tokens={donation.tokens}
                                    recipientName={donation.recipientName}
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

export default CompletedDonations;
