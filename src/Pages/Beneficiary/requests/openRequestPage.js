import React, { useState } from 'react';
import { Container, Header, Grid, List, Segment, Image, Modal, Button, Icon, Form, Dropdown } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import './account.css';

const OpenRequestPage = () => {
    const { request_id } = useParams();
    console.log(request_id);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
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

    const handleFileChange = (e, { name }) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if (name === 'certificateImage') {
                setEditedDetails({ ...editedDetails, certificateImage: reader.result });
            } else {
                const updatedImages = editedDetails.proofImages.map((img, index) =>
                    index === parseInt(name) ? reader.result : img
                );
                setEditedDetails({ ...editedDetails, proofImages: updatedImages });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSaveChanges = () => {
        setRequestDetails({ ...editedDetails });
        setEditOpen(false);
    };

    const handleAddProofImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setEditedDetails({
                ...editedDetails,
                proofImages: [...editedDetails.proofImages, reader.result],
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveProofImage = (index) => {
        const updatedImages = editedDetails.proofImages.filter((_, i) => i !== index);
        setEditedDetails({ ...editedDetails, proofImages: updatedImages });
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
                                <Image src={requestDetails.profilePicture} circular className="profile-picture" />
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <List>
                                    <List.Item>
                                        <List.Header>Name</List.Header>
                                        <a href={`donor/beneficiaries/${requestDetails.beneficiary}`}>{requestDetails.name}</a>
                                    </List.Item>
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
                                        {requestDetails.telephone}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <h4>Type: {requestDetails.type}</h4>
                                {requestDetails.verified ? (
                                    <div>
                                        <Icon name="flag" color="green" size="large" /><h4 style={{ color: "green" }}>Verified</h4>
                                    </div>
                                ) : (
                                    <div>
                                        <Icon name="flag" color="red" size="large" /><h4 style={{ color: "red" }}>Not Verified</h4>
                                        <Button color="blue" onClick={handleEditButtonClick}>Edit</Button>
                                    </div>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">Proof Images</Header>
                    <Grid>
                        {requestDetails.proofImages.map((image, index) => (
                            <Grid.Column width={4} key={index}>
                                <Image
                                    src={image}
                                    className="proof-image"
                                    onClick={() => handleImageClick(image)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Segment>
                <Segment>
                    <Header as="h2">GS/DS Certificate</Header>
                    <Grid>
                        <Grid.Column width={16}>
                            <Image
                                src={requestDetails.certificateImage}
                                className="certificate-image"
                                onClick={() => handleImageClick(requestDetails.certificateImage)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>

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
                        <Form.Input
                            type="file"
                            label="GS/DS Certificate Image"
                            name="certificateImage"
                            onChange={(e) => handleFileChange(e, { name: 'certificateImage' })}
                        />
                        <Header as="h3">Proof Images</Header>
                        <Grid>
                            {editedDetails.proofImages.map((image, index) => (
                                <Grid.Column width={4} key={index}>
                                    <Image src={image} className="proof-image" />
                                    <Button color="red" onClick={() => handleRemoveProofImage(index)}>Remove</Button>
                                    <Form.Input
                                        type="file"
                                        label="Change Image"
                                        name={`${index}`}
                                        onChange={(e) => handleFileChange(e, { name: `${index}` })}
                                    />
                                </Grid.Column>
                            ))}
                            <Grid.Column width={4}>
                                <Button as="label" htmlFor="file" color="green">
                                    Add Image
                                </Button>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={handleAddProofImage}
                                />
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="blue" onClick={handleSaveChanges}>Save Changes</Button>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default OpenRequestPage;
