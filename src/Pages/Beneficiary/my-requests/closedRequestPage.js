import React, {useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon } from 'semantic-ui-react';
import {useNavigate, useParams} from 'react-router-dom';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import './account.css';
import Accepted from "../../../Components/Beneficiary/Donation/Accepted";
import Unaccepted from "../../../Components/Beneficiary/Donation/Unaccepted";
import CompletedDonation from "../../../Components/Beneficiary/Donation/CompletedDonation";
import axios from 'axios';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

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
        donorName: "rawdon"


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
        accepted: true,
        donorName: "rawdon"


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
        id:35354354,
        donorName: "rawdon"


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
        id:35354354,
        donorName: "rawdon"



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
        donorName: "rawdon"

    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        donorName: "rawdon"

    },
];

function BeneficiaryOwnClosedRequestPage(){
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const navigate = useNavigate();

    const { request_id } = useParams();
    console.log(request_id);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [requestDetails, setRequestDetails] = useState({});


    const [acceptedDonations, setAcceptedDonations] = useState([])
    const [unacceptedDonations, setUnacceptedDonations] = useState([])
    const [completedDonations, setCompletedDonations] = useState([])


    async function fetchRequestDetails() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_my_request', {_id: request_id, open: false});

            if (response.status === 200) {
                const requestDet = response.data.request;
                setRequestDetails(requestDet);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchAcceptedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, accepted: true, verified:false});

            if (response.status === 200) {
                const donations = response.data.donations;
                setAcceptedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchUnacceptedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, accepted: false});

            if (response.status === 200) {
                const donations = response.data.donations;
                setUnacceptedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCompletedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, verified: true});

            if (response.status === 200) {
                const donations = response.data.donations;
                setCompletedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchRequestDetails();
        fetchAcceptedDonations()
        fetchUnacceptedDonations()
        fetchCompletedDonations()
    }, []);


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
                                <Image src={(beneficiary.profile_image !== "https://via.placeholder.com/150"
                                    ? `http://localhost:9013/images/profileimages/beneficiary/${beneficiary.profile_image}`
                                    : "https://via.placeholder.com/150")} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    {/*<List.Item>*/}
                                    {/*    <List.Header>Name</List.Header>*/}
                                    {/*    <a href={`donor/beneficiaries/${requestDetails.beneficiary}`}>{requestDetails.name}</a>*/}
                                    {/*</List.Item>*/}

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
                        {/*{requestDetails.proofImages.map((image, index) => (*/}
                        {/*    <Grid.Column width={4} key={index}>*/}
                        {/*        <Image*/}
                        {/*            src={image}*/}
                        {/*            className="proof-image"*/}
                        {/*            onClick={() => handleImageClick(image)}*/}
                        {/*            style={{ cursor: 'pointer' }}*/}
                        {/*        />*/}
                        {/*    </Grid.Column>*/}
                        {/*))}*/}
                        <Grid.Column width={4} key={1}>
                            <Image
                                src={(requestDetails?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image1}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image1}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={2}>
                            <Image
                                src={(requestDetails?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image2}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image2}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={3}>
                            <Image
                                src={(requestDetails?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image3}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image3}`
                                    : "https://via.placeholder.com/300")}
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
                    {acceptedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Accepted
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                accepted={donation.donationDetails.accepted}
                                id={donation.donationDetails._id}
                                donorName={donation.name}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>


            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Non Accepted Donations</Header>

                <Grid>
                    {unacceptedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Unaccepted
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                accepted={donation.donationDetails.accepted}
                                id={donation.donationDetails._id}
                                donorName={donation.name}

                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Completed Donations</Header>

                <Grid>
                    {completedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <CompletedDonation
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                id={donation.donationDetails._id}
                                donorName={donation.name}

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
