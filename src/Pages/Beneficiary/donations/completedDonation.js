import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label} from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar3 from '../../../Components/Beneficiary/Sidebar/Sidebar3';
import './myListingPage2.css';
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

};

function CompletedDonationBene(){
    const { donation_id } = useParams();
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Handle opening and closing of edit modal
    const [donation, setDonation] = useState({});
    const [request, setRequest] = useState({});
    const [donor, setDonor] = useState({});
    const [member, setMember] = useState({});

    // Handle opening and closing of image modal
    const handleImageModalOpen = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const handleImageModalClose = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };


    useEffect(() => {
        get_donation();
    }, []);

    const get_donation = async () => {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donation', { verified: true, _id: donation_id });
            setDonation(response.data.donation);
            setDonor(response.data.donor);
            setRequest(response.data.request);
            if(response.data.member){
                setMember(response.data.member);
            }
            console.log(beneficiary)
        } catch (error) {
            console.log(error);
        }
    };

    // Handle form submission for editing donation details

    return (
        <div>
            <Navbar/>
            <Grid>
                <Grid.Column width={1}>
                    <Sidebar3 />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Container className="donation-page-container">
                        <Header as="h2" style = {{marginTop: "50px"}} className="page-header">Completed Donation</Header>
                        <Segment raised>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(donor.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donor.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Donor: <a href={`http://localhost:3000/beneficiary/donors/${donor?._id}`}>{donor?.name}</a></Header>

                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign="center">
                                        <Image src={(beneficiary?.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/beneficiary/" + beneficiary?.profile_image): "https://via.placeholder.com/150"} circular className="profile-picture" />
                                        <Header as="h3" className="image-label">Recipient: {beneficiary.name}</Header>

                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <List className="donation-details">
                                            <List.Item>
                                                <List.Header>Donation Title</List.Header>
                                                {donation?.title}

                                                <div style={{textAlign: "right"}}>
                                                    {!donation?.verified && (
                                                        <Label color='green' className='status-label'>
                                                            <Icon name='warning' /> Verified
                                                        </Label>
                                                    )}

                                                    <Label color='green' className='status-label'>
                                                        <Icon name='check' /> Accepted
                                                    </Label>
                                                </div>


                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Description</List.Header>
                                                {donation?.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Title</List.Header>
                                                {request.open ?
                                                    <a href={`http://localhost:3000/beneficiary/open-requests/${request?._id}`}>{request?.title}</a>
                                                    :
                                                    <a href={`http://localhost:3000/beneficiary/closed-requests/${request?._id}`}>{request?.title}</a>
                                                }
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Request Description</List.Header>
                                                {request.description}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Your(Request) Phone</List.Header>
                                                {request?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Phone</List.Header>
                                                {donation?.phone}
                                            </List.Item>
                                            <List.Item>
                                                <List.Header>Donation Type</List.Header>
                                                {donation?.type === 'monetary' ? 'Monetary Donation' : 'Goods Donation'}
                                            </List.Item>
                                            {donation?.type === 'goods' && (
                                                <List.Item>
                                                    <List.Header>Goods List</List.Header>
                                                    <List>
                                                        {donation?.goods.map((goods, index) => (
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
                                            <List.Item>
                                                <List.Header>Listed at</List.Header>
                                                {String(donation.created).slice(0,10) + " @ " + String(donation.created).slice(11,16)}
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
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
                                    <Grid.Column width={4} key={3}>
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
                        {/*<Segment>*/}
                        {/*    /!*<Header as="h2">Donation Statistics</Header>*!/*/}
                        {/*    <Grid>*/}
                        {/*        <Grid.Column width={8}>*/}
                        {/*            <Header as="h3">Amount</Header>*/}
                        {/*            <p>{donation?.amount}</p>*/}
                        {/*        </Grid.Column>*/}
                        {/*        <Grid.Column width={8}>*/}
                        {/*            <Header as="h3">Tokens</Header>*/}
                        {/*            <p>{donation?.tokens}</p>*/}
                        {/*        </Grid.Column>*/}
                        {/*    </Grid>*/}
                        {/*</Segment>*/}
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header as="h3">Amount LKR</Header>
                                        <p>{donation.value}</p>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header as="h3">KINDCOIN</Header>
                                        <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>
                                            <p>{donation.token_amount} </p>
                                            <Image src="/tag.png"  mini style = {{height: "25px"}} />
                                        </Grid.Row>
                                    </Grid.Column>
                                    {/*<Grid.Column width={4}>*/}
                                    {/*    <Header as="h3">Attestation Fee</Header>*/}
                                    {/*    <Grid.Row style={{ display: 'flex', flexDirection: 'row' }}>*/}
                                    {/*        <p>{donation.attestation_fee}</p>*/}
                                    {/*        <Image src="/token.png" circular className="token-image" />*/}
                                    {/*    </Grid.Row>*/}
                                    {/*</Grid.Column>*/}
                                    {/*{donation.doc_verified ? (*/}
                                    {/*    <h4 style={{ marginBottom: "10px", marginLeft: "12px" }}>Attestation Fee <Label style={{ marginTop: '10px' }} color='green' className='not-accepted-label'>Verified</Label>. Attestation Available</h4>*/}
                                    {/*) : (*/}
                                    {/*    <h4 style={{ marginBottom: "10px",marginLeft: "12px"  }}>Attestation Fee Verification <Label style={{ marginTop: '10px' }} color='orange' className='not-accepted-label'>Pending</Label>. Attestation Unavailable</h4>*/}
                                    {/*)}*/}
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Grid.Column>
            </Grid>

            {/* Image Modal */}
            <Modal size='small' open={imageModalOpen} onClose={handleImageModalClose} className="image-modal">
                <Modal.Content image>
                    <Image src={selectedImage} centered wrapped style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                </Modal.Content>
            </Modal>


        </div>
    );
}

export default CompletedDonationBene;
