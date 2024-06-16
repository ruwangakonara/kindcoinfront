import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar3 from "../../Components/Donor/Sidebar/Sidebar3";
import Donation from '../../Components/Donor/Donation/Donation';
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Beneficiary from "../../Components/Donor/Beneficiary/Beneficiary";
import MyListing from "../../Components/Donor/Donation/MyListing";

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

const MyListingsList = () => (

<div style={{display: 'flex', width: '100%'}}>
    <Sidebar3/>
    <div style={{flex: '1'}}>
        <Navbar2/>
        <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
            <Grid>
                {donations.map((donation, index) => (
                    <Grid.Column key={index} width={16}>
                        <MyListing
                            donorImage={donation.donorImage}
                            recipientImage={donation.recipientImage}
                            amount={donation.amount}
                            type={donation.type}
                            recipientName={donation.recipientName}
                            requestTitle={donation.requestTitle}
                            donationTitle={donation.donationTitle}

                        />
                    </Grid.Column>
                ))}
            </Grid>
        </Container>
    </div>
</div>
)
;

export default MyListingsList;
