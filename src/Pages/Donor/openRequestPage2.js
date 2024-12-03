import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Button, Icon, Form, Input, Transition } from 'semantic-ui-react';
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

    const handleRemoveGood = (index) => {
        const newGoods = goods.filter((_, i) => i !== index);
        setGoods(newGoods);
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
                                <Image src={(request.profile_image !== "https://via.placeholder.com/150") ? ("http://localhost:9013/images/profileimages/beneficiary/" + request.profile_image) : "https://via.placeholder.com/150"} circular className="profile-picture" />
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
                                    <List.Item>
                                        <List.Header>Posted at</List.Header>
                                        {request.requestDetails?.created.slice(0, 10) + " @ " + request.requestDetails?.created.slice(11, 16)}
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
                {donateOpen && (
                    <div
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', border: '2px solid black', padding: '20px', zIndex: 1000, borderRadius: '10px', boxShadow: '0px 6px 15px rgba(0,0,0,0.3)', width: '60%', animation: 'fadeIn 0.3s ease', }}>
                        <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Donation Modal</h2>
                        <form>
                            {/* Title */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                                    Donation Title
                                </label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter donation title" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', }} />
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" style={{ width: '100%', height: '80px', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', }} />
                            </div>

                            {/* Amount (Monetary Donations Only) */}
                            {request.requestDetails?.type === 'monetary' && (
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Amount</label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', }} />
                                </div>
                            )}

                            {/* Goods List (Goods Donations Only) */}
                            {request.requestDetails?.type === 'goods' && (
                                <div>
                                    <h4 style={{ marginBottom: '10px' }}>Goods</h4>
                                    {goods.map((good, index) => (
                                        <div
                                            key={index}
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', }}>
                                            <input type="text" value={good.item}
                                                   onChange={(e) =>
                                                       handleGoodChange(index, 'item', e.target.value)
                                                   }
                                                   placeholder="Item name"
                                                   style={{ width: '70%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', }}
                                            />
                                            <input
                                                type="text" value={good.amount}
                                                onChange={(e) =>
                                                    handleGoodChange(index, 'amount', e.target.value)
                                                }
                                                placeholder="Amount"
                                                style={{ width: '25%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px', }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveGood(index)}
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    padding: '5px 10px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddGood}
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            padding: '10px 15px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Add Good
                                    </button>
                                </div>
                            )}

                            {/* Submit & Close Buttons */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '20px',
                                }}
                            >
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => setDonateOpen(false)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {/* Background overlay */}
                {donateOpen && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 999,
                            animation: 'fadeIn 0.3s ease',
                        }}
                        onClick={() => setDonateOpen(false)}
                    ></div>
                )}
            </Container>
</div>
);
}

export default OpenRequestPage;

