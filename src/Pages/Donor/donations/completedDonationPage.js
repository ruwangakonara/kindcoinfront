import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar2 from '../../../Components/Donor/Sidebar/Sidebar2';
import './myListingPage.css';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

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

function CompletedDonationPage(){
    const { donation_id } = useParams();
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [attestationModalOpen, setAttestationModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedImages, setEditedImages] = useState(dummyDonation.images);
    const [docTransacId, setDocTransacId] = useState("");
    const [editingDocTransacId, setEditingDocTransacId] = useState(false);

    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [beneficiary, setBeneficiary] = useState({});
    const [member, setMember] = useState({});


    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_donation', { rewarded: true, _id: donation_id });
            setDonation(response.data.donation);
            setBeneficiary(response.data.beneficiary);
            setRequest(response.data.request);
            if(response.data.member){
                setMember(response.data.member);
            }
            console.log(donation)
        } catch (error) {
            console.log(error);
        }
    };

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
        if(donation.doc_transac_id !== "Not Entered Yet"){
            setDocTransacId(donation.doc_transac_id);

        }
        setEditingDocTransacId(true);
    };

    const handleDocTransacIdChange = (e) => {
        setDocTransacId(e.target.value);
    };

    const handleSaveDocTransacId = async (e) => {
        // Save the updated doc_transac_id
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)

        const data = {
            doc_transac_id: docTransacId,
            donation_id: donation._id,
        }

        console.log(data)
        const response = await axiosInstance.put('/donor/update_doc_transac_id', data);
        if (response.status === 201) {

            console.log("something")
            setDonation(response.data.donation);
            console.log(data);
            setEditingDocTransacId(false);

        }

        // dummyDonation.doc_transac_id = docTransacId
        // Implement save logic here (e.g., API call)


    };

    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar2 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style={{ marginTop: "50px" }} className="page-header">Completed Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: {donor.name}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(beneficiary?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + beneficiary?.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: <a href={`http://localhost:3000/donor/beneficiaries/${beneficiary?._id}`}>{beneficiary?.name}</a></Header>
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
                                                {donation.title}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {request.open ?
                                                    <a href={`http://localhost:3000/donor/open-requests/${request?._id}`}>{request?.title}</a>
                                                    :
                                                    <a href={`http://localhost:3000/donor/closed-requests/${request?._id}`}>{request?.title}</a>
                                                }
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {request?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Recipient Phone</List.Header>
                                                {request?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {donation?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {donation.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {donation.type === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {donation.goods.map((goods, index) => (
                                                            <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                                        ))}
                                                    </List>
                                                </List.Item>
                                            )}
                                            {donation.type === 'monetary' && (
                                                <List.Item>
                                                    <List.Header>Amount</List.Header>
                                                    {donation.value}
                                                </List.Item>
                                            )}
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                                {/*<Grid.Row>*/}
                                {/*    <Grid.Column width={16}>*/}
                                {/*        <Header as="h3">Additional Images</Header>*/}
                                {/*        <div className="additional-images">*/}
                                {/*            {dummyDonation.images.map((image, index) => (*/}
                                {/*                <Image*/}
                                {/*                    key={index}*/}
                                {/*                    src={image}*/}
                                {/*                    size='small'*/}
                                {/*                    spaced*/}
                                {/*                    onClick={() => handleImageModalOpen(image)}*/}
                                {/*                    style={{ cursor: 'pointer' }}*/}
                                {/*                />*/}
                                {/*            ))}*/}
                                {/*        </div>*/}
                                {/*    </Grid.Column>*/}
                                {/*</Grid.Row>*/}
                                {donation.type === "monetary" && (
                                    <Grid.Row>

                                        <Grid.Column width={4} key={1}>

                                            <Image
                                                src={(donation?.image1 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image1}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image1 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image1}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={2}>
                                            <Image
                                                src={(donation?.image2 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image2}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image2 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image2}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={3}>
                                            <Image
                                                src={(donation?.image3 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image3}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image3 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image3}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={4} key={4}>
                                            <Image
                                                src={(donation?.image4 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image4}`
                                                    : "https://via.placeholder.com/300"}
                                                className="proof-image"
                                                onClick={() => handleImageModalOpen((donation?.image4 !== "https://via.placeholder.com/300")
                                                    ? `http://localhost:9013/images/donation_proof/${donation?.image4}`
                                                    : "https://via.placeholder.com/300")}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                )}
                            </Grid>
                        </Segment>
                        {(donation.type === "goods") &&

                            <Segment raised>
                                {donation.member_id && (
                                    <Grid>

                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <List className="donation-details">
                                                    <Grid.Column width={8} textAlign="center">
                                                        <Image src={(member.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/member/" + member.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                                    </Grid.Column>
                                                    <List.Item>
                                                        <List.Header>Member Name</List.Header>
                                                        {member?.name}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Member Phone</List.Header>
                                                        {member?.phone}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Member Email</List.Header>
                                                        {member?.email}
                                                    </List.Item>

                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>


                                    </Grid>
                                )}
                                {!donation.member_id && (
                                    <Grid>

                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <List className="donation-details">
                                                    <List.Item>
                                                        <List.Header>Member</List.Header>
                                                        Not Assigned Yet
                                                    </List.Item>

                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>


                                    </Grid>
                                )}
                            </Segment>

                        }
                        {/* New Segment for Document Transaction ID */}
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header as="h3">Document Transaction ID</Header>
                                        <p>{donation.doc_transac_id}</p>

                                        {!donation.doc_verified && (
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
                                        <p>{donation.value}</p>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Tokens</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{donation.token_amount}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as="h3">Attestation Fee</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{donation.doc_token_amount}</p>
                                            <Image src="/token.png" circular className="token-image" />
                                        </Grid.Row>
                                    </Grid.Column>
                                    {donation.doc_verified ? (
                                        <h4 style={{ marginBottom: "10px", marginLeft: "12px" }}>Attestation Fee <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Verified</Label>. Attestation Available</h4>
                                    ) : (
                                        <h4 style={{ marginBottom: "10px",marginLeft: "12px"  }}>Attestation Fee Verification <Label style={{ marginTop: '10px' }} color='orange' className='not-accepted-label'>Pending</Label>. Attestation Unavailable</h4>
                                    )}
                                </Grid.Row>
                            </Grid>
                        </Segment>

                        {donation.doc_verified && (
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
                            {donation.name}
                        </List.Item>
                        <List.Item>
                            <List.Header>Recipient Name</List.Header>
                            {beneficiary.name}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Title</List.Header>
                            {donation.title}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Description</List.Header>
                            {donation.description}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Type</List.Header>
                            {donation.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                        </List.Item>
                        {donation.type === 'goods' && (
                            <List.Item>
                                <List.Header>Goods List</List.Header>
                                <List>
                                    {donation.goods.map((goods, index) => (
                                        <List.Item key={index}>{goods.item}: {goods.amount}</List.Item>
                                    ))}
                                </List>
                            </List.Item>
                        )}
                        {/*{donation.type === 'monetary' && (*/}
                        {/*    <List.Item>*/}
                        {/*        <List.Header>Amount</List.Header>*/}
                        {/*        {donation.value}*/}
                        {/*    </List.Item>*/}
                        {/*)}*/}
                        <List.Item>
                            <List.Header>Recipient Phone</List.Header>
                            {request.phone}
                        </List.Item>
                        <List.Item>
                            <List.Header>Donation Phone</List.Header>
                            {donation.phone}
                        </List.Item>
                        <List.Item>
                            <List.Header>Amount</List.Header>
                            {donation.value}
                        </List.Item>
                        <List.Item>
                            <List.Header>Tokens</List.Header>
                            {donation.token_amount}
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
