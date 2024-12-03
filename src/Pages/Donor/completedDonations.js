import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar2 from "../../Components/Donor/Sidebar/Sidebar2";
import PendingRewardDonation from "../../Components/Donor/Donation/PendingRewardDonation";
import CompletedDonation from "../../Components/Donor/Donation/CompletedDonation";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        donationTitle: 'One',
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        donationTitle: 'Two',
    },
];

function CompletedDonations() {

    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [donations, setDonations] = useState([]);


    useEffect(() => {
        get_donations();
    }, []);

    const get_donations = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donations', { rewarded: true, donor_id: donor._id });
            setDonations(response.data.donations);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar2/>
            <div style={{flex: '1'}}>
                <Navbar2/>
                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                    <Header as="h2" style={{}} className="page-header">Completed Donations</Header>

                    <Grid>
                        {donations.map((donation, index) => (
                            <Grid.Column key={index} width={16}>
                                <CompletedDonation
                                    donorImage={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"}
                                    recipientImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + donation.profile_image): "https://via.placeholder.com/150"}
                                    amount={donation.donationDetails.value}
                                    type={donation.donationDetails.type}
                                    tokens={donation.donationDetails.tokens}
                                    donationTitle={donation.donationDetails.title}
                                    id={donation.donationDetails._id}
                                    request={donation.request_title}

                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow/>
        </div>
    )

}
;

export default CompletedDonations;
