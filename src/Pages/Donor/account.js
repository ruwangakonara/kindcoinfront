import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Button, Segment, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import axios from 'axios';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const Account = () => {
    const { user, userDetails, setUserDetails } = useContext(UserContext);
    const [donor, setDonor] = useState(null); // Initialize donor state

    const history = useNavigate();

    async function fetchDonorDetails() {
        try {
            const response = await axiosInstance.get('/donor/get_account');

            if (response.status === 200) {
                console.log(response)
                const donorDet = response.data.donor;
                setDonor(donorDet); // Update donor state with fetched details
                setUserDetails(donorDet); // Save donor details in global state if needed
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDonorDetails();
    }, []);

    const handleUpdate = () => {
        history('/donor/update-account');
    }

    if (!donor) {
        return null; // Or render a loading spinner or message while waiting for data
    }

    return (
        <div>
            <Navbar2 />

            <Container className="donor-account-container">
                <Header as="h1">Donor Account</Header>
                <Segment>
                    <Header as="h2">Your Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {donor.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {donor.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {donor.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Stellar Address</List.Header>
                                        {donor.stellar_address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {donor.username}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Anonymous</List.Header>
                                        {donor.anonymous ? "Yes" : "No"}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Leaderboard Anonymous</List.Header>
                                        {donor.leaderboard_anonymous ? "Yes" : "No"}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <h4>Type: {donor.type}</h4>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3">Common Donation Items</Header>
                                <List>
                                    {(donor.usual_donations) && donor.usual_donations.map((item, index) => (
                                        <List.Item key={index}>{item}</List.Item>
                                    ))}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button primary onClick={handleUpdate}>Update</Button>
                </Segment>
                <Segment>
                    <Header as="h2">Donation Statistics</Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as="h3">Donated Amount</Header>
                            <p>{donor.donated}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h3">KINDCOIN</Header>
                            <p>{donor.tokens}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                {donor.stellar_address === "" && (
                    <Segment color="yellow" style={{ marginTop: "20px" }}>
                        <Header as="h3" textAlign="center">
                            Please Enter a Stellar Address to Receive Tokens
                            {/*They are identified by the ID: {donor.anonymous_id}.*/}
                        </Header>
                    </Segment>
                )}

                {donor.stellar_address !== "" && (
                    <Segment color="blue" style={{marginTop: "20px"}}>
                        <Header as="h3" textAlign="center">
                            If you have not already, please establish a Trustline on your Stellar account for KINDCOIN to receive KINDCOIN.
                        </Header>
                        <p style={{textAlign: "center"}}>
                            Learn more about setting up a trustline{" "}
                            <a
                                href="https://developers.stellar.org/docs/glossary/trustline/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                here
                            </a>.
                        </p>
                        <p style={{textAlign: "center"}}>
                     Issuer ID: <strong>GD5GGDIKRNPRZPLMUVEC35MPADQZTZPMQZUKSCBQ5ECOS66ADGXLBQQZ</strong>
                        </p>
                    </Segment>
                )}

            </Container>
            <Donatenow/>
        </div>

    );
}

export default Account;
