import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid, Header, Image, List, Segment, Label, Icon, Button, Modal } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar3 from '../../../Components/Beneficiary/Sidebar/Sidebar3';
// import './myListingPage2.css';
import { useParams, useNavigate } from 'react-router-dom';

import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});


const dummyDonation = {
    donorName: 'John Doe',
    donorProfilePic: 'https://via.placeholder.com/150',
    recipientName: 'Charity Org',
    recipientProfilePic: 'https://via.placeholder.com/150',
    donationType: 'goods',
    donationTitle: 'Winter Clothes Donation',
    donationDescription: 'This is a donation for winter clothes including jackets, sweaters, and gloves.',
    goodsList: [
        { item: 'Clothes', amount: '50 pieces' },
        { item: 'Books', amount: '30 pieces' },
        { item: 'Toys', amount: '20 pieces' }
    ],
    moneyAmount: '',
    requestTitle: 'Request for Winter Clothes',
    requestDescription: 'We are in need of winter clothes for the upcoming cold season. Your help will be greatly appreciated.',
    recipientPhone: '123-456-7890',
    donationPhone: '987-654-3210',
    accepted: false
};

function UnacceptedDonation(){
    const navigate = useNavigate();

    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const { donation_id } = useParams();
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);
    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [donor, setDonor] = useState({});


    const handleAcceptModalOpen = () => {
        setAcceptModalOpen(true);
    };

    const handleAcceptModalClose = () => {
        setAcceptModalOpen(false);
    };

    const handleAcceptDonation = async () => {
        // Perform logic to accept the donation (e.g., API call)
        try {
            const response = await axiosInstance.post('/beneficiary/accept_donation', { accepted: true, donation_id: donation_id })
            if (response.status === 200) {
                console.log('Donation accepted');
                setAcceptModalOpen(false);
                // Redirect to another page after accepting
                navigate(`/beneficiary/open-requests/${request._id}`);
            }

        }catch(error){
            console.error(error);
        }

    };

    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donation', { accepted: false, _id: donation_id });
            setDonation(response.data.donation);
            setDonor(response.data.donor);
            setRequest(response.data.request);
            console.log(request)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <Navbar />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar3 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style={{ marginTop: "50px", textAlign:"center" }}  className="page-headers">Unaccepted Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(donor?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor?.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: <a href={`http://localhost:3000/beneficiary/donors/${donor?._id}`}>{donor?.name}</a></Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(beneficiary.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + beneficiary.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Beneficiary: {beneficiary.name}</Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {donation?.title}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Description</List.Header>
                                                {donation?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {request.open ?
                                                    <a href={`http://localhost:3000/beneficiary/open-requests/${request?._id}`}>{request?.title}</a>
                                                    :
                                                    <a href={`http://localhost:3000/benficiary/closed-requests/${request?._id}`}>{request?.title}</a>
                                                }

                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {request?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Your(Request) Phone</List.Header>
                                                {request?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {donation?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {donation?.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {donation?.type === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {donation.goods.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {donation?.type === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {donation.value}
                                                </List.Item>
                                            )}
                                            <List.Item>
                                                <List.Header>Listed at</List.Header>
                                                {String(donation.created).slice(0,10) + " @ " + String(donation.created).slice(11,16)}
                                            </List.Item>
                                        </List>
                                        {!donation?.accepted && (
                                            <Label color='red' className='not-accepted-label'>
                                                <Icon name='flag' /> Not Accepted
                                            </Label>
                                        )}
                                        <Button primary size='tiny' floated='right' onClick={handleAcceptModalOpen}>Accept</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Accept Modal */}
            <Modal size='tiny' open={acceptModalOpen} onClose={handleAcceptModalClose}>
                <Modal.Header>Confirm Acceptance</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to accept this donation?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleAcceptModalClose}>No</Button>
                    <Button positive onClick={handleAcceptDonation}>Yes</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default UnacceptedDonation;
