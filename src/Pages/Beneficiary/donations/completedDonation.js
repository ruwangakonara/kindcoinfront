import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header, Image, List, Segment, Button, Modal, Form, Icon, Label, TextArea} from 'semantic-ui-react';
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

    const [editModalOpen, setEditModalOpen] = useState(false);

    const [editedDetails, setEditedDetails] = useState({});
    const [selectedFiles, setSelectedFiles] = useState({
        usage_image1: null,
        usage_image2: null,
        usage_image3: null,
        usage_image4:null,
        usage_image5:null

    });

    const handleEditModalOpen = () => {
        setEditModalOpen(true);
        setEditedDetails({
            usage_image1: donation.usage_image1,
            usage_image2: donation.usage_image2,
            usage_image3: donation.usage_image3,
            usage_image4: donation.usage_image4,
            usage_image5: donation.usage_image5,
        })
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };
    const handleEditFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // Perform logic to update donation details (e.g., API call)
        // console.log('Updated Images:', editedImages);
        const data = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            if (selectedFiles[key]) {
                data.append(key, selectedFiles[key]);
            }
        });
        data.append('id', beneficiary._id);
        data.append('donation_id', donation_id);
        try {
            console.log("yo")
            const response =  await axiosInstance.put('/beneficiary/update_usage_images', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // getDonor()

            const mdonation = response.data.donation;

            setDonation(mdonation)
            // donor = mdonor

            setSelectedFiles({
                usage_image1: null,
                usage_image2: null,
                usage_image3: null,
                usage_image4: null,
                usage_image5: null,
            })
            setEditModalOpen(false);

        } catch (error) {
            console.error('Error updating donation:', error);
        }

    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles({ ...selectedFiles, [fieldName]: file });
            setEditedDetails({ ...editedDetails, [fieldName]: previewUrl });
        }
    };

    // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    //
    // const handleEditClick = () => {
    //     setEditDescription(comment.body);
    //     setIsEditModalOpen(true);
    // };
    // const handleDescModalOpen = ()
    // const [text, setText] = useState("");
    const [isDescModalOpen, setIsDescModalOpen] = useState(false);
    const [newUsageDesc, setUsageDesc] = useState("");

    const handleEditDescClick = () => {
        setUsageDesc(donation.usage_description); // Populate modal with current text
        setIsDescModalOpen(true); // Open modal
    };

    const handleDescSubmit = async () => {
        try {
            const response = await axiosInstance.post( '/beneficiary/update_usage_description',{donation_id: donation_id,  description: newUsageDesc });
            if (response.status === 200) {
                get_donation() // Update text on success
                setIsDescModalOpen(false); // Close modal
            } else {
                alert("Failed to update text");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while updating the text.");
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

                        <Segment>

                            <Grid>
                                <Grid.Row>
                                    <Header style = {{marginLeft: "10px", marginTop: "10px"}}>Donation Usage Description</Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header
                                        style={{
                                            marginLeft: "10px",
                                            color: "#333", // Slightly dark grey for better readability
                                            fontSize: "1.2em",
                                            fontWeight: "500",
                                        }}
                                        as="h4"
                                    >
                                        {donation.usage_description}
                                    </Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header
                                        style={{
                                            marginRight: "10px",
                                            fontStyle: "italic",
                                            color: "grey",
                                            textAlign: "right",
                                            width: "100%",
                                        }}
                                        as="h5"
                                    >
                                        updated: {String(donation.edited).slice(0, 10) + " @ " + String(donation.edited).slice(11, 16)}
                                    </Header>
                                </Grid.Row>
                                <Grid.Row>
                                    <Button primary size='tiny' floated='right' style={{marginLeft: "10px"}}
                                            onClick={handleEditDescClick}>Update</Button>
                                </Grid.Row>


                                <Grid>
                                    <Header style = {{marginTop: "10px"}}>Donation Usage Images</Header>
                                </Grid>
                                <Grid.Row>

                                    {/*<div className="images-grid">*/}
                                    {/*    {donor.images.map((image, index) => (*/}
                                    {/*        <Image*/}
                                    {/*            key={index}*/}
                                    {/*            src={image}*/}
                                    {/*            size='small'*/}
                                    {/*            className="thumbnail-image"*/}
                                    {/*            onClick={() => handleImageClick(image)}*/}
                                    {/*        />*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
                                    <Image
                                        key={1}
                                        src={(donation?.usage_image1 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image1}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image1 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image1}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={2}
                                        src={(donation?.usage_image2 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image2}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image2 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image2}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={3}
                                        src={(donation?.usage_image3 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image3}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image3 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image3}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={4}
                                        src={(donation?.usage_image4 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image4}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image4 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image4}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    <Image
                                        key={5}
                                        src={(donation?.usage_image5 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image5}`
                                            : "https://via.placeholder.com/300"}
                                        size='small'
                                        className="thumbnail-image"
                                        onClick={() => handleImageModalOpen((donation?.usage_image5 !== "https://via.placeholder.com/300")
                                            ? `http://localhost:9013/images/donation_use/${donation?.usage_image5}`
                                            : "https://via.placeholder.com/300")}
                                    />
                                    {/*</Grid.Column>*/}
                                </Grid.Row>
                                <Grid.Row>
                                    <Button primary size='tiny' floated='right' style={{marginLeft: "10px"}}
                                            onClick={handleEditModalOpen}>Edit</Button>
                                </Grid.Row>
                                <Grid.Row>
                                    <Header style = {{marginLeft: "10px", marginTop: "10px"}}>Donor Satisfaction with Donation Usage</Header>
                                </Grid.Row>

                                <Grid.Row>
                                    <Label
                                        color={donation.donor_satisfied ? "green" : "red"}
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "1.2em",
                                            fontWeight: "500",
                                            padding: "0.5em 1em", // For better spacing inside the label
                                        }}
                                    >
                                        {donation.donor_satisfied ? "Yes" : "No"}
                                    </Label>
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
            <Modal open={isDescModalOpen} onClose={() => setIsDescModalOpen(false)}>
                <Modal.Header>Edit Donation Usage Description</Modal.Header>
                <Modal.Content>
                    <Form>
                        <TextArea
                            placeholder="Edit your text here..."
                            value={newUsageDesc}
                            onChange={(e) => setUsageDesc(e.target.value)}
                            style={{ minHeight: 100 }}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setIsDescModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button positive onClick={handleDescSubmit}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal size='tiny' open={editModalOpen} onClose={handleEditModalClose}>
                <Modal.Header>Edit Donation Usage Images</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleEditFormSubmit}>
                        {/*<Form.Field>*/}
                        {/*    <label>Upload New Image</label>*/}
                        {/*    <input type="file" accept="image/*" onChange={handleAddImage} />*/}
                        {/*</Form.Field>*/}
                        <Form.Field>
                            <label>Current Images</label>
                            {/*<div className="additional-images">*/}
                            {/*    {editedImages.map((image, index) => (*/}
                            {/*        <div key={index} style={{ display: 'inline-block', position: 'relative' }}>*/}
                            {/*            <Image src={image} size='small' spaced />*/}
                            {/*            <Button*/}
                            {/*                icon='trash'*/}
                            {/*                negative*/}
                            {/*                onClick={() => handleRemoveImage(index)}*/}
                            {/*                style={{ position: 'absolute', top: 0, right: 0 }}*/}
                            {/*                type='button'*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <Grid>
                                <Grid.Column width={4}>
                                    <Image
                                        src={selectedFiles.usage_image1
                                            ? editedDetails.usage_image1
                                            : editedDetails.usage_image1 !== "https://via.placeholder.com/300"
                                                ? `http://localhost:9013/images/donation_use/${editedDetails.usage_image1}`
                                                : "https://via.placeholder.com/300"
                                        }
                                        className="proof-image"
                                    />
                                    <Button
                                        as="label"
                                        htmlFor="image1Upload"
                                        icon="upload"
                                        content="Change Image 1"
                                    />
                                    <input
                                        type="file"
                                        id="image1Upload"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleFileChange(e, 'usage_image1')}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image
                                        src={selectedFiles.usage_image2
                                            ? editedDetails.usage_image2
                                            : editedDetails.usage_image2 !== "https://via.placeholder.com/300"
                                                ? `http://localhost:9013/images/donation_use/${editedDetails.usage_image2}`
                                                : "https://via.placeholder.com/300"
                                        }
                                        className="proof-image"
                                    />
                                    <Button
                                        as="label"
                                        htmlFor="image2Upload"
                                        icon="upload"
                                        content="Change Image 2"
                                    />
                                    <input
                                        type="file"
                                        id="image2Upload"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleFileChange(e, 'usage_image2')}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image
                                        src={selectedFiles.usage_image3
                                            ? editedDetails.usage_image3
                                            : editedDetails.usage_image3 !== "https://via.placeholder.com/300"
                                                ? `http://localhost:9013/images/donation_use/${editedDetails.usage_image3}`
                                                : "https://via.placeholder.com/300"
                                        }
                                        className="proof-image"
                                    />
                                    <Button
                                        as="label"
                                        htmlFor="image3Upload"
                                        icon="upload"
                                        content="Change Image 3"
                                    />
                                    <input
                                        type="file"
                                        id="image3Upload"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleFileChange(e, 'usage_image3')}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image
                                        src={selectedFiles.usage_image4
                                            ? editedDetails.usage_image4
                                            : editedDetails.usage_image4 !== "https://via.placeholder.com/300"
                                                ? `http://localhost:9013/images/donation_use/${editedDetails.usage_image4}`
                                                : "https://via.placeholder.com/300"
                                        }
                                        className="proof-image"
                                    />
                                    <Button
                                        as="label"
                                        htmlFor="image4Upload"
                                        icon="upload"
                                        content="Change Image 4"
                                    />
                                    <input
                                        type="file"
                                        id="image4Upload"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleFileChange(e, 'usage_image4')}
                                    />
                                </Grid.Column>
                                <Grid.Row>
                                    <Grid.Column width={4}>

                                        <Image
                                            src={selectedFiles.usage_image5
                                                ? editedDetails.usage_image5
                                                : editedDetails.usage_image5 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/donation_use/${editedDetails.usage_image5}`
                                                    : "https://via.placeholder.com/300"
                                            }
                                            className="proof-image"
                                        />
                                        <Button
                                            as="label"
                                            htmlFor="image5Upload"
                                            icon="upload"
                                            content="Change Image 5"
                                        />
                                        <input
                                            type="file"
                                            id="image5Upload"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileChange(e, 'usage_image5')}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form.Field>
                        <Button type='submit'>Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default CompletedDonationBene;
