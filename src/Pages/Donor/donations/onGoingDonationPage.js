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
    ]
};

const OnGoingDonationPage = () => {
    const { donation_id } = useParams();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedImages, setEditedImages] = useState(dummyDonation.images);

    // Handle opening and closing of edit modal
    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

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
    const handleEditFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)
        console.log('Updated Images:', editedImages);
        setEditModalOpen(false);
    };

    // Handle adding a new image
    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedImages([...editedImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle removing an image
    const handleRemoveImage = (index) => {
        const newImages = [...editedImages];
        newImages.splice(index, 1);
        setEditedImages(newImages);
    };

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar3 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style = {{marginTop: "50px"}} className="page-header">Ongoing Donation</Header>
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
                                                <div style={{textAlign: "right", marginBottom: "5px"}}>
                                                    {!dummyDonation.verified && (
                                                        <Label color='red' className='status-label'>
                                                            <Icon name='warning'/> Not Verified
                                                        </Label>
                                                    )}

                                                </div>
                                                {!dummyDonation.verified && (
                                                    <Button primary size='tiny' floated='right'
                                                            onClick={handleEditModalOpen}>Edit</Button>
                                                )}
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
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>

            {/* Edit Modal */}
            <Modal size='tiny' open={editModalOpen} onClose={handleEditModalClose}>
                <Modal.Header>Edit Donation Images</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleEditFormSubmit}>
                        <Form.Field>
                            <label>Upload New Image</label>
                            <input type="file" accept="image/*" onChange={handleAddImage} />
                        </Form.Field>
                        <Form.Field>
                            <label>Current Images</label>
                            <div className="additional-images">
                                {editedImages.map((image, index) => (
                                    <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
                                        <Image src={image} size='small' spaced />
                                        <Button
                                            icon='trash'
                                            negative
                                            onClick={() => handleRemoveImage(index)}
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            type='button'
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form.Field>
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default OnGoingDonationPage;
