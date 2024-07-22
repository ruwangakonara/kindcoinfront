import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, Header, Form, Button, Segment, Image, Card, Modal, List } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../../Components/Donor/Sidebar/Sidebar3';
import axios from 'axios';
import './donationPage.css';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import CryptoJS from 'crypto-js';

const DonationPage = () => {
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [donationAmount, setDonationAmount] = useState('');
    const [isPayhereLoaded, setIsPayhereLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [maintenances, setMaintenances] = useState([]);

    useEffect(() => {
        fetchMaintenances();

        const loadPayhereScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://www.payhere.lk/lib/payhere.js';
                script.async = true;
                script.onload = () => {
                    setIsPayhereLoaded(true);
                    resolve();
                };
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        loadPayhereScript()
            .then(() => {
                window.payhere.onCompleted = handlePaymentCompleted;
                window.payhere.onDismissed = handlePaymentDismissed;
                window.payhere.onError = handlePaymentError;
            })
            .catch((error) => {
                console.error('Failed to load PayHere script:', error);
            });

        return () => {
            const script = document.querySelector('script[src="https://www.payhere.lk/lib/payhere.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };

        // Fetch maintenances when the component mounts
    }, []);

    const fetchMaintenances = async () => {
        try {
            const response = await axios.post('http://localhost:9013/donor/get_maintenance', {user_id: user._id}, { withCredentials: true });
            setMaintenances(response.data.dons);
        } catch (error) {
            console.error('Failed to fetch maintenances:', error);
        }
    };

    const generateHash = (merchantId, orderId, amount, currency, merchantSecret) => {
        const formattedAmount = Number(amount).toFixed(2);
        const hashString = merchantId + orderId + formattedAmount + currency + CryptoJS.MD5(merchantSecret).toString().toUpperCase();
        return CryptoJS.MD5(hashString).toString().toUpperCase();
    };

    const handlePaymentCompleted = async (orderId) => {
        console.log('Payment completed. OrderID:', orderId);
        try {
            const response = await axios.post('http://localhost:9013/donor/maintenance_done', {
                donor_id: donor._id,
                user_id: user._id,
                name: donor.name,
                amount: donationAmount, // Ensure the donationAmount is passed correctly
                orderId: orderId,
            }, { withCredentials: true });

            console.log(response);

            if (response.status === 200) {
                setModalMessage('Donation successful!');
                fetchMaintenances(); // Fetch maintenances after a successful donation
            } else {
                setModalMessage('Donation failed. Please try again.');
            }
            setOpenModal(true);
        } catch (error) {
            console.error('Failed to notify backend of donation completion:', error);
            setModalMessage('Donation failed. Please try again.');
            setOpenModal(true);
        }
    };

    const handlePaymentDismissed = () => {
        console.log('Donation dismissed');
        setModalMessage('Donation dismissed. Please try again.');
        setOpenModal(true);
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
        setModalMessage('Donation error. Please try again.');
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setModalMessage('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!isPayhereLoaded) {
            console.error('PayHere script is not loaded yet');
            return;
        }

        const orderId = `ORDER_${Date.now()}`;
        const merchantId = '1225403'; // Replace with your Merchant ID
        const currency = 'LKR';
        const merchantSecret = 'MzU1NTkwOTc4MTE2NzA3ODYzMDI1MjA1NDQyNDkxMzQ2MTgwMDA2'; // Replace with your Merchant Secret

        const hash = generateHash(merchantId, orderId, donationAmount, currency, merchantSecret);

        const paymentDetails = {
            sandbox: true,
            merchant_id: merchantId,
            return_url: 'http://localhost:3000/payment-success',
            cancel_url: 'http://localhost:3000/payment-cancel',
            notify_url: 'http://localhost:9013/payment-notify',
            order_id: orderId,
            items: 'Platform Maintenance Donation',
            amount: donationAmount,
            currency: currency,
            first_name: donor.name,
            last_name: '',
            email: donor.email,
            phone: '',
            address: '',
            city: '',
            country: 'Sri Lanka',
            hash: hash,
        };

        window.payhere.startPayment(paymentDetails);
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
                        <Header as="h1" className="page-header" style={{ color: '#333333', textAlign: 'center', margin: '20px 0', marginTop: "50px" }}>
                            Platform Maintenance Donation
                        </Header>
                        <Header as="h3" className="page-subheader" style={{ color: '#666666', textAlign: 'center', margin: '20px 0', marginTop: "30px" }}>
                            Your generosity keeps this platform running smoothly.
                        </Header>
                        <Segment raised padded="very" style={{ background: '#FFFFFF', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Card style={{ boxShadow: 'none' }}>
                                            <Image src={donor.profile_image} wrapped ui={false} style={{ borderRadius: '50%', width: '150px', height: '150px', margin: 'auto', display: "flex" }} />
                                            <Card.Content style={{ position: "relative" }} textAlign="center">
                                                <Card.Header style={{ color: '#1E90FF' }}>{donor.name}</Card.Header>
                                                <Card.Description>{donor.description}</Card.Description>
                                                <Card.Description>{donor.username}</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        <Form onSubmit={handleFormSubmit} style={{ padding: '20px' }}>
                                            <Form.Field>
                                                <label style={{ color: '#1E90FF', fontWeight: 'bold' }}>Donation Amount (LKR)</label>
                                                <input
                                                    type='number'
                                                    placeholder='Enter amount'
                                                    value={donationAmount}
                                                    onChange={(e) => setDonationAmount(e.target.value)}
                                                    required
                                                    style={{ padding: '10px', borderRadius: '5px', borderColor: '#1E90FF', width: '100%' }}
                                                />
                                            </Form.Field>
                                            <Button type='submit' primary style={{ background: '#1E90FF', color: '#FFFFFF', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>
                                                Donate Now
                                            </Button>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Header as="h3" className="maintenance-header" style={{ color: '#333333', textAlign: 'center', margin: '20px 0', marginTop: "50px" }}>
                            Recent Maintenances
                        </Header>
                        <Segment raised padded="very" style={{ background: '#FFFFFF', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <List divided relaxed>
                                {maintenances.map((maintenance) => (
                                    <List.Item key={maintenance._id}>
                                        <List.Content>
                                            <List.Header as='a'>{maintenance.name}</List.Header>
                                            <List.Description as='a'>{maintenance.description}</List.Description>
                                            <List.Description as='a'>{`Donated Amount: ${maintenance.amount} LKR`}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            <Modal
                open={openModal}
                onClose={handleModalClose}
                size='tiny'
            >
                <Modal.Header>{modalMessage}</Modal.Header>
                <Modal.Actions>
                    <Button style = {{background: '#1E90FF'}} onClick={handleModalClose} positive>
                        OK
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default DonationPage;
