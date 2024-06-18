import React from 'react';
import { Container, Grid, Header, Segment, Image } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar from '../../../Components/Donor/Sidebar/Sidebar';
import './Dashboard.css'; // Importing CSS file for styling
import { useParams } from 'react-router-dom';
import { AiOutlineFundProjectionScreen, AiOutlineCheckCircle, AiOutlineDollarCircle, AiOutlineTrophy } from 'react-icons/ai'; // Importing icons from React Icons library

const Dashboard = () => {
    // Dummy data for the dashboard
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

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={2}>
                    <Sidebar />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Container className="dashboard-container">
                        <Header as="h1" className="dashboard-header">Dashboard</Header>

                        {/* Dashboard Cards */}
                        <Segment.Group horizontal className="dashboard-cards">
                            <Segment className="dashboard-card">
                                <AiOutlineFundProjectionScreen size={40} color="#FF6347" />
                                <Header as='h3'>Number of Listings</Header>
                                <Header as='h2'>{dashboardData.listings}</Header>
                            </Segment>
                            <Segment className="dashboard-card">
                                <AiOutlineCheckCircle size={40} color="#FFA500" />
                                <Header as='h3'>Number of Completed Donations</Header>
                                <Header as='h2'>{dashboardData.completedDonations}</Header>
                            </Segment>
                            <Segment className="dashboard-card">
                                <AiOutlineDollarCircle size={40} color="#1E90FF" />
                                <Header as='h3'>Amount Donated</Header>
                                <Header as='h2'>${dashboardData.amountDonated}</Header>
                            </Segment>
                            <Segment className="dashboard-card">
                                <AiOutlineTrophy size={40} color="#FF1493" />
                                <Header as='h3'>Amount of Tokens Received</Header>
                                <Header as='h2'>{dashboardData.tokensReceived} Tokens</Header>
                            </Segment>
                        </Segment.Group>

                        {/* Recently Posted Requests */}
                        <Segment.Group className="recent-requests">
                            <Header style={{ marginTop: "15px", color: "#2185d0" }} as='h2'>Recently Posted Requests</Header>
                            {dashboardData.recentRequests.map(request => (
                                <Segment key={request.id} className="request-item">
                                    <Grid columns={2}>
                                        <Grid.Column width={3}>
                                            <Image src={request.donorProfilePic} circular className="request-profile-pic" />
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            <Header as='h3'>{request.requestTitle}</Header>
                                            <p>{request.requestDescription}</p>
                                            <p>Posted by: {request.donorName}</p>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            ))}
                        </Segment.Group>

                        {/* Top Donors Leaderboard */}
                        <Segment.Group className="top-donors">
                            <Header style={{ marginTop: "15px", color: "#db2828" }} as='h2'>Leaderboard - Top Donors</Header>
                            {dashboardData.topDonors.map(donor => (
                                <Segment key={donor.id} className="donor-item">
                                    <Grid columns={2}>
                                        <Grid.Column width={3}>
                                            <Image src={donor.donorProfilePic} circular className="donor-profile-pic" />
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            <Header as='h3'>{donor.donorName}</Header>
                                            <p>${donor.amountDonated} Donated</p>
                                            <p>{donor.tokensReceived} Tokens Received</p>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            ))}
                        </Segment.Group>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default Dashboard;
