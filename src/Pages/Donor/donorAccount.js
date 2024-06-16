import React from 'react';
import { Container, Header, Grid, List, Button, Segment, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import {useParams} from "react-router-dom";

const DonorAccount = () => {
    const history = useNavigate();
    const {donor_id} = useParams();
    console.log(donor_id)

    const donorDetails = {
        name: 'John Doe',
        address: '123 Charity Lane, Kindness City, CA',
        description: 'Generous donor helping various causes.',
        email: 'john.doe@example.com',
        commonDonationItems: ['Clothes', 'Books', 'Toys', 'Food'],
        donatedAmount: '$2000',
        tokens: 150,
        profilePicture: 'https://via.placeholder.com/150',
        type: "individual"
    };

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
                                <Image src={donorDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {donorDetails.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {donorDetails.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {donorDetails.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {donorDetails.email}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                 <h4>Type: {donorDetails.type}</h4>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h3">Common Donation Items</Header>
                                <List>
                                    {donorDetails.commonDonationItems.map((item, index) => (
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
                            <p>{donorDetails.donatedAmount}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h3">Tokens</Header>
                            <p>{donorDetails.tokens}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        </div>

    );
}

export default DonorAccount;
