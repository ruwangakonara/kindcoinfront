import React, { useState } from 'react';
import { Container, Grid, Header, Image, List, Segment, Label, Icon, Button, Modal, Form } from 'semantic-ui-react';
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
    accepted: false
};

const MyListingPage = () => {
    const { donation_id } = useParams();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedDonationTitle, setEditedDonationTitle] = useState(dummyDonation.donationTitle);
    const [editedDonationDescription, setEditedDonationDescription] = useState(dummyDonation.donationDescription);
    const [editedGoodsList, setEditedGoodsList] = useState(dummyDonation.goodsList.map(item => ({ ...item }))); // Copy initial goods list
    const [editedMoneyAmount, setEditedMoneyAmount] = useState(dummyDonation.moneyAmount);

    // Handle opening and closing of edit modal
    const handleEditModalOpen = () => {
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    // Handle form submission for editing donation details
    const handleEditFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)
        console.log('Updated Donation Details:', {
            editedDonationTitle,
            editedDonationDescription,
            editedGoodsList,
            editedMoneyAmount
        });
        setEditModalOpen(false);
    };

    // Handle adding a new item to the goods list
    const handleAddItem = (e) => {
        e.preventDefault(); // Prevent default form submission
        setEditedGoodsList([...editedGoodsList, { item: '', amount: '' }]);
    };

    // Handle removing an item from the goods list
    const handleRemoveItem = (index) => {
        const newGoodsList = [...editedGoodsList];
        newGoodsList.splice(index, 1);
        setEditedGoodsList(newGoodsList);
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
                        <Header as="h1" className="page-header">Donation Details</Header>
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
                                                <Button primary size='tiny' floated='right' onClick={handleEditModalOpen}>Edit</Button>
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
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Edit Modal */}
            <Modal size='tiny' open={editModalOpen} onClose={handleEditModalClose}>
                <Modal.Header>Edit Donation Details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleEditFormSubmit}>
                        <Form.Field>
                            <label>Donation Title</label>
                            <input
                                placeholder='Donation Title'
                                value={editedDonationTitle}
                                onChange={(e) => setEditedDonationTitle(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Donation Description</label>
                            <textarea
                                placeholder='Donation Description'
                                value={editedDonationDescription}
                                onChange={(e) => setEditedDonationDescription(e.target.value)}
                            />
                        </Form.Field>
                        {dummyDonation.donationType === 'goods' && (
                            <Form.Field>
                                <label>Goods List</label>
                                {editedGoodsList.map((goods, index) => (
                                    <div key={index}>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                placeholder='Item'
                                                value={goods.item}
                                                onChange={(e) => {
                                                    const newGoodsList = [...editedGoodsList];
                                                    newGoodsList[index].item = e.target.value;
                                                    setEditedGoodsList(newGoodsList);
                                                }}
                                            />
                                            <Form.Input
                                                fluid
                                                placeholder='Amount'
                                                value={goods.amount}
                                                onChange={(e) => {
                                                    const newGoodsList = [...editedGoodsList];
                                                    newGoodsList[index].amount = e.target.value;
                                                    setEditedGoodsList(newGoodsList);
                                                }}
                                            />
                                            {index > 0 && (
                                                <Button
                                                    icon='trash'
                                                    negative
                                                    onClick={() => handleRemoveItem(index)}
                                                    style={{ marginTop: '2rem' }}
                                                    type='button' // Specify type='button' to prevent form submission
                                                />
                                            )}
                                        </Form.Group>
                                    </div>
                                ))}
                                <Button primary onClick={handleAddItem}>Add Item</Button>
                            </Form.Field>
                        )}
                        {dummyDonation.donationType === 'monetary' && (
                            <Form.Field>
                                <label>Amount</label>
                                <input
                                    placeholder='Amount'
                                    value={editedMoneyAmount}
                                    onChange={(e) => setEditedMoneyAmount(e.target.value)}
                                />
                            </Form.Field>
                        )}
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default MyListingPage;
