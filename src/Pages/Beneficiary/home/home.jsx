import React from 'react';
import { Container, Grid, Header, Segment, Image } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar from '../../../Components/Beneficiary/Sidebar/Sidebar';
import './Dashboard.css'; // Importing CSS file for styling
import { useParams } from 'react-router-dom';
import { AiOutlineFundProjectionScreen, AiOutlineUnorderedList, AiOutlineCheckCircle } from 'react-icons/ai'; // Importing icons from React Icons library

const BeneficiaryDashboard = () => {
    // Dummy data for the dashboard
    const dashboardData = {
        totalAmountRaised: 5000,
        openRequests: 2,
        closedRequests: 3,
        recentDonations: [
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
            <Navbar />
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
                                <Header as='h3'>Total Amount Raised</Header>
                                <Header as='h2'>${dashboardData.totalAmountRaised}</Header>
                            </Segment>
                            <Segment className="dashboard-card">
                                <AiOutlineUnorderedList size={40} color="#FFA500" />
                                <Header as='h3'>Open Requests</Header>
                                <Header as='h2'>{dashboardData.openRequests}</Header>
                            </Segment>
                            <Segment className="dashboard-card">
                                <AiOutlineCheckCircle size={40} color="#1E90FF" />
                                <Header as='h3'>Closed Requests</Header>
                                <Header as='h2'>{dashboardData.closedRequests}</Header>
                            </Segment>
                        </Segment.Group>

                        {/* Recently Received Donations */}
                        <Segment.Group className="recent-donations">
                            <Header style={{ marginTop: "15px", color: "#db2828" }} as='h2'>Recent Donations Received</Header>
                            {dashboardData.recentDonations.map(donation => (
                                <Segment key={donation.id} className="donor-item">
                                    <Grid columns={2}>
                                        <Grid.Column width={3}>
                                            <Image src={donation.donorProfilePic} circular className="donor-profile-pic" />
                                        </Grid.Column>
                                        <Grid.Column width={13}>
                                            <Header as='h3'>{donation.donorName}</Header>
                                            <p>${donation.amountDonated} Donated</p>
                                            <p>{donation.tokensReceived} Tokens Received</p>
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

export default BeneficiaryDashboard;
