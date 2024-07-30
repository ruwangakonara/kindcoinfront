import React, {useContext, useState} from 'react';
import {Container, Header, Grid, List, Button, Segment, Image, Modal, Icon} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';


const BeneficiaryOwnAccount = () => {
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const history = useNavigate();




    const donorDetails = {
        name: 'John Doe',
        address: '123 Charity Lane, Kindness City, CA',
        description: 'Generous donor helping various causes.',
        email: 'john.doe@example.com',
        raisedAmount: '$2000',
        profilePicture: 'https://via.placeholder.com/150',
        type: "individual",
        proofImages: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150'
        ],
        certificateImage: 'https://via.placeholder.com/150',
        verified: false
    };

    const handleUpdate = () => {
        history('/beneficiary/update-account');
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <div>
            <Navbar />

            <Container className="donor-account-container">
                <Header as="h1">Beneficiary Account</Header>
                <Segment>
                    <Header as="h2">Your Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={donorDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {beneficiary.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {beneficiary.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {beneficiary.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {beneficiary.username}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <h4>Type: {donorDetails.type}</h4>
                                {donorDetails.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{color: "green"}}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large"/><h4 style={{color: "red"}}>Not Verified</h4>
                                    </div>
                                )}
                            </Grid.Column>
                            <Grid.Column width={2}>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button primary onClick={handleUpdate}>Update</Button>
                </Segment>
                <Segment>
                    <Header as="h2">Donation Statistics</Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as="h3">Raised Amount</Header>
                            <p>{donorDetails.raisedAmount}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {donorDetails.proofImages.map((image, index) => (
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
                                src={donorDetails.certificateImage}
                                className="certificate-image"
                                onClick={() => handleImageClick(donorDetails.certificateImage)}
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
            <Requestnow />
        </div>
    );
};

export default BeneficiaryOwnAccount;
