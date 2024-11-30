import React, { useEffect, useState } from "react";
import { Container, Grid, Segment, Button, Modal } from "semantic-ui-react";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import axios from "axios";
import "./tokenTransfer2.css";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9013",
    withCredentials: true,
});

const DocVerification = () => {
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getDonations();
    }, []);

    const getDonations = async () => {
        try {
            const response = await axiosInstance.post("/crew/get_donations", {
                doc_verified: false,
                rewarded: true,
            });
            setDonations(response.data.donations);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const fetchTransactionDetails = async (docTransactionId, donation) => {
        if (!docTransactionId) {
            setErrorModalMessage("Transaction ID is empty.");
            return;
        }
        try {
            const response = await axiosInstance.post("/crew/get_transaction", {
                transaction_id: docTransactionId,
            });

            if (response.status === 200) {
                setTransactionDetails(response.data.transaction);
                setSelectedDonation(donation);
                setIsModalOpen(true);
            } else {
                setErrorModalMessage("Failed to fetch transaction details.");
            }
        } catch (error) {
            console.error("Error fetching transaction details:", error);
            setErrorModalMessage("An error occurred while fetching the transaction.");
        }
    };

    const handleVerifyTransaction = async (donationId) => {
        try {
            const response = await axiosInstance.post("/crew/verify_donation_doc", {
                donation_id: donationId,
            });

            if (response.status === 200) {
                setSuccessMessage("Transaction successfully verified.");
            } else {
                setSuccessMessage("Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying transaction:", error);
            setSuccessMessage("An error occurred during verification.");
        } finally {
            setIsModalOpen(false);
            getDonations(); // Refresh donations list
        }
    };

    const closeErrorModal = () => setErrorModalMessage("");

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Sidebar />
            <div style={{ flex: "1" }}>
                <HeaderCrew />
                <Container style={{ padding: "20px", top: "100px", position: "relative" }}>
                    <Grid>
                        <Grid.Column width={12}>
                            <Segment>
                                <h2>Donation Attestation Fee Verification</h2>
                                <Grid stackable columns={3}>
                                    {donations?.length > 0 ? (
                                        donations.map((donation) => (
                                            <Grid.Column key={donation?.donationDetails?._id}>
                                                <Segment>
                                                    <p>
                                                        <strong>Donation ID:</strong> {donation?.donationDetails?._id}
                                                    </p>
                                                    <p>
                                                        <strong>Donation:</strong> {donation?.donationDetails?.title}
                                                    </p>
                                                    <p>
                                                        <strong>Value:</strong> {donation?.donationDetails?.value}
                                                    </p>
                                                    <p><strong>Request:</strong> {donation?.requestDetails?.title}</p>
                                                    <p><strong>Donor:</strong> {donation?.donorDetails?.name}</p>
                                                    <p>
                                                        <strong>Beneficiary:</strong> {donation?.beneficiaryDetails?.name}
                                                    </p>
                                                    <p>
                                                        <strong>Reward:</strong> {donation?.donationDetails?.token_amount} KindCoin
                                                    </p>
                                                    <p>
                                                        <strong>Attestation
                                                            Fee:</strong> {donation?.donationDetails?.attestation_fee} KindCoin
                                                    </p>
                                                    <p>
                                                        <strong>Attestation Fee Transac ID:</strong> {donation?.donationDetails?.doc_transac_id}
                                                    </p>
                                                    <Button
                                                        primary
                                                        onClick={() =>
                                                            fetchTransactionDetails(
                                                                donation?.donationDetails?.doc_transac_id,
                                                                donation
                                                            )
                                                        }
                                                    >
                                                        View Transaction
                                                    </Button>
                                                </Segment>
                                            </Grid.Column>
                                        ))
                                    ) : (
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Segment>No donations available.</Segment>
                                            </Grid.Column>
                                        </Grid.Row>
                                    )}
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>

                    {/* Transaction Modal */}
                    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="small">
                        <Modal.Header>Transaction Details</Modal.Header>
                        <Modal.Content>
                            {transactionDetails ? (
                                <>
                                    <p>
                                        <strong>Transaction Amount:</strong>{" "}
                                        {transactionDetails.amountTransferred || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Destination:</strong> {transactionDetails.destinationAccount || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Attestation Amount:</strong>{" "}
                                        {selectedDonation?.donationDetails?.attestation_fee}
                                    </p>
                                    <p>
                                        Do you want to verify the attestation fee of this donation?
                                    </p>
                                </>
                            ) : (
                                <p>No transaction details available.</p>
                            )}
                        </Modal.Content>
                        <Modal.Actions>
                        <Button
                                positive
                                disabled={
                                    transactionDetails?.destinationAccount !==
                                    "GADB2FRTTHLDJPMB7CNKPGARSKGAX7X3A2FCMNKBTHPIJ7VSAJ522GM5"
                                }
                                onClick={() =>
                                    handleVerifyTransaction(selectedDonation.donationDetails._id)
                                }
                            >
                                Verify
                            </Button>
                            <Button negative onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>

                    {/* Error Modal */}
                    <Modal open={!!errorModalMessage} onClose={closeErrorModal} size="small">
                        <Modal.Header>Error</Modal.Header>
                        <Modal.Content>
                            <p>{errorModalMessage}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="blue" onClick={closeErrorModal}>
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>

                    {/* Success Message Modal */}
                    <Modal open={!!successMessage} onClose={() => setSuccessMessage("")} size="small">
                        <Modal.Header>Message</Modal.Header>
                        <Modal.Content>
                            <p>{successMessage}</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => setSuccessMessage("")} color="blue">
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default DocVerification;
