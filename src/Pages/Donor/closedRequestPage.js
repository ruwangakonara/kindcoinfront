import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon } from 'semantic-ui-react';
import {useNavigate, useParams} from 'react-router-dom';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import './account.css';
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";
import donation from "../../Components/Donor/Donation/Donation";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function ClosedRequestPage(){
    const { request_id } = useParams();
    console.log(request_id);

    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [request, setRequest] = useState({});



    const get_request = useCallback(async () => {
        try {
            const response = await axiosInstance.post('/donor/getrequest', { _id: request_id });
            setRequest(response.data.request);
            console.log(response.data.request);
        } catch (error) {
            console.log(error);
        }
    }, [request_id]);

    useEffect(() => {
        get_request();
    }, [get_request]);

    // const requestDetails = {
    //     name: 'Charity Org',
    //     title:"Need Some Food. Can I Get a Meal?",
    //     // address: '456 Help St, Generosity Town, CA',
    //     description: 'Aint eate in centureies so feed me.',
    //     email: 'info@charityorg.org',
    //     telephone: '123-456-7890',
    //     profilePicture: 'https://via.placeholder.com/150',
    //     proofImages: [
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300'
    //     ],
    //     certificateImage: 'https://via.placeholder.com/300',
    //     // type: "organization",
    //     verified: false,// Change to true to see the green flag
    //     beneficiary:"sdfsdf",
    //     raised:45969
    // };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <div>
            <Navbar2 />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Closed Request</Header>
                <Segment>
                    <Header as="h2">Request Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={request.profile_image} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        <a href={`/donor/beneficiaries/${request.beneficiary_id}`}>{request.name}</a>
                                    </List.Item>

                                    <List.Item>
                                    <List.Header>Title</List.Header>
                                        {request.requestDetails?.title}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {request.requestDetails?.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {request.requestDetails?.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {request.requestDetails?.email}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Telephone</List.Header>
                                        {request.requestDetails?.phone}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <h4>Type: {request.requestDetails?.type}</h4>
                                {request.requestDetails?.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{color: "green"}}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large"/><h4 style={{color: "red"}}>Not Verified</h4>
                                    </div>
                                )}
                                <h2>Raised {request.requestDetails?.raised} LKR</h2>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {request.requestDetails?.images?.map((image, index) => (
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
                                src={request.requestDetails?.certificate_image}
                                className="certificate-image"
                                onClick={() => handleImageClick(request.requestDetails?.certificate_image)}
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

export default ClosedRequestPage;
