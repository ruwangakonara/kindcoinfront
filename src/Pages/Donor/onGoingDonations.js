import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar2 from "../../Components/Donor/Sidebar/Sidebar2";
import Donation from '../../Components/Donor/Donation/Donation';
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Beneficiary from "../../Components/Donor/Beneficiary/Beneficiary";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '$100',
        type: 'monetary',
        verified: true,
        recipientName: 'Charity Org',
        requestTitle: "fsdfsdf",
        donationTitle: "adfsdfsdf"
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '50kg of rice',
        type: 'goods',
        verified: false,
        recipientName: 'John Doe',
        requestTitle: "fsdfsdf",
        donationTitle: "adfsdfsdf"
    },
];

const DonationList = () => (

<div style={{display: 'flex', width: '100%'}}>
    <Sidebar2/>
    <div style={{flex: '1'}}>
        <Navbar2/>
        <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
            <Grid>
                {donations.map((donation, index) => (
                    <Grid.Column key={index} width={16}>
                        <Donation
                            donorImage={donation.donorImage}
                            recipientImage={donation.recipientImage}
                            amount={donation.amount}
                            type={donation.type}
                            verified={donation.verified}
                            recipientName={donation.recipientName}
                            requestTitle={donation.requestTitle}
                            donationTitle={donation.donationTitle}

                        />
                    </Grid.Column>
                ))}
            </Grid>
        </Container>
        <Donatenow/>
    </div>
</div>
)
;

export default DonationList;
