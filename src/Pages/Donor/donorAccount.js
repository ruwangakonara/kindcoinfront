import React, {useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Button, Segment, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import {useParams} from "react-router-dom";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import axios from 'axios';
import { UserContext } from '../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function DonorAccount(){
    const {donor_id} = useParams();

    const { user, userDetails, setUserDetails } = useContext(UserContext);
    const [donor, setDonor] = useState(null); // Initialize donor state

    const history = useNavigate();

    async function fetchDonorDetails() {
        try {
            const response = await axiosInstance.post('/donor/get_donor', { _id: donor_id });

            if (response.status === 200) {
                console.log(response)
                const donorDet = response.data.donor;
                setDonor(donorDet); // Update donor state with fetched details
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDonorDetails();
    }, []);



    // const donorDetails = {
    //     name: 'John Doe',
    //     address: '123 Charity Lane, Kindness City, CA',
    //     description: 'Generous donor helping various causes.',
    //     email: 'john.doe@example.com',
    //     commonDonationItems: ['Clothes', 'Books', 'Toys', 'Food'],
    //     donatedAmount: '$2000',
    //     tokens: 150,
    //     profilePicture: 'https://via.placeholder.com/150',
    //     type: "individual"
    // };

    // const handleUpdate = () => {
    //     history('/donor/update-account');
    // }

    return (
        <div>
            <Navbar2/>

            <Container className="donor-account-container">
                <Header as="h1">Donor Account</Header>
                <Segment>
                    <Header as="h2">Donor Information</Header>
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
                                        <List.Header>Email</List.Header>
                                        {donor.email}
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
                                    {donor.commonDonationItems.map((item, index) => (
                                        <List.Item key={index}>{item}</List.Item>
                                    ))}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/*<Button primary onClick={handleUpdate}>Update</Button>*/}
                </Segment>
                <Segment>
                    <Header as="h2">Donation Statistics</Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as="h3">Donated Amount</Header>
                            <p>{donor.donatedAmount}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h3">Tokens</Header>
                            <p>{donor.tokens}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
            <Donatenow/>
        </div>

    );
}

export default DonorAccount;
