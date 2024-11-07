import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2";
import Sidebar3 from "../../../Components/Donor/Sidebar/Sidebar3";
import Donation from '../../../Components/Donor/Donation/Donation';
import Sidebar from "../../../Components/Donor/Sidebar/Sidebar";
import Beneficiary from "../../../Components/Donor/Beneficiary/Beneficiary";
import MyListing from "../../../Components/Donor/Donation/MyListing";
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";


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
        verified: true,
        recipientName: 'Charity Org',
        requestTitle: "fsdfsdf",
        donationTitle: "adfsdfsdf",
        id: "sdasd"
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        amount: '50kg of rice',
        type: 'goods',
        verified: false,
        recipientName: 'John Doe',
        requestTitle: "fsdfsdf",
        donationTitle: "adfsdfsdf",
        id: "asdasd"
    },
];

function MyListingsList() {

    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [donations, setDonations] = useState([]);


    useEffect(() => {
        get_donations();
    }, []);

    const get_donations = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donations', { accepted: false, donor_id: donor._id });
            setDonations(response.data.donations);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar3/>
            <div style={{flex: '1'}}>
                <Navbar2/>
                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                    <Header as="h2" style={{position: "fixed"}} className="page-header">Unaccepted Donations</Header>

                    <Grid>
                        {donations && donations.map((donation, index) => (
                            <Grid.Column key={index} width={16}>
                                <MyListing
                                    donorImage={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"}
                                    recipientImage={(donation?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + donation.profile_image): "https://via.placeholder.com/150"}
                                    amount={donation.donationDetails?.amount}
                                    type={donation.donationDetails?.type}
                                    recipientName={donation?.beneficiary_name}
                                    requestTitle={donation?.request_title}
                                    donationTitle={donation.donationdetails?.title}
                                    id={donation?._id}

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

export default MyListingsList;
