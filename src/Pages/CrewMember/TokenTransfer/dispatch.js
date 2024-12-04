//Token Batch Transfer

import React, { useEffect, useState } from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import { Container, Grid, Segment, Button, Modal, Header, Input } from "semantic-ui-react";
import axios from 'axios';
import './tokenTransfer2.css';
import { useAuthCheck } from '../../../hooks/useAuthHook';
// import stellarImage from '../../../../../../public/images/stellar.webp';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const Dispatcher = () => {
    // useAuthCheck();
    const [balance, setBalance] = useState(null);
    const [key, setKey] = useState(null);
    const [amount, setAmount] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        getBalance();
    }, []);

    const getBalance = async () => {
        try {
            const response = await axiosInstance.get('/crew/get_balance');
            setBalance(response.data.balance);
            setKey(response.data.key);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const dispatch = async (amount) => {
        try {
            const response = await axiosInstance.post('/crew/dispatch', { amount });
            if (response.status === 200) {
                setModalMessage("Token transfer successful!");
            } else {
                setModalMessage("Token transfer failed. Please try again.");
            }
        } catch (error) {
            setModalMessage("An error occurred during token transfer.");
        } finally {
            setIsModalOpen(true); // Open modal to show message
            getBalance(); // Refresh the balance after transfer
        }
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = () => {
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
            dispatch(amount);
        } else {
            setModalMessage("Please enter a valid amount.");
            setIsModalOpen(true);
        }
    };

    const closeConfirmationModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: '1' }}>
                <HeaderCrew />
                <Container style={{ padding: '20px', top: "100px", position: 'relative' }}>
                    <Grid>
                        <Grid.Column width={4}>
                            {/* Sidebar Column */}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <h2>Dispatch KINDCOIN</h2>
                                <div>
                                    <h3>Distributor Account Key:</h3>
                                    <p>{key}</p>
                                    <h3>Current Balance: KINDCOIN {balance}</h3>
                                </div>
                                <div>
                                    <h3>Enter the Amount of KINDCOIN to Dispatch:</h3>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Amount"
                                        min="0"
                                        step="any"
                                    />
                                    <Button positive onClick={handleSubmit}>Submit</Button>
                                </div>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            {/* Right Side Column */}
                            <img src="/stellar.webp" alt="Stellar" style={{ width: '100%' }} />
                        </Grid.Column>
                    </Grid>

                    {/* Success or Failure Message Modal */}
                    <Modal
                        open={isModalOpen}
                        onClose={closeConfirmationModal}
                        size="small"
                    >
                        <Modal.Header>Message</Modal.Header>
                        <Modal.Content>
                            <p>{modalMessage}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={closeConfirmationModal} color="blue">
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Container>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '7.5%' }}>
                    <img src="/token.png" alt="Stellar" style={{ width: '15%' }} />
                </div>
            </div>
            
        </div>
    );
};

export default Dispatcher;
