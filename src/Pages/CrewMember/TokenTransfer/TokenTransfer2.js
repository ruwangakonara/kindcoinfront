//TokenTransfer page for CrewMember

import React, { useEffect, useState } from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import {Container, Button, Modal, Table} from "semantic-ui-react";
import './tokenTransfer2.css';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const TokenTransfer = () => {
    const [donations, setDonations] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        getDonations();
    }, []);

    const getDonations = async () => {
        try {
            const response = await axiosInstance.post('/crew/get_donations', { verified: true, rewarded: false });
            setDonations(response.data.donations);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const handleTokenTransfer = async (donationId) => {
        try {
            const response = await axiosInstance.post('/crew/transfer', { donation_id: donationId });
            if (response.status === 200) {
                setModalMessage("Token transfer successful!");
            } else {
                setModalMessage("Token transfer failed. Please try again.");
            }
        } catch (error) {
            setModalMessage("An error occurred during token transfer.");
        } finally {
            setIsModalOpen(false);
            getDonations(); // Refresh the list after transfer
        }
    };

    const openConfirmationModal = (donation) => {
        setSelectedDonation(donation);
        setIsModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsModalOpen(false);
        setSelectedDonation(null);
    };

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar/>
            <div style={{ flex: '1' }}>
            <HeaderCrew />
            {/* <div className="crew-verify-requests-container"> */}
            <Container style={{ padding: '20px', top: "100px", position: 'relative' }}>
                <h2 className="crew-page-header">Donations</h2>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Donation ID</Table.HeaderCell>
                            <Table.HeaderCell>Donation Title</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                            <Table.HeaderCell>Request</Table.HeaderCell>
                            <Table.HeaderCell>Donor</Table.HeaderCell>
                            <Table.HeaderCell>Beneficiary</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {donations?.length > 0 ? (
                            donations.map((donation) => (
                                <Table.Row key={donation?.donationDetails?._id}>
                                    <Table.Cell>{donation?.donationDetails?._id}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.title}</Table.Cell>
                                    <Table.Cell>{donation?.donationDetails?.value}</Table.Cell>
                                    <Table.Cell>{donation?.requestDetails?.title}</Table.Cell>
                                    <Table.Cell>{donation?.donorDetails?.name}</Table.Cell>
                                    <Table.Cell>{donation?.beneficiaryDetails?.name}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            primary
                                            onClick={() => openConfirmationModal(donation)}
                                        >
                                            Transfer Tokens
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan="7" textAlign="center">
                                    No donations available.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>

                {/* Keep existing modals */}

            {/* Confirmation Modal */}
            <Modal
                open={isModalOpen}
                onClose={closeConfirmationModal}
                size="small"
            >
                <Modal.Header>Confirm Token Transfer</Modal.Header>
                <Modal.Content>
                    <p>
                        Are you sure you want to transfer tokens for Donation ID:{" "}
                        {selectedDonation?.donationDetails._id}?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        onClick={() => handleTokenTransfer(selectedDonation.donationDetails._id)}
                    >
                        Confirm
                    </Button>
                    <Button negative onClick={closeConfirmationModal}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* Success Message Modal */}
            <Modal
                open={!!modalMessage}
                onClose={() => setModalMessage("")}
                size="small"
            >
                <Modal.Header>Message</Modal.Header>
                <Modal.Content>
                    <p>{modalMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setModalMessage("")} color="blue">
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>
        </div>
        {/* </div> */}
    </div>
                
    // <div style={{display: 'flex', width: '100%'}}>
    //     <Sidebar3/>
    //     <div style={{flex: '1'}}>
    //         <Navbar2/>
    //         <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
    //             <Header as="h2" style={{position: "fixed"}} className="page-header">Unaccepted Donations</Header>
    //
    //             <Grid>
    //                 {donations && donations.map((donation, index) => (
    //                     <Grid.Column key={index} width={16}>
    //                         <MyListing
    //                             donorImage={(donor.profile_image !== "https://via.placeholder.com/150") ? ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image) : "https://via.placeholder.com/150"}
    //                             recipientImage={(donation?.profile_image !== "https://via.placeholder.com/150") ? ("http://localhost:9013/images/profileimages/beneficiary/" + donation.profile_image) : "https://via.placeholder.com/150"}
    //                             amount={donation.donationDetails?.value}
    //                             type={donation.donationDetails?.type}
    //                             recipientName={donation?.beneficiary_name}
    //                             requestTitle={donation?.request_title}
    //                             donationTitle={donation.donationDetails?.title}
    //                             id={donation?._id}
    //
    //                         />
    //                     </Grid.Column>
    //                 ))}
    //             </Grid>
    //         </Container>
    //     </div>
    //     <Donatenow/>
    // </div>
)
    ;
};

export default TokenTransfer;
