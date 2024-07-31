import React, { useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { AiOutlineFundProjectionScreen, AiOutlineCheckCircle, AiOutlineDollarCircle, AiOutlineTrophy } from 'react-icons/ai';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar from '../../../Components/Donor/Sidebar/Sidebar';
import Donatenow from '../../../Components/Donor/Donatenow/Donatenow';
import RotatingBanner from '../../../Components/Donor/RotatingBanner/RotatingBanner'; // Import the banner component
import './Dashboard.css';

const Dashboard = () => {
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;



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
                                    <Typography variant="h4">{dashboardData.listings}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineCheckCircle size={40} color="#FFA500" />
                                    <Typography variant="h6">Completed Donations</Typography>
                                    <Typography variant="h4">{dashboardData.completedDonations}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineDollarCircle size={40} color="#1E90FF" />
                                    <Typography variant="h6">Amount Donated</Typography>
                                    <Typography variant="h4">${dashboardData.amountDonated}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="dashboard-card">
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <AiOutlineTrophy size={40} color="#FF1493" />
                                    <Typography variant="h6">Tokens Received</Typography>
                                    <Typography variant="h4">{dashboardData.tokensReceived}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Typography variant="h5" sx={{ mt: 4, mb: 2 }} color="primary">Recently Posted Requests</Typography>
                            <Grid container spacing={3}>
                                {dashboardData.recentRequests.map(request => (
                                    <Grid item xs={12} key={request.id}>
                                        <Card className="request-item">
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Avatar src={request.donorProfilePic} alt={request.donorName} sx={{ width: 56, height: 56 }} />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6">{request.requestTitle}</Typography>
                                                        <Typography>{request.requestDescription}</Typography>
                                                        <Typography variant="caption">Posted by: {request.donorName}</Typography>
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
                                {dashboardData.topDonors.map(donor => (
                                    <Grid item xs={12} key={donor.id}>
                                        <Card className="donor-item">
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Avatar src={donor.donorProfilePic} alt={donor.donorName} sx={{ width: 56, height: 56 }} />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="h6">{donor.donorName}</Typography>
                                                        <Typography>${donor.amountDonated} Donated</Typography>
                                                        <Typography variant="caption">{donor.tokensReceived} Tokens Received</Typography>
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
