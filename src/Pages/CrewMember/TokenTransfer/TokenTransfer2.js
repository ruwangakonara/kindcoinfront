import React, { useEffect, useState } from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import {Container, Grid, Segment, Button, Modal, Header} from "semantic-ui-react";
import './tokenTransfer2.css';
import axios from "axios";
import Sidebar3 from "../../../Components/Donor/Sidebar/Sidebar3";
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2";
import MyListing from "../../../Components/Donor/Donation/MyListing";
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";

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
            <div style={{flex: '1'}}>

            <HeaderCrew/>

                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>

            <Grid>
                {/* Sidebar */}
                <Grid.Column width={4}>
                </Grid.Column>

                {/* Main Content */}
                <Grid.Column width={12}>
                    <Segment>
                        <h2>Donations</h2>
                        <Grid stackable columns={3}>
                            {donations?.length > 0 ? (
                                donations?.map((donation) => (
                                    <Grid.Column key={donation?.donationDetails?._id}>
                                        <Segment>
                                            <p><strong>Donation ID:</strong> {donation?.donationDetails?._id}</p>
                                            <p><strong>Donation:</strong> {donation?.donationDetails?.title}</p>
                                            <p><strong>Value:</strong> {donation?.donationDetails?.value}</p>
                                            <p><strong>Request:</strong> {donation?.requestDetails?.title}</p>
                                            <p><strong>Donor:</strong> {donation?.donorDetails?.name}</p>
                                            <p><strong>Beneficiary:</strong> {donation?.beneficiaryDetails?.name}</p>
                                            <Button
                                                primary
                                                onClick={() => openConfirmationModal(donation)}
                                            >
                                                Transfer Tokens
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
