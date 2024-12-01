import React, {useContext, useEffect, useState} from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Accepted from "../../../Components/Beneficiary/Donation/Accepted";
import CompletedDonation from "../../../Components/Beneficiary/Donation/CompletedDonation";
import Unaccepted from "../../../Components/Beneficiary/Donation/Unaccepted";
import './account.css';
import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow";
import axios from 'axios';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const accepted_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        id:334354,
        accepted: true,
        donorName: "rawdon"
    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        id:35354354,
        accepted: true,
        donorName: "rawdon"

    },
];

const unaccepted_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        accepted: false,
        id:35354354,
        donorName: "rawdon"

    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        accepted: false,
        id:35354354,
        donorName: "rawdon"

    },
];

const completed_donations = [
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '$100',
        type: 'monetary',
        tokens: 15000,
        recipientName: 'Charity Org',
        donorName: "rawdon"

    },
    {
        donorImage: 'https://via.placeholder.com/150',
        recipientImage: 'https://via.placeholder.com/150',
        title:"dfsdfsdf",
        amount: '50kg of rice',
        type: 'goods',
        tokens: 10000,
        recipientName: 'John Doe',
        donorName: "rawdon"


    },
];

function OpenRequestPage(){

    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const { request_id } = useParams();
    const navigate = useNavigate();
    console.log(request_id);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [requestDetails, setRequestDetails] = useState({
        name: 'Charity Org',
        title: "Need Some Food. Can I Get a Meal?",
        description: 'Aint eate in centureies so feed me.',
        email: 'info@charityorg.org',
        telephone: '123-456-7890',
        profilePicture: 'https://via.placeholder.com/150',
        proofImages: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300'
        ],
        certificateImage: 'https://via.placeholder.com/300',
        verified: false,
        beneficiary: "sdfsdf",
        raised: 45969,
        type: "goods",
    });

    const [editedDetails, setEditedDetails] = useState({ ...requestDetails });
    const [selectedFiles, setSelectedFiles] = useState({
        image1: null,
        image2: null,
        image3: null,
        certificate_image: null,
    });

    const [acceptedDonations, setAcceptedDonations] = useState([])
    const [unacceptedDonations, setUnacceptedDonations] = useState([])
    const [completedDonations, setCompletedDonations] = useState([])


    async function fetchRequestDetails() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_my_request', {_id: request_id, open: true});

            if (response.status === 200) {
                const requestDet = response.data.request;
                setRequestDetails(requestDet);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchAcceptedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, accepted: true, verified:false});

            if (response.status === 200) {
                const donations = response.data.donations;
                setAcceptedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchUnacceptedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, accepted: false});

            if (response.status === 200) {
                const donations = response.data.donations;
                setUnacceptedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCompletedDonations() {
        try {
            const response = await axiosInstance.post('/beneficiary/get_donations', {request_id: request_id, verified: true});

            if (response.status === 200) {
                const donations = response.data.donations;
                setCompletedDonations(donations);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchRequestDetails();
        fetchAcceptedDonations()
        fetchUnacceptedDonations()
        fetchCompletedDonations()
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleEditButtonClick = () => {
        setEditedDetails({ ...requestDetails });
        setEditOpen(true);
    };

    const handleInputChange = (e, { name, value }) => {
        setEditedDetails({ ...editedDetails, [name]: value });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles({ ...selectedFiles, [fieldName]: file });
            setEditedDetails({ ...editedDetails, [fieldName]: previewUrl });
        }
    };

    // const handleSaveChanges = () => {
    //     setRequestDetails({ ...editedDetails });
    //     setEditOpen(false);
    // };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            if (selectedFiles[key]) {
                data.append(key, selectedFiles[key]);
            }
        });

        Object.keys(editedDetails).forEach((key) => {
            if (!['image1', 'image2', 'image3', 'certificate_image'].includes(key)) {
                data.append(key, editedDetails[key]);
            }
        });

        data.append('request_id', requestDetails._id);

        try {
            await axiosInstance.put('/beneficiary/update_request', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditOpen(false);
            fetchRequestDetails()
            setSelectedFiles({
                image1: null,
                image2: null,
                image3: null,
                certificate_image: null,
            })
        } catch (error) {
            console.error('Error updating beneficiary:', error);
        }
    };

    // const handleAddProofImage = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setEditedDetails({
    //             ...editedDetails,
    //             proofImages: [...editedDetails.proofImages, reader.result],
    //         });
    //     };
    //     reader.readAsDataURL(file);
    // };
    //
    // const handleRemoveProofImage = (index) => {
    //     const updatedImages = editedDetails.proofImages.filter((_, i) => i !== index);
    //     setEditedDetails({ ...editedDetails, proofImages: updatedImages });
    // };

    const handleCloseRequest = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = async () => {
        setConfirmOpen(false);

        try{
            const response = await axiosInstance.post('/beneficiary/close_request', {request_id: request_id, beneficiary_id: beneficiary._id});

            if (response.status === 200) {
                navigate('/beneficiary/closed-requests');  // replace '/somewhere' with the actual path to redirect
            }
        } catch (error){
            console.error('Error closing request:', error);
        }

    };

    return (
        <div>
            <Navbar />

            <Container style={{ position: "relative", top: "150px" }} className="beneficiary-account-container">
                <Header as="h1">Open Request</Header>
                <Segment>
                    <Header as="h2">Request Information</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Image src={(beneficiary.profile_image !== "https://via.placeholder.com/150"
                                    ? `http://localhost:9013/images/profileimages/beneficiary/${beneficiary.profile_image}`
                                    : "https://via.placeholder.com/150")} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    {/*<List.Item>*/}
                                    {/*    <List.Header>Name</List.Header>*/}
                                    {/*    <a href={`donor/beneficiaries/${requestDetails.beneficiary}`}>{requestDetails.name}</a>*/}
                                    {/*</List.Item>*/}
                                    <List.Item>
                                        <List.Header>Title</List.Header>
                                        {requestDetails.title}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Address</List.Header>
                                        {requestDetails.address}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Description</List.Header>
                                        {requestDetails.description}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Email</List.Header>
                                        {requestDetails.email}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Telephone</List.Header>
                                        {requestDetails.phone}
                                    </List.Item>
                                    <List.Item>
                                        <List.Header>Posted at</List.Header>
                                        {String(requestDetails.created).slice(0,10) + " @ " + String(requestDetails.created).slice(11,16)}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <h4>Type: {requestDetails.type}</h4>
                                {requestDetails.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large"/><h4
                                        style={{color: "green"}}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large"/><h4 style={{color: "red"}}>Not
                                        Verified</h4>
                                        <Button color="blue" onClick={handleEditButtonClick}>Edit</Button>
                                    </div>
                                )}
                                <h2>Raised </h2>

                                    <h2>{requestDetails.raised} LKR</h2>

                                <Button color="red" onClick={handleCloseRequest}>Close</Button>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {/*{requestDetails.proofImages.map((image, index) => (*/}
                        {/*    <Grid.Column width={4} key={index}>*/}
                        {/*        <Image*/}
                        {/*            src={image}*/}
                        {/*            className="proof-image"*/}
                        {/*            onClick={() => handleImageClick(image)}*/}
                        {/*            style={{ cursor: 'pointer' }}*/}
                        {/*        />*/}
                        {/*    </Grid.Column>*/}
                        {/*))}*/}
                        <Grid.Column width={4} key={1}>
                            <Image
                                src={(requestDetails?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image1}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image1 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image1}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={2}>
                            <Image
                                src={(requestDetails?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image2}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image2 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image2}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                        <Grid.Column width={4} key={3}>
                            <Image
                                src={(requestDetails?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image3}`
                                    : "https://via.placeholder.com/300"}
                                className="proof-image"
                                onClick={() => handleImageClick((requestDetails?.image3 !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_proof/${requestDetails?.image3}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">GS/DS Certificate</Header>
                    <Grid>
                        <Grid.Column width={16}>
                            <Image
                                src={(requestDetails?.certificate_image !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_certificate/${requestDetails?.certificate_image}`
                                    : "https://via.placeholder.com/300"}
                                className="certificate-image"
                                onClick={() => handleImageClick((requestDetails?.certificate_image !== "https://via.placeholder.com/300")
                                    ? `http://localhost:9013/images/request_certificate/${requestDetails?.certificate_image}`
                                    : "https://via.placeholder.com/300")}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Accepted Donations</Header>

                <Grid>
                    {acceptedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Accepted
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                accepted={donation.donationDetails.accepted}
                                id={donation.donationDetails._id}
                                donorName={donation.name}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Non Accepted Donations</Header>

                <Grid>
                    {unacceptedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <Unaccepted
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                accepted={donation.donationDetails.accepted}
                                id={donation.donationDetails._id}
                                donorName={donation.name}

                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>

            <Container style={{padding: '20px', top: "150px", position: 'relative'}}>
                <Header as="h2">Completed Donations</Header>

                <Grid>
                    {completedDonations.map((donation, index) => (
                        <Grid.Column key={index} width={16}>
                            <CompletedDonation
                                donorImage={(donation.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + donation.profile_image): "https://via.placeholder.com/150"}
                                // recipientImage={donation.recipientImage}
                                amount={donation.donationDetails.value}
                                donationTitle={donation.donationDetails.title}
                                type={donation.donationDetails.type}
                                id={donation.donationDetails._id}
                                donorName={donation.name}

                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
            <Requestnow />


            <Modal open={open} onClose={() => setOpen(false)} size='large'>
                <Modal.Content>
                    <Image src={selectedImage} fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>

            <Modal open={editOpen} onClose={() => setEditOpen(false)} size='large'>
                <Modal.Header>Edit Request Details</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label="Title"
                            name="title"
                            value={editedDetails.title}
                            onChange={handleInputChange}
                        />
                        <Form.TextArea
                            label="Description"
                            name="description"
                            value={editedDetails.description}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Address"
                            name="address"
                            value={editedDetails.address}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Phone"
                            name="phone"
                            value={editedDetails.phone}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            label="Email"
                            name="email"
                            value={editedDetails.email}
                            onChange={handleInputChange}
                        />
                        <Form.Dropdown
                            label="Type"
                            name="type"
                            selection
                            options={[
                                { key: 'goods', text: 'Goods', value: 'goods' },
                                { key: 'monetary', text: 'Monetary', value: 'monetary' }
                            ]}
                            value={editedDetails.type}
                            onChange={handleInputChange}
                        />
                        <Grid>
                            <Grid.Column width={16}>
                                <Image
                                    src={selectedFiles.certificate_image
                                        ? editedDetails.certificate_image
                                        : editedDetails.certificate_image !== "https://via.placeholder.com/300"
                                            ? `http://localhost:9013/images/request_certificate/${editedDetails.certificate_image}`
                                            : "https://via.placeholder.com/300"
                                    }
                                    className="certificate-image"
                                />
                                <Button
                                    as="label"
                                    htmlFor="certificateUpload"
                                    icon="upload"
                                    content="Change Certificate"
                                />
                                <input
                                    type="file"
                                    id="certificateUpload"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => handleFileChange(e, 'certificate_image')}
                                />
                            </Grid.Column>
                        </Grid>
                        <Header as="h3">Proof Images</Header>
                        <Grid>
                            {/*{editedDetails.proofImages.map((image, index) => (*/}
                            {/*    <Grid.Column width={4} key={index}>*/}
                            {/*        <Image src={image} className="proof-image" />*/}
                            {/*        <Button color="red" onClick={() => handleRemoveProofImage(index)}>Remove</Button>*/}
                            {/*        <Form.Input*/}
                            {/*            type="file"*/}
                            {/*            label="Change Image"*/}
                            {/*            name={`${index}`}*/}
                            {/*            onChange={(e) => handleFileChange(e, { name: `${index}` })}*/}
                            {/*        />*/}
                            {/*    </Grid.Column>*/}
                            {/*))}*/}
                            <Grid.Column width={4}>
                                <Image
                                    src={selectedFiles.image1
                                        ? editedDetails.image1
                                        : editedDetails.image1 !== "https://via.placeholder.com/300"
                                            ? `http://localhost:9013/images/request_proof/${editedDetails.image1}`
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
                                    onChange={(e) => handleFileChange(e, 'image1')}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image
                                    src={selectedFiles.image2
                                        ? editedDetails.image2
                                        : editedDetails.image2 !== "https://via.placeholder.com/300"
                                            ? `http://localhost:9013/images/request_proof/${editedDetails.image2}`
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
                                    onChange={(e) => handleFileChange(e, 'image2')}
                                />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image
                                    src={selectedFiles.image3
                                        ? editedDetails.image3
                                        : editedDetails.image3 !== "https://via.placeholder.com/300"
                                            ? `http://localhost:9013/images/request_proof/${editedDetails.image3}`
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
                                    onChange={(e) => handleFileChange(e, 'image3')}
                                />
                            </Grid.Column>
                            {/*<Grid.Column width={4}>*/}
                            {/*    <Button as="label" htmlFor="file" color="green">*/}
                            {/*        Add Image*/}
                            {/*    </Button>*/}
                            {/*    <input*/}
                            {/*        type="file"*/}
                            {/*        id="file"*/}
                            {/*        style={{ display: 'none' }}*/}
                            {/*        onChange={handleAddProofImage}*/}
                            {/*    />*/}
                            {/*</Grid.Column>*/}
                        </Grid>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="blue" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>

            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} size='small'>
                <Modal.Header>Confirm Close Request</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to close this request?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="blue" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button color="red" onClick={handleConfirmClose}>Confirm Close</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default OpenRequestPage;
