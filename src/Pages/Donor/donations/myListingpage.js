import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid, Header, Image, List, Segment, Label, Icon, Button, Modal, Form } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../../Components/Donor/Sidebar/Sidebar3';
import './myListingPage.css';
import { useParams } from 'react-router-dom';
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

function MyListingPage(){
    const { donation_id } = useParams();
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedDonationTitle, setEditedDonationTitle] = useState("");
    const [editedDonationDescription, setEditedDonationDescription] = useState("");
    const [editedGoodsList, setEditedGoodsList] = useState([]); // Copy initial goods list
    const [editedMoneyAmount, setEditedMoneyAmount] = useState(0);
    const [editedPhone, setEditedPhone] = useState("");

    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [beneficiary, setBeneficiary] = useState({});

    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donation', { accepted: false, _id: donation_id });
            setDonation(response.data.donation);
            setBeneficiary(response.data.beneficiary);
            setRequest(response.data.request);
            console.log(beneficiary)
        } catch (error) {
            console.log(error);
        }
    };

    // Handle opening and closing of edit modal
    const handleEditModalOpen = () => {
        setEditedDonationTitle(donation.title);
        setEditedDonationDescription(donation.description);
        setEditedGoodsList(donation.goods.map(item => ({ ...item })))
        setEditedMoneyAmount(donation.value)
        setEditModalOpen(true);
        if(donation.phone){
            setEditedPhone(donation.phone)
        }
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    // Handle form submission for editing donation details
    const handleEditFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)

        const data = {
            title: editedDonationTitle,
            description: editedDonationDescription,
            goods: editedGoodsList,
            value: editedMoneyAmount,
            donation_id: donation._id,
            phone: editedPhone
        }

        const response = await axiosInstance.put('/donor/update_donation', data);
        if (response.status === 201) {

            console.log("something")
            setDonation(response.data.donation);
            console.log(data);
            handleEditModalClose()

        }

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
                        <Header as="h2" style = {{marginTop: "50px"}} className="page-header">Unaccepted Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {donor.name}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(beneficiary?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + beneficiary?.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: <a href={`http://localhost:3000/donor/beneficiaries/${beneficiary?._id}`}>{beneficiary?.name}</a></Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {donation.title}
                                                <List.Header>Donation Description</List.Header>
                                                {donation.description}
                                                <Button primary size='tiny' floated='right' onClick={handleEditModalOpen}>Edit</Button>
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {request.open ?
                                                    <a href={`http://localhost:3000/donor/open-requests/${request?._id}`}>{request?.title}</a>
                                                    :
                                                    <a href={`http://localhost:3000/donor/closed-requests/${request?._id}`}>{request?.title}</a>
                                                }

                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {request?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Recipient(Request) Phone</List.Header>
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
                                                        {donation?.goods.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {donation?.type === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {donation?.value}
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
                        {donation.type === 'goods' && (
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
                        {donation.type === 'monetary' && (
                            <Form.Field>
                                <label>Amount</label>
                                <input
                                    placeholder='Amount'
                                    value={editedMoneyAmount}
                                    onChange={(e) => setEditedMoneyAmount(e.target.value)}
                                />
                            </Form.Field>
                        )}
                        <Form.Field>
                            <label>Donation Phone</label>
                            <input
                                placeholder='Phone'
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                            />
                        </Form.Field>
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default MyListingPage;
