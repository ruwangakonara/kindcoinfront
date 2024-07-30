import React, { useState } from 'react';
import { Container, Grid, Header, Image, List, Segment, Label, Icon, Button, Modal } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar3 from '../../../Components/Beneficiary/Sidebar/Sidebar3';
// import './myListingPage2.css';
import { useParams, useNavigate } from 'react-router-dom';

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

const UnacceptedDonation = () => {
    const { donation_id } = useParams();
    const navigate = useNavigate();
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);

    const handleAcceptModalOpen = () => {
        setAcceptModalOpen(true);
    };

    const handleAcceptModalClose = () => {
        setAcceptModalOpen(false);
    };

    const handleAcceptDonation = () => {
        // Perform logic to accept the donation (e.g., API call)
        console.log('Donation accepted');
        setAcceptModalOpen(false);
        // Redirect to another page after accepting
        navigate('/some-other-page');
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
                                        <Image src={dummyDonation.donorProfilePic} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {dummyDonation.donorName}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={dummyDonation.recipientProfilePic} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: {dummyDonation.recipientName}</Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {dummyDonation.donationTitle}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {dummyDonation.requestTitle}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {dummyDonation.requestDescription}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Recipient Phone</List.Header>
                                                {dummyDonation.recipientPhone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {dummyDonation.donationPhone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {dummyDonation.donationType === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {dummyDonation.donationType === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {dummyDonation.goodsList.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {dummyDonation.donationType === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {dummyDonation.moneyAmount}
                                                </List.Item>
                                            )}
                                        </List>
                                        {!dummyDonation.accepted && (
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
