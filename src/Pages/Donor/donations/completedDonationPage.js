import React, { useState } from 'react';
import { Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../../Components/Donor/Sidebar/Sidebar3';
import './myListingPage.css';
import { useParams } from 'react-router-dom';

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
    amount: 84654,
    tokens: 5865,
    moneyAmount: '',
    requestTitle: 'Request for Winter Clothes',
    requestDescription: 'We are in need of winter clothes for the upcoming cold season. Your help will be greatly appreciated.',
    recipientPhone: '123-456-7890',
    donationPhone: '987-654-3210',
    verified: false,
    images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
    ],
    doc_transac_id: "44227443424",
    doc_amount: 561,
    doc_verified: false
};

const CompletedDonationPage = () => {
    const { donation_id } = useParams();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [attestationModalOpen, setAttestationModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedImages, setEditedImages] = useState(dummyDonation.images);
    const [docTransacId, setDocTransacId] = useState(dummyDonation.doc_transac_id);
    const [editingDocTransacId, setEditingDocTransacId] = useState(false);

    const handleImageModalOpen = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    const handleAttestationModalOpen = () => {
        setAttestationModalOpen(true);
    };

    const handleAttestationModalClose = () => {
        setAttestationModalOpen(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleUpdateDocTransacId = () => {
        setEditingDocTransacId(true);
    };

    const handleDocTransacIdChange = (e) => {
        setDocTransacId(e.target.value);
    };

    const handleSaveDocTransacId = () => {
        // Save the updated doc_transac_id
        setEditingDocTransacId(false);
        dummyDonation.doc_transac_id = docTransacId
        // Implement save logic here (e.g., API call)
    };

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    {/*<Sidebar3 />*/}
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style={{ marginTop: "50px" }} className="page-header">Completed Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={dummyDonation.donorProfilePic} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {dummyDonation.donorName}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={dummyDonation.recipientProfilePic} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: {dummyDonation.recipientName}</Header>
                                        <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Accepted</Label>
                                        <div style={{ color: 'green' }}>
                                            <Icon name='check circle' color='green' />
                                            Verified
                                        </div>
                                        <Label style={{ marginTop: '15px' }} color='blue' className='not-accepted-label'>Tokens Transacted</Label>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {dummyDonation.donationTitle}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                <a href= "/donor/closed-requests/66a839c8dcf503fee44ea1ce">{dummyDonation.requestTitle}</a>

                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {dummyDonation.requestDescription}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Recipient Phone</List.Header>
                                                {dummyDonation.recipientPhone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {dummyDonation.donationPhone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {dummyDonation.donationType === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {dummyDonation.donationType === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {dummyDonation.goodsList.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {dummyDonation.donationType === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {dummyDonation.amount}
                                                </List.Item>
                                            )}
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h3">Additional Images</Header>
                                        <div className="additional-images">
                                            {dummyDonation.images.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    src={image}
                                                    size='small'
                                                    spaced
                                                    onClick={() => handleImageModalOpen(image)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        {/* New Segment for Document Transaction ID */}
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h3">Document Transaction ID</Header>
                                        <p>{dummyDonation.doc_transac_id}</p>

                                        {!dummyDonation.doc_verified && (
                                            <>
                                                {editingDocTransacId ? (
                                                    <Form>
                                                        <Form.Field>
                                                            <label>Transaction ID</label>
                                                            <input
                                                                value={docTransacId}
                                                                onChange={handleDocTransacIdChange}
                                                            />
                                                        </Form.Field>
                                                        <Button color='blue'
                                                                onClick={handleSaveDocTransacId}>Save</Button>
                                                        <Button color='grey'
                                                                onClick={() => setEditingDocTransacId(false)}>Cancel</Button>
                                                    </Form>
                                                ) : (
                                                    <Button color='blue' onClick={handleUpdateDocTransacId}>Update
                                                        Transaction ID</Button>
                                                )}
                                            </>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header as="h3">Amount</Header>
                                        <p>{dummyDonation.amount}</p>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Tokens</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{dummyDonation.tokens}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Attestation Fee</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{dummyDonation.doc_amount}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    {dummyDonation.doc_verified ? (
                                        <h4 style={{ marginBottom: "10px", marginLeft: "12px" }}>Attestation Fee <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Verified</Label>. Attestation Available</h4>
                                    ) : (
                                        <h4 style={{ marginBottom: "10px",marginLeft: "12px"  }}>Attestation Fee Verification <Label style={{ marginTop: '10px' }} color='orange' className='not-accepted-label'>Pending</Label>. Attestation Unavailable</h4>
                                    )}
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        {dummyDonation.doc_verified && (
                            <Button color='blue' onClick={handleAttestationModalOpen}>Show Attestation</Button>
                        )}
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>

            {/* Attestation Modal */}
            <Modal size='large' open={attestationModalOpen} onClose={handleAttestationModalClose}>
                <Modal.Header>Donation Attestation</Modal.Header>
                <Modal.Content>
                    <div style={{ textAlign: 'right', display: "flex", marginBottom: "70px" }}>
                        <Image src="/charitylogo.png" size="medium" style={{ textAlign: 'right', display: "flex" }} />
                    </div>
                    <p>We hereby attest that the following donation has been received:</p>
                    <List>
                        <List.Item>
                            <List.Header>Donor Name</List.Header>
                            {dummyDonation.donorName}
                        </List.Item>
                        <List.Item>
                            <List.Header>Recipient Name</List.Header>
                            {dummyDonation.recipientName}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Title</List.Header>
                            {dummyDonation.donationTitle}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Description</List.Header>
                            {dummyDonation.donationDescription}
                        </List.Item>
                        {dummyDonation.donationType === 'goods' && (
                            <List.Item>
                                <List.Header>Goods List</List.Header>
                                <List>
                                    {dummyDonation.goodsList.map((goods, index) => (
                                        <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                    ))}
                                </List>
                            </List.Item>
                        )}
                        {dummyDonation.donationType === 'monetary' && (
                            <List.Item>
                                <List.Header>Amount</List.Header>
                                {dummyDonation.moneyAmount}
                            </List.Item>
                        )}
                        <List.Item>
                            <List.Header>Recipient Phone</List.Header>
                            {dummyDonation.recipientPhone}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Phone</List.Header>
                            {dummyDonation.donationPhone}
                        </List.Item>
                        <List.Item>
                            <List.Header>Amount</List.Header>
                            {dummyDonation.amount}
                        </List.Item>
                        <List.Item>
                            <List.Header>Tokens</List.Header>
                            {dummyDonation.tokens}
                        </List.Item>
                    </List>
                    <p>Thank you for your generous contribution.</p>
                    <p>Sincerely,</p>
                    <p style={{ fontStyle: "italic" }}>KindCoin Org</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' onClick={handlePrint}>Print Attestation</Button>
                    <Button color='grey' onClick={handleAttestationModalClose}>Close</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default CompletedDonationPage;
