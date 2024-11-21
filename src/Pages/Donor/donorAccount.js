import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Button } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import './account.css';
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import axios from 'axios';
import { UserContext } from '../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function DonorAccount() {
    const { donor_id } = useParams();
    console.log('Donor ID:', donor_id); // Check if ID is correctly logged

    const { userDetails } = useContext(UserContext);
    const [donor, setDonor] = useState({});
    const history = useNavigate();

    const fetchDonorDetails = async () => {
        console.log("Fetching donor details...");
        try {
            const response = await axiosInstance.post('/donor/get_donor', { _id: donor_id });
            console.log("Response:", response);
            if (response.status === 200) {
                const donorDet = response.data.donor;
                console.log("Donor Details:", donorDet);
                setDonor(donorDet); // Update state with fetched details
            } else {
                console.error(`Error: Received status code ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching donor details:', error);
        }
    };

    useEffect(() => {
        if (donor_id) {
            fetchDonorDetails();
        }
    }, [donor_id]);

    return (
        <div>
            <Navbar2 />

            <Container className="donor-account-container" style={{ position: "relative", top: "150px" }}>
                <Header as="h1">Donor Account</Header>

                {/* Donor Information Section */}
                <Segment>
                    <Header as="h2">Donor Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image
                                    src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"}
                                    circular
                                    className="profile-picture"
                                />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                {donor.anonymous ? (
                                    <List>
                                        <List.Item>
                                            <List.Header>Name</List.Header>
                                            {"Anonymous " + donor.anonymous_id}
                                        </List.Item>
                                    </List>
                                ) : (
                                    <List>
                                        <List.Item>
                                            <List.Header>Name</List.Header>
                                            {donor.name || 'N/A'}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Address</List.Header>
                                            {donor.address || 'N/A'}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Description</List.Header>
                                            {donor.description || 'N/A'}
                                        </List.Item>
                                        <List.Item>
                                            <List.Header>Email</List.Header>
                                            {donor.username}
                                        </List.Item>
                                    </List>
                                )}
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <h4>Type: {!donor.anonymous ? donor.type : ""}</h4>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3">Common Donation Items</Header>
                                {!donor.anonymous &&
                                    <List>
                                        {(donor.usual_donations) && donor.usual_donations.map((item, index) => (
                                            <List.Item key={index}>{item}</List.Item>
                                        ))}
                                    </List>
                                }

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>

                {/* Donation Statistics Section */}
                <Segment>
                    <Header as="h2">Donation Statistics</Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as="h3">Donated Amount</Header>
                            <p>{donor.donated}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h3">Tokens</Header>
                            <p>{donor.tokens}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>

                {/* Anonymity Banner Section */}
                {donor.anonymous && (
                    <Segment color="yellow" style={{ marginTop: "20px" }}>
                        <Header as="h3" textAlign="center">
                            This donor has chosen to remain anonymous.
                            {/*They are identified by the ID: {donor.anonymous_id}.*/}
                        </Header>
                    </Segment>
                )}

                {/* Render Donatenow component if donor is not anonymous */}
                <Donatenow />
            </Container>
        </div>
    );
}

export default DonorAccount;
