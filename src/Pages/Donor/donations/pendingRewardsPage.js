import React, { useState } from 'react';
import {Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label} from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../../Components/Donor/Sidebar/Sidebar3';
import './myListingPage.css';
import { useParams } from 'react-router-dom';

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
    amount: 84654,
    tokens: 5865,
    moneyAmount: '',
    requestTitle: 'Request for Winter Clothes',
    requestDescription: 'We are in need of winter clothes for the upcoming cold season. Your help will be greatly appreciated.',
    recipientPhone: '123-456-7890',
    donationPhone: '987-654-3210',
    verified: false,
    images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
    ],

};

const PendingRewardsPage = () => {
    const { donation_id } = useParams();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedImages, setEditedImages] = useState(dummyDonation.images);

    // Handle opening and closing of edit modal


    // Handle opening and closing of image modal
    const handleImageModalOpen = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    // Handle form submission for editing donation details

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar3 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style = {{marginTop: "50px"}} className="page-header">Pending Reward Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={dummyDonation.donorProfilePic} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {dummyDonation.donorName}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={dummyDonation.recipientProfilePic} circular
                                               className="profile-picture"/>
                                        <Header as="h3"
                                                className="image-label">Recipient: {dummyDonation.recipientName}</Header>
                                        <Label style={{marginTop: '10px'}} color='green'
                                               className='not-accepted-label'>Accepted</Label>
                                        <div style={{color: 'green'}}>
                                            <Icon name='check circle' color='green'/>
                                            Verified
                                        </div>
                                        <Label style={{marginTop: '15px'}} color='orange'
                                               className='not-accepted-label'>Tokens Pending</Label>
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
                                                <a href="/donor/open-requests/66a839c8dcf503fee44ea1ce">{dummyDonation.requestTitle}</a>
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
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h3">Additional Images</Header>
                                        <div className="additional-images">
                                            {dummyDonation.images.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    src={image}
                                                    size='small'
                                                    spaced
                                                    onClick={() => handleImageModalOpen(image)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        <Segment>
                            {/*<Header as="h2">Donation Statistics</Header>*/}
                            <Grid>
                                <Grid.Column width={8}>
                                    <Header as="h3">Amount</Header>
                                    <p>{dummyDonation.amount}</p>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as="h3">Tokens</Header>
                                    <p>{dummyDonation.tokens}</p>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>


        </div>
    );
}

export default PendingRewardsPage;
