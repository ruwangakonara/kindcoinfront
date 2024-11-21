import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon, Form, Input, Transition } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import './account.css';
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function OpenRequestPage() {
    const { request_id } = useParams();
    console.log(request_id);

    const navigate = useNavigate();


    const [request, setRequest] = useState({});
    const [open, setOpen] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [goods, setGoods] = useState([{ item: '', amount: '' }]);
    const [donationType, setDonationType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

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

    const handleSubmit = async () => {
        const payload = {
            user_id: user._id,
            donor_id: donor._id,
            request_id: request.requestDetails._id,
            beneficiary_id: request.requestDetails.beneficiary_id,
            type: request.requestDetails.type,
            title: title,
            description: description,
            value: amount,
            goods: request.requestDetails.type === 'goods' ? goods : []
        };

        console.log(payload)
        try {
            const response = await axiosInstance.post('/donor/create_donation', payload);
            if (response.status === 201) {
                const donation = response.data.donation
                navigate(`/donor/my-listings/${donation._id}`);
            }
        } catch (error) {
            console.log(error);
        }
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
                                <Image src={(request.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + request.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
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
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {/*{request.requestDetails?.images?.map((image, index) => (*/}
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
                                src={(request.requestDetails?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${request.requestDetails?.image1}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={(e) => handleImageClick(e.target.src)}
                                style={{ cursor: 'pointer' }}
                            />

                        </Grid.Column>
                        <Grid.Column width={4} key={1}>

                            <Image
                                src={(request.requestDetails?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${request.requestDetails?.image2}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={(e) => handleImageClick(e.target.src)}
                                style={{ cursor: 'pointer' }}
                            />

                        </Grid.Column>
                        <Grid.Column width={4} key={1}>

                            <Image
                                src={(request.requestDetails?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${request.requestDetails?.image3}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={(e) => handleImageClick(e.target.src)}
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
                                src={(request.requestDetails?.certificate_image !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_certificate/${request.requestDetails?.certificate_image}`
                                    : "https://via.placeholder.com/300"}
                                className="certificate-image"
                                onClick={(e) => handleImageClick(e.target.src)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                {request.requestDetails?.verified &&
                    <Button
                        color="green"
                        onClick={() => {
                            setDonationType(request.type);
                            setDonateOpen(true);
                        }}
                    >
                        Donate
                    </Button>
                }

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
                                <Input
                                    placeholder='Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <Input
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Field>
                            {request.requestDetails?.type === 'goods' ? (
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
                                    <Input
                                        placeholder='Amount'
                                        type='number'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
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
