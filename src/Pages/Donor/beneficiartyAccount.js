import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon } from 'semantic-ui-react';
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

function BeneficiaryAccount() {
    const { beneficiary_id } = useParams();
    console.log('Beneficiary ID:', beneficiary_id); // Check if ID is correctly logged

    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [beneficiary, setBeneficiary] = useState(null); // Initialize beneficiary state

    const history = useNavigate();

    const fetchBeneficiaryDetails = async () => {
        console.log("Fetching beneficiary details...");
        try {
            const response = await axiosInstance.post('/donor/get_beneficiary', { _id: beneficiary_id });
            console.log("Response:", response);
            if (response.status === 200) {
                const beneficiaryDet = response.data.beneficiary;
                console.log("Beneficiary Details:", beneficiaryDet);
                setBeneficiary(beneficiaryDet); // Update state with fetched details
            } else {
                console.error(`Error: Received status code ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching beneficiary details:', error);
        }
    };

    useEffect(() => {
        fetchBeneficiaryDetails();
    }, [beneficiary_id]); // Add beneficiary_id to dependency array

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <div>
            <Navbar2 />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Beneficiary Account</Header>
                <Segment>
                    <Header as="h2">Beneficiary Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={beneficiary && (beneficiary.profile_image !== "https://via.placeholder.com/150" ? `http://localhost:9013/images/profileimages/beneficiary/${beneficiary.profile_image}` : "https://via.placeholder.com/150")} circular className="profile-picture"/>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        {beneficiary?.name}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {beneficiary?.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>District</List.Header>
                                        {beneficiary?.district}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {beneficiary?.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {beneficiary?.username}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Telephone</List.Header>
                                        {beneficiary?.phoneNo}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <h4>Type: {beneficiary?.type}</h4>
                                {beneficiary?.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{ color: "green" }}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large" /><h4 style={{ color: "red" }}>Not Verified</h4>
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {beneficiary && (
                            <>
                                <Grid.Column width={4} key={1}>
                                    <Image
                                        src={(beneficiary.image1 !==  "https://via.placeholder.com/300" ) ?  ("http://localhost:9013/images/beneficiary_proof/" + beneficiary.image1): "https://via.placeholder.com/300"}
                                        className="proof-image"
                                        onClick={() => handleImageClick(beneficiary.image1)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4} key={2}>
                                    <Image
                                        src={(beneficiary.image2 !==  "https://via.placeholder.com/300" ) ?  ("http://localhost:9013/images/beneficiary_proof/" + beneficiary.image2): "https://via.placeholder.com/300"}
                                        className="proof-image"
                                        onClick={() => handleImageClick(beneficiary.image2)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4} key={3}>
                                    <Image
                                        src={(beneficiary.image3 !==  "https://via.placeholder.com/300" ) ?  ("http://localhost:9013/images/beneficiary_proof/" + beneficiary.image3): "https://via.placeholder.com/300"}
                                        className="proof-image"
                                        onClick={() => handleImageClick(beneficiary.image3)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Grid.Column>
                            </>
                        )}
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">GS/DS Certificate</Header>
                    <Grid>
                        <Grid.Column width={16}>
                            <Image
                                src={(beneficiary?.certificate_image !==  "https://via.placeholder.com/300" ) ?  ("http://localhost:9013/images/beneficiary_proof/" + beneficiary?.certificate_image): "https://via.placeholder.com/300"}
                                className="certificate-image"
                                onClick={() => handleImageClick(beneficiary?.certificateImage)}
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
            <Donatenow/>
        </div>
    );
}

export default BeneficiaryAccount;
