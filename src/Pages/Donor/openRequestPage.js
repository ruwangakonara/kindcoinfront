import React, { useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon, Form, Input, Transition } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import './account.css';
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const OpenRequestPage = () => {
    const { request_id } = useParams();
    console.log(request_id);

    const [open, setOpen] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [goods, setGoods] = useState([{ item: '', amount: '' }]);
    const [donationType, setDonationType] = useState('');
    const navigate = useNavigate();

    const requestDetails = {
        name: 'Charity Org',
        title:"Need Some Food. Can I Get a Meal?",
        address: '456 Help St, Generosity Town, CA',
        description: 'Aint eate in centureies so feed me.',
        email: 'info@charityorg.org',
        telephone: '123-456-7890',
        profilePicture: 'https://via.placeholder.com/150',
        proofImages: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300'
        ],
        certificateImage: 'https://via.placeholder.com/300',
        verified: false,
        beneficiary: "sdfsdf",
        raised: 45969,
        type: "monetary",
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleAddGood = () => {
        setGoods([...goods, { item: '', amount: '' }]);
    };

    const handleGoodChange = (index, key, value) => {
        const newGoods = [...goods];
        newGoods[index][key] = value;
        setGoods(newGoods);
    };

    const handleSubmit = () => {
        // Handle the donation submission here
        // Redirect after submission
        navigate('/donor/my-listings');
    };

    return (
        <div>
            <Navbar2 />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Open Request</Header>
                <Segment>
                    <Header as="h2">Request Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={requestDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        <a href={`donor/beneficiaries/${requestDetails.beneficiary}`}>{requestDetails.name}</a>
                                    </List.Item>
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
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {requestDetails.proofImages.map((image, index) => (
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
                                src={requestDetails.certificateImage}
                                className="certificate-image"
                                onClick={() => handleImageClick(requestDetails.certificateImage)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Button
                    color="green"
                    onClick={() => {
                        setDonationType(requestDetails.type);
                        setDonateOpen(true);
                    }}
                >
                    Donate
                </Button>
            </Container>

            <Modal open={open} onClose={() => setOpen(false)} size='large'>
                <Modal.Content>
                    <Image src={selectedImage} fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>

            <Transition visible={donateOpen} animation='scale' duration={500}>
                <Modal open={donateOpen} onClose={() => setDonateOpen(false)} size='large'>
                    <Modal.Header>Create a Donation</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Title</label>
                                <Input placeholder='Title' />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <Input placeholder='Description' />
                            </Form.Field>
                            {donationType === 'goods' ? (
                                <>
                                    {goods.map((good, index) => (
                                        <Form.Group widths='equal' key={index}>
                                            <Form.Field>
                                                <label>Item</label>
                                                <Input
                                                    placeholder='Item'
                                                    value={good.item}
                                                    onChange={(e) => handleGoodChange(index, 'item', e.target.value)}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Amount</label>
                                                <Input
                                                    placeholder='Amount'
                                                    value={good.amount}
                                                    onChange={(e) => handleGoodChange(index, 'amount', e.target.value)}
                                                />
                                            </Form.Field>
                                        </Form.Group>
                                    ))}
                                    <Button type='button' onClick={handleAddGood}>
                                        Add More Goods
                                    </Button>
                                </>
                            ) : (
                                <Form.Field>
                                    <label>Amount</label>
                                    <Input placeholder='Amount' type='number' />
                                </Form.Field>
                            )}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => setDonateOpen(false)}>
                            Cancel
                        </Button>
                        <Button color='green' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Transition>
            <Donatenow />
        </div>
    );
}

export default OpenRequestPage;
