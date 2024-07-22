import React, { useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import './account.css';
import Accepted from "../../../Components/Beneficiary/Donation/Accepted";
import Unaccepted from "../../../Components/Beneficiary/Donation/Unaccepted";
import CompletedDonation from "../../../Components/Beneficiary/Donation/CompletedDonation";

const accepted_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        id:334354,
        accepted: true,

    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        id:35354354,
        accepted: true

    },
];

const unaccepted_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        accepted: false,
        id:35354354

    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        accepted: false,
        id:35354354


    },
];

const completed_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
    },
];

const BeneficiaryOwnClosedRequestPage = () => {
    const { request_id } = useParams();
    console.log(request_id);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const requestDetails = {
        name: 'Charity Org',
        title:"Need Some Food. Can I Get a Meal?",
        // address: '456 Help St, Generosity Town, CA',
        description: 'Aint eate in centureies so feed me.',
        email: 'info@charityorg.org',
        telephone: '123-456-7890',
        profilePicture: 'https://via.placeholder.com/150',
        proofImages: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300'
        ],
        certificateImage: 'https://via.placeholder.com/300',
        // type: "organization",
        verified: false,// Change to true to see the green flag
        beneficiary:"sdfsdf",
        raised:45969
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <div>
            <Navbar />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Closed Request</Header>
                <Segment>
                    <Header as="h2">Request Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={requestDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        <a href={`donor/beneficiaries/${requestDetails.beneficiary}`}>{requestDetails.name}</a>
                                    </List.Item>

                                    <List.Item>
                                        <List.Header>Title</List.Header>
                                        {requestDetails.title}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {requestDetails.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {requestDetails.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {requestDetails.email}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Telephone</List.Header>
                                        {requestDetails.telephone}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <h4>Type: {requestDetails.type}</h4>
                                {requestDetails.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{color: "green"}}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large"/><h4 style={{color: "red"}}>Not Verified</h4>
                                    </div>
                                )}
                                <h2>Raised {requestDetails.raised} LKR</h2>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {requestDetails.proofImages.map((image, index) => (
                            <Grid.Column width={4} key={index}>
                                <Image
                                    src={image}
                                    className="proof-image"
                                    onClick={() => handleImageClick(image)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">GS/DS Certificate</Header>
                    <Grid>
                        <Grid.Column width={16}>
                            <Image
                                src={requestDetails.certificateImage}
                                className="certificate-image"
                                onClick={() => handleImageClick(requestDetails.certificateImage)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Accepted Donations</Header>

                <Grid>
                    {accepted_donations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Accepted
                                donorImage={donation.donorImage}
                                // recipientImage={donation.recipientImage}
                                amount={donation.amount}
                                donationTitle={donation.title}

                                type={donation.type}
                                // recipientName={donation.recipientName}
                                accepted = {donation.accepted}
                                id = {donation.id}

                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>


            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Non Accepted Donations</Header>

                <Grid>
                    {unaccepted_donations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Unaccepted
                                donorImage={donation.donorImage}
                                // recipientImage={donation.recipientImage}
                                amount={donation.amount}
                                donationTitle={donation.title}
                                type={donation.type}
                                // recipientName={donation.recipientName}
                                id = {donation.id}
                                accepted = {donation.accepted}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Completed Donations</Header>

                <Grid>
                    {completed_donations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <CompletedDonation
                                donorImage={donation.donorImage}
                                // recipientImage={donation.recipientImage}
                                amount={donation.amount}
                                donationTitle={donation.title}

                                type={donation.type}
                                // recipientName={donation.recipientName}
                                // accepted = {donation.accepted}
                                id = {donation.id}

                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>


            <Modal open={open} onClose={() => setOpen(false)} size='large'>
                <Modal.Content>
                    <Image src={selectedImage} fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default BeneficiaryOwnClosedRequestPage;
