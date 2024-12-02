import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Button, Segment, Image, Modal, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './account.css';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow";
import axios from 'axios';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function BeneficiaryOwnAccount() {
    const { user, userDetails, setUserDetails } = useContext(UserContext);
    const [beneficiary, setBeneficiary] = useState(null);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const history = useNavigate();

    async function fetchBeneficiaryDetails() {
        try {
            const response = await axiosInstance.get('/beneficiary/get_account');

            if (response.status === 200) {
                const beneficiaryDet = response.data.beneficiary;
                setBeneficiary(beneficiaryDet);
                setUserDetails(beneficiaryDet);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBeneficiaryDetails();
    }, []);

    const handleUpdate = () => {
        history('/beneficiary/update-account');
    };

    const handleImageClick = (imagePath, type) => {
        let imageUrl;

        if (type === 'proof') {
            imageUrl = imagePath !== "https://via.placeholder.com/300"
                ? `http://localhost:9013/images/beneficiary_proof/${imagePath}`
                : "https://via.placeholder.com/300";
        } else if (type === 'certificate') {
            imageUrl = imagePath !== "https://via.placeholder.com/300"
                ? `http://localhost:9013/images/beneficiary_certificate/${imagePath}`
                : "https://via.placeholder.com/300";
        }

        setSelectedImage(imageUrl);
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
                                <Image
                                    src={beneficiary && (beneficiary.profile_image !== "https://via.placeholder.com/150"
                                        ? `http://localhost:9013/images/profileimages/beneficiary/${beneficiary.profile_image}`
                                        : "https://via.placeholder.com/150")}
                                    circular
                                    className="profile-picture"
                                />
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
                                    <List.Item>
                                        <List.Header>District</List.Header>
                                        {beneficiary?.district}
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
                    <Button primary onClick={handleUpdate}>Update</Button>
                </Segment>
                <Segment>
                    <Header as="h2">Donation Statistics</Header>
                    <Grid>
                        <Grid.Column width={8}>
                            <Header as="h3">Raised Amount</Header>
                            <p>{beneficiary?.raisedAmount}</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        <Grid.Column width={4} key={1}>
                            <Image
                                src={(beneficiary?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary?.image1}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick(beneficiary?.image1, 'proof')}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={2}>
                            <Image
                                src={(beneficiary?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary?.image2}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick(beneficiary?.image2, 'proof')}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={3}>
                            <Image
                                src={(beneficiary?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary?.image3}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick(beneficiary?.image3, 'proof')}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">GS/DS Certificate</Header>
                    <Grid>
                        <Grid.Column width={16}>
                            <Image
                                src={(beneficiary?.certificate_image !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/beneficiary_certificate/${beneficiary?.certificate_image}`
                                    : "https://via.placeholder.com/300"}
                                className="certificate-image"
                                onClick={() => handleImageClick(beneficiary?.certificate_image, 'certificate')}
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
}

export default BeneficiaryOwnAccount;
