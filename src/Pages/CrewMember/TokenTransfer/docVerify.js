//Attestation Fee Verification Page for Crew Members

import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Table } from "semantic-ui-react";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import axios from "axios";
import "./tokenTransfer2.css";
import SearchBar from "../../../Components/CrewMember/VerifyRequests/Searchbar";

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
    const [filterDonations, setFilterDonations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

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
            setFilterDonations(response.data.donations);
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

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredData = donations.filter((donation) => {
            const searchString = `
                ${donation?.donationDetails?._id || ''} 
                ${donation?.donationDetails?.title || ''} 
                ${donation?.donationDetails?.value || ''} 
                ${donation?.requestDetails?.title || ''} 
                ${donation?.donorDetails?.name || ''}
                ${donation?.beneficiaryDetails?.name || ''} 
                ${donation?.donationDetails?.token_amount || ''}
                ${donation?.donationDetails?.attestation_fee || ''}
                ${donation?.donationDetails?.doc_transac_id || ''}
            `.toLowerCase();

            return searchString.includes(query.toLowerCase());
        });

        setFilterDonations(filteredData);
        setNoResultsFound(filteredData.length === 0);
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
            <div className="crew-token-requests-container">
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearch}
            />
            <Container style={{ padding: "20px",  position: "relative" }}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Donation ID</Table.HeaderCell>
                            <Table.HeaderCell>Donation Title</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                            <Table.HeaderCell>Request</Table.HeaderCell>
                            <Table.HeaderCell>Donor</Table.HeaderCell>
                            <Table.HeaderCell>Beneficiary</Table.HeaderCell>
                            <Table.HeaderCell>Reward (KindCoin)</Table.HeaderCell>
                            <Table.HeaderCell>Attestation Fee (KindCoin)</Table.HeaderCell>
                            <Table.HeaderCell>Attestation Fee Transac ID</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {filterDonations?.length > 0 ? (
                            filterDonations.map((donation) => (
                                <Table.Row key={donation?.donationDetails?._id}>
                                    <Table.Cell>{donation?.donationDetails?._id}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.title}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.value}</Table.Cell>
                                    <Table.Cell>{donation?.requestDetails?.title}</Table.Cell>
                                    <Table.Cell>{donation?.donorDetails?.name}</Table.Cell>
                                    <Table.Cell>{donation?.beneficiaryDetails?.name}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.token_amount}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.attestation_fee}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.doc_transac_id}</Table.Cell>
                                    <Table.Cell>
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
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan="10" textAlign="center">
                                    No donations available.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
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
        </div>
    );
};

export default DocVerification;
