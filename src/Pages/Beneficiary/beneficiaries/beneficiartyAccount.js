import React, { useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import './account.css';
// import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const requests = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help A',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "4dfadfaafaf",
        open: false
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help B',
        beneficiaryName: 'Charity Org B',
        verified: true,
        id: "dfadadvadv",
        open:true
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org C',
        verified: false,
        id: "dafa554554",
        open: true
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org C',
        verified: false,
        id: "as44484",
        open: false
    }
];

const BeneficiaryOtherBeneficiaryAccount = () => {
    const { beneficiary_id } = useParams();
    console.log(beneficiary_id);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const beneficiaryDetails = {
        name: 'Charity Org',
        address: '456 Help St, Generosity Town, CA',
        description: 'Non-profit organization focused on providing aid to underprivileged communities.',
        email: 'info@charityorg.org',
        telephone: '123-456-7890',
        profilePicture: 'https://via.placeholder.com/150',
        proofImages: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300'
        ],
        certificateImage: 'https://via.placeholder.com/300',
        type: "organization",
        verified: false // Change to true to see the green flag
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <div>
            <Navbar />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Beneficiary Account</Header>
                <Segment>
                    <Header as="h2">Beneficiary Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={beneficiaryDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {beneficiaryDetails.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {beneficiaryDetails.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {beneficiaryDetails.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {beneficiaryDetails.email}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Telephone</List.Header>
                                        {beneficiaryDetails.telephone}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <h4>Type: {beneficiaryDetails.type}</h4>
                                {beneficiaryDetails.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{color: "green"}}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large"/><h4 style={{color: "red"}}>Not Verified</h4>
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {beneficiaryDetails.proofImages.map((image, index) => (
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
                                src={beneficiaryDetails.certificateImage}
                                className="certificate-image"
                                onClick={() => handleImageClick(beneficiaryDetails.certificateImage)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>

            <Modal open={open} onClose={() => setOpen(false)} size='large'>
                <Modal.Content>
                    <Image src={selectedImage} fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
            {/*<Donatenow/>*/}
        </div>
    );
}

export default BeneficiaryOtherBeneficiaryAccount;
