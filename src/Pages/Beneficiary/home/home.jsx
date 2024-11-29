// import React from 'react';
// import { Container, Grid, Header, Segment, Image } from 'semantic-ui-react';
// import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
// import Sidebar from '../../../Components/Beneficiary/Sidebar/Sidebar';
// import './Dashboard.css'; // Importing CSS file for styling
// import { useParams } from 'react-router-dom';
// import { AiOutlineFundProjectionScreen, AiOutlineUnorderedList, AiOutlineCheckCircle } from 'react-icons/ai';
// import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow"; // Importing icons from React Icons library
//
// const BeneficiaryDashboard = () => {
//     // Dummy data for the dashboard
//     const dashboardData = {
//         totalAmountRaised: 5000,
//         openRequests: 2,
//         closedRequests: 3,
//         recentDonations: [
//             {
//                 id: 1,
//                 donorName: 'Alice Johnson',
//                 donorProfilePic: 'https://via.placeholder.com/150',
//                 amountDonated: 1500,
//                 tokensReceived: 50
//             },
//             {
//                 id: 2,
//                 donorName: 'Bob Williams',
//                 donorProfilePic: 'https://via.placeholder.com/150',
//                 amountDonated: 1000,
//                 tokensReceived: 30
//             }
//         ],
//         topDonors: [
//             {
//                 id: 1,
//                 donorName: 'Alice Johnson',
//                 donorProfilePic: 'https://via.placeholder.com/150',
//                 amountDonated: 1500,
//                 tokensReceived: 50
//             },
//             {
//                 id: 2,
//                 donorName: 'Bob Williams',
//                 donorProfilePic: 'https://via.placeholder.com/150',
//                 amountDonated: 1000,
//                 tokensReceived: 30
//             }
//         ]
//     };
//
//     return (
//         <div>
//             <Navbar />
//             <Grid>
//                 <Grid.Column width={2}>
//                     <Sidebar />
//                 </Grid.Column>
//                 <Grid.Column width={13}>
//                     <Container className="dashboard-container">
//                         <Header as="h1" className="dashboard-header">Dashboard</Header>
//
//                         {/* Dashboard Cards */}
//                         <Segment.Group horizontal className="dashboard-cards">
//                             <Segment className="dashboard-card">
//                                 <AiOutlineFundProjectionScreen size={40} color="#FF6347" />
//                                 <Header as='h3'>Total Amount Raised</Header>
//                                 <Header as='h2'>${dashboardData.totalAmountRaised}</Header>
//                             </Segment>
//                             <Segment className="dashboard-card">
//                                 <AiOutlineUnorderedList size={40} color="#FFA500" />
//                                 <Header as='h3'>Open Requests</Header>
//                                 <Header as='h2'>{dashboardData.openRequests}</Header>
//                             </Segment>
//                             <Segment className="dashboard-card">
//                                 <AiOutlineCheckCircle size={40} color="#1E90FF" />
//                                 <Header as='h3'>Closed Requests</Header>
//                                 <Header as='h2'>{dashboardData.closedRequests}</Header>
//                             </Segment>
//                         </Segment.Group>
//
//                         {/* Recently Received Donations */}
//                         <Segment.Group className="recent-donations">
//                             <Header style={{ marginTop: "15px", color: "#db2828" }} as='h2'>Recent Donations Received</Header>
//                             {dashboardData.recentDonations.map(donation => (
//                                 <Segment key={donation.id} className="donor-item">
//                                     <Grid columns={2}>
//                                         <Grid.Column width={3}>
//                                             <Image src={donation.donorProfilePic} circular className="donor-profile-pic" />
//                                         </Grid.Column>
//                                         <Grid.Column width={13}>
//                                             <Header as='h3'>{donation.donorName}</Header>
//                                             <p>${donation.amountDonated} Donated</p>
//                                             <p>{donation.tokensReceived} Tokens Received</p>
//                                         </Grid.Column>
//                                     </Grid>
//                                 </Segment>
//                             ))}
//                         </Segment.Group>
//
//                         {/* Top Donors Leaderboard */}
//                         <Segment.Group className="top-donors">
//                             <Header style={{ marginTop: "15px", color: "#db2828" }} as='h2'>Leaderboard - Top Donors</Header>
//                             {dashboardData.topDonors.map(donor => (
//                                 <Segment key={donor.id} className="donor-item">
//                                     <Grid columns={2}>
//                                         <Grid.Column width={3}>
//                                             <Image src={donor.donorProfilePic} circular className="donor-profile-pic" />
//                                         </Grid.Column>
//                                         <Grid.Column width={13}>
//                                             <Header as='h3'>{donor.donorName}</Header>
//                                             <p>${donor.amountDonated} Donated</p>
//                                             <p>{donor.tokensReceived} Tokens Received</p>
//                                         </Grid.Column>
//                                     </Grid>
//                                 </Segment>
//                             ))}
//                         </Segment.Group>
//                     </Container>
//                 </Grid.Column>
//             </Grid>
//             <Requestnow/>
//         </div>
//     );
// };
//
// export default BeneficiaryDashboard;


import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { AiOutlineFundProjectionScreen, AiOutlineCheckCircle, AiOutlineDollarCircle, AiOutlineTrophy } from 'react-icons/ai';
import {FcDonate} from 'react-icons/fc';
import { MdRequestQuote } from "react-icons/md";
import { PiCalendarXBold } from "react-icons/pi";


import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar from '../../../Components/Beneficiary/Sidebar/Sidebar';
import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow"; // Importing icons from React Icons library
import RotatingBanner from '../../../Components/Donor/RotatingBanner/RotatingBanner'; // Import the banner component
import './Dashboard.css';

import axios from "axios";
import {Image} from "semantic-ui-react";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function BeneficiaryDashboard(){
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    const [cards, setCards] = useState({});
    const [donors, setDonors] = useState([]);
    const [donations, setDonations] = useState([]);
    useEffect(() => {
        fetchCards();
        fetchDonations()
        fetchDonors()
    }, []);

    async function fetchCards() {
        try {
            const response = await axiosInstance.get('/beneficiary/get_beneficiary_cards');

            if (response.status === 200) {
                const d_cards = response.data;
                setCards(d_cards);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchDonors() {
        try {
            const response = await axiosInstance.get('/beneficiary/get_home_donors');

            if (response.status === 200) {
                const d_donors = response.data.donors;
                setDonors(d_donors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_home_donations', {beneficiary_id: beneficiary._id});

            if (response.status === 200) {
                const d_donations = response.data.donations;
                setDonations(d_donations);            }
        } catch (error) {
            console.log(error);
        }
    }


    const dashboardData = {
        listings: 10,
        completedDonations: 5,
        amountDonated: 2500,
        tokensReceived: 100,
        recentRequests: [
            {
                id: 1,
                donorName: 'John Doe',
                donorProfilePic: 'https://via.placeholder.com/150',
                requestTitle: 'Request for Winter Clothes',
                requestDescription: 'We are in need of winter clothes for the upcoming cold season. Your help will be greatly appreciated.'
            },
            {
                id: 2,
                donorName: 'Jane Smith',
                donorProfilePic: 'https://via.placeholder.com/150',
                requestTitle: 'Request for Educational Books',
                requestDescription: 'We need educational books for our community library. Your contribution will make a big difference.'
            }
        ],
        topDonors: [
            {
                id: 1,
                donorName: 'Alice Johnson',
                donorProfilePic: 'https://via.placeholder.com/150',
                amountDonated: 1500,
                tokensReceived: 50
            },
            {
                id: 2,
                donorName: 'Bob Williams',
                donorProfilePic: 'https://via.placeholder.com/150',
                amountDonated: 1000,
                tokensReceived: 30
            }
        ]
    };

    console.log('User Context:', user);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Navbar />
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h4" align="left" style={{marginTop: "65px"}} gutterBottom>Welcome {beneficiary.name}!</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{textAlign: 'center'}}>
                                    {/*<AiOutlineFundProjectionScreen size={40} color="#FF6347" />*/}
                                    <div style={{marginBottom: "8px"}}>
                                        <Image centered rounded size="mini" src="/rs.jpg"/>

                                    </div>
                                    <Typography variant="h6">Total Amount Raised</Typography>

                                    <Typography variant="h4">LKR {cards.amount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <MdRequestQuote size={40} color="#FF1493" />

                                    <Typography variant="h6">Open Requests</Typography>
                                    <Typography variant="h4">{cards.c_open}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <PiCalendarXBold size={40} color="#FFA500" />

                                    <Typography variant="h6">Closed Requests</Typography>
                                    <Typography variant="h4">{cards.c_closed}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <FcDonate size={40} color="#" />

                                    <Typography variant="h6">Donations Received</Typography>
                                    <Typography variant="h4">{cards.c_donations}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography variant="h5" sx={{ mt: 4, mb: 2 }} color="primary">
                                Recently Received Donations
                            </Typography>
                            <Grid container spacing={3}>
                                {donations.map(donation => (
                                    <Grid item xs={12} key={donation._id}>
                                        <Card className="request-item">
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Avatar
                                                            src={
                                                                donation.profile_image !== "https://via.placeholder.com/150"
                                                                    ? "http://localhost:9013/images/profileimages/donor/" + donation.profile_image
                                                                    : "https://via.placeholder.com/150"
                                                            }
                                                            alt={donation.name}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6">{donation.title}</Typography>
                                                        <Typography>{donation.description}</Typography>
                                                        <Typography>
                                                            Request: <a href={`/beneficiary/${donation.open ? "open" : "closed"}-requests/${donation.request_id}`}>
                                                            {donation.request_title}
                                                        </a>
                                                        </Typography>
                                                        <Typography variant="caption">Offered by: {donation.donor_name}</Typography><br />
                                                        <Typography variant="caption">
                                                            Offered on {donation.created.slice(0, 10)} at {donation.created.slice(11, 19)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        {/* Container for vertically stacked status labels */}
                                                        <div className="status-column">
                                                            {/* Accepted flag */}
                                                            <Typography className={`status-${donation.accepted ? 'open' : 'closed'}`}>
                                                                {donation.accepted ? 'Accepted' : 'Not Accepted'}
                                                            </Typography>

                                                            {/* Verified flag only if accepted */}
                                                            {donation.accepted && (
                                                                <Typography className={`status-${donation.verified ? 'verified' : 'unverified'}`}>
                                                                    {donation.verified ? 'Verified' : 'Not Verified'}
                                                                </Typography>
                                                            )}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <RotatingBanner />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ mt: 4, mb: 2 }} color="secondary">Top Donors</Typography>
                            <Grid container spacing={3}>
                                {donors?.map(donorx => (
                                    <Grid item xs={12} key={donorx._id}>
                                        <Card className="donor-item">
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Avatar
                                                            src={donorx.profile_image !== "https://via.placeholder.com/150"
                                                                ? "http://localhost:9013/images/profileimages/donor/" + donorx.profile_image
                                                                : "https://via.placeholder.com/150"}
                                                            alt={donorx.name}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6">
                                                            <a href={`/beneficiary/donors/${donorx._id}`}>
                                                                {donorx.name}
                                                            </a>
                                                        </Typography>
                                                        <Typography>
                                                            Rs. {donorx.donated} Donated
                                                        </Typography>
                                                        <Typography variant="caption">
                                                            {donorx.tokens}
                                                            <span style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: "5px"}}>
                            <Image centered rounded size="small" src="/tag.png" />
                        </span>
                                                            Received
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Requestnow />
            </Box>
        </Box>
    );
};

export default BeneficiaryDashboard;
