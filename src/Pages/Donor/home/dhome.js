import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { AiOutlineFundProjectionScreen, AiOutlineCheckCircle, AiOutlineDollarCircle, AiOutlineTrophy } from 'react-icons/ai';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar from '../../../Components/Donor/Sidebar/Sidebar';
import Donatenow from '../../../Components/Donor/Donatenow/Donatenow';
import RotatingBanner from '../../../Components/Donor/RotatingBanner/RotatingBanner'; // Import the banner component
import './Dashboard.css';

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function Dashboard(){
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [cards, setCards] = useState({});
    const [requests, setRequests] = useState([]);
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        fetchCards();
        fetchRequests()
        fetchDonors()
    }, []);


    async function fetchCards() {
        try {
            const response = await axiosInstance.get('/donor/get_donor_cards');

            if (response.status === 200) {
                const d_cards = response.data;
                setCards(d_cards);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchRequests() {
        try {
            const response = await axiosInstance.get('/donor/get_home_requests');

            if (response.status === 200) {
                const d_requests = response.data.requests;
                setRequests(d_requests);
                console.log(d_requests);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchDonors() {
        try {
            const response = await axiosInstance.get('/donor/get_home_donors');

            if (response.status === 200) {
                const d_donors = response.data.donors;
                setDonors(d_donors);
            }
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
                <Navbar2 />
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h4" align="left" style={{marginTop: "65px"}} gutterBottom>Welcome {donor.name}!</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineFundProjectionScreen size={40} color="#FF6347" />
                                    <Typography variant="h6">Number of Listings</Typography>
                                    <Typography variant="h4">{cards.c_lst}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineCheckCircle size={40} color="#FFA500" />
                                    <Typography variant="h6">Completed Donations</Typography>
                                    <Typography variant="h4">{cards.c_com}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineDollarCircle size={40} color="#1E90FF" />
                                    <Typography variant="h6">Amount Donated</Typography>
                                    <Typography variant="h4">${cards.amount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineTrophy size={40} color="#FF1493" />
                                    <Typography variant="h6">Tokens Received</Typography>
                                    <Typography variant="h4">{cards.tokens}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography variant="h5" sx={{ mt: 4, mb: 2 }} color="primary">
                                Recently Posted Requests
                            </Typography>
                            <Grid container spacing={3}>
                                {requests.map(request => (
                                    <Grid item xs={12} key={request._id}>
                                        <Card className="request-item">
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Avatar
                                                            src={
                                                                request.profile_image !== "https://via.placeholder.com/150"
                                                                    ? "http://localhost:9013/images/profileimages/beneficiary/" + request.profile_image
                                                                    : "https://via.placeholder.com/150"
                                                            }
                                                            alt={request.donorName}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6">
                                                            <a href={`/donor/${request.open ? "open" : "closed"}-requests/${request._id}`}>
                                                                {request.title}
                                                            </a>
                                                        </Typography>
                                                        <Typography>{request.description}</Typography>
                                                        <Typography variant="caption">
                                                            Posted by: {request.name}
                                                        </Typography>
                                                        <br />
                                                        <Typography variant="caption">
                                                            Posted on {request.created.slice(0, 10)} at {request.created.slice(11, 19)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        {/* Container for vertically stacked status labels */}
                                                        <div className="status-column">
                                                            <Typography
                                                                className={`status-open ${!request.open ? 'status-closed' : ''}`}
                                                            >
                                                                {request.open ? 'Open' : 'Closed'}
                                                            </Typography>
                                                            <Typography
                                                                className={`status-verified ${!request.verified ? 'status-unverified' : ''}`}
                                                            >
                                                                {request.verified ? 'Verified' : 'Not Verified'}
                                                            </Typography>
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
                                                        <Avatar src={donorx.profile_image !== "https://via.placeholder.com/150"
                                                            ? "http://localhost:9013/images/profileimages/donor/" + donorx.profile_image
                                                            : "https://via.placeholder.com/150"} alt={donorx.name} sx={{ width: 56, height: 56 }} />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6"><a href={(donorx.user_id !== donor.user_id) ? `/donor/donors/${donorx._id}`: '/donor/account'}>{donorx.name}</a></Typography>
                                                        <Typography>Rs. {donorx.donated} Donated</Typography>
                                                        <Typography variant="caption">{donorx.tokens} KindCoin Received</Typography>
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
                <Donatenow />
            </Box>
        </Box>
    );
};

export default Dashboard;
