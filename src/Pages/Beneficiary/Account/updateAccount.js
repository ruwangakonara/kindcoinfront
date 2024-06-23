import React, { useState } from 'react';
import { Container, Form, Button, Image, Header, Grid, Icon, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './updateAccount.css';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";

const BeneficiaryUpdateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'John Doe',
        address: '123 Charity Lane, Kindness City, CA',
        description: 'Generous donor helping various causes.',
        email: 'john.doe@example.com',
        raisedAmount: '$2000',
        profilePicture: 'https://via.placeholder.com/150',
        proofImages: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150'
        ],
        certificateImage: 'https://via.placeholder.com/150',
        verified: false // assuming the verification status
    });

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profilePicture: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleProofImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, proofImages: [...formData.proofImages, reader.result] });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleCertificateChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, certificateImage: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveProofImage = (index, e) => {
        e.preventDefault();  // Prevent form submission
        const updatedImages = formData.proofImages.filter((_, i) => i !== index);
        setFormData({ ...formData, proofImages: updatedImages });
    }

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted:', formData);
        navigate('/beneficiary/account');
    }

    return (
        <div>
            <Navbar/>

            <Container className="update-form-container">
                <Header as="h1">Update Account</Header>

                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Profile Picture</label>
                        <Image src={formData.profilePicture} circular size='small' />
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Field>
                    <Form.Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <Form.TextArea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {formData.verified === false && (
                        <Segment>
                            <Header as="h2">Proof Images</Header>
                            <Grid>
                                {formData.proofImages.map((image, index) => (
                                    <Grid.Column width={4} key={index}>
                                        <Image src={image} className="proof-image" />
                                        <Button
                                            icon="trash"
                                            color="red"
                                            onClick={(e) => handleRemoveProofImage(index, e)}
                                        />
                                    </Grid.Column>
                                ))}
                                <Grid.Column width={4}>
                                    <Button
                                        as="label"
                                        htmlFor="proofImageUpload"
                                        icon="upload"
                                        content="Add Image"
                                    />
                                    <input
                                        type="file"
                                        id="proofImageUpload"
                                        accept="image/*"
                                        hidden
                                        onChange={handleProofImageChange}
                                    />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    )}

                    <Segment>
                        <Header as="h2">GS/DS Certificate</Header>
                        <Grid>
                            <Grid.Column width={16}>
                                <Image src={formData.certificateImage} className="certificate-image" />
                                {formData.verified === false && (
                                    <Button
                                        as="label"
                                        htmlFor="certificateUpload"
                                        icon="upload"
                                        content="Change Certificate"
                                    />
                                )}
                                <input
                                    type="file"
                                    id="certificateUpload"
                                    accept="image/*"
                                    hidden
                                    onChange={handleCertificateChange}
                                />
                            </Grid.Column>
                        </Grid>
                    </Segment>

                    <Button primary type="submit">Save</Button>
                </Form>
            </Container>
        </div>
    );
}

export default BeneficiaryUpdateAccount;
