import React, { useContext, useState } from 'react';
import { Container, Form, Button, Image, Header, Grid, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import './updateAccount.css';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const BeneficiaryUpdateAccount = () => {
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const navigate = useNavigate();

    const initialFormData = {
        name: beneficiary.name || '',
        address: beneficiary.address || '',
        description: beneficiary.description || '',
        username: beneficiary.username || '',
        profile_image: beneficiary.profile_image || '',
        district: beneficiary.district || '',
        phoneNo: beneficiary.phoneNo || '',
        raisedAmount: beneficiary.raisedAmount || '',
        certificate_image: beneficiary.certificate_image || '',
        image1: beneficiary.image1 || '',
        image2: beneficiary.image2 || '',
        image3: beneficiary.image3 || '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFiles, setSelectedFiles] = useState({
        profile_image: null,
        image1: null,
        image2: null,
        image3: null,
        certificate_image: null,
    });

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles({ ...selectedFiles, [fieldName]: file });
            setFormData({ ...formData, [fieldName]: previewUrl });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            if (selectedFiles[key]) {
                data.append(key, selectedFiles[key]);
            }
        });

        Object.keys(formData).forEach((key) => {
            if (!['profile_image', 'image1', 'image2', 'image3', 'certificate_image'].includes(key)) {
                data.append(key, formData[key]);
            }
        });

        data.append('user_id', user._id);
        data.append('beneficiary_id', beneficiary._id);

        try {
            await axiosInstance.put('/beneficiary/update_account', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/beneficiary/account');
        } catch (error) {
            console.error('Error updating beneficiary:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="update-form-container">
                <Header as="h1">Update Account</Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Profile Picture</label>
                        {formData.profile_image && (
                            <Image
                                src={selectedFiles.profile_image
                                    ? formData.profile_image
                                    : beneficiary.profile_image !== "https://via.placeholder.com/150"
                                        ? `http://localhost:9013/images/profileimages/beneficiary/${beneficiary.profile_image}`
                                        : "https://via.placeholder.com/150"
                                }
                                circular
                                size="small"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'profile_image')}
                        />
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
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Phone"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                    />

                    {!beneficiary.verified && (
                        <>
                            <Segment>
                                <Header as="h2">Proof Images</Header>
                                <Grid>
                                    <Grid.Column width={4}>
                                        <Image
                                            src={selectedFiles.image1
                                                ? formData.image1
                                                : beneficiary.image1 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary.image1}`
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
                                                ? formData.image2
                                                : beneficiary.image2 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary.image2}`
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
                                                ? formData.image3
                                                : beneficiary.image3 !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/beneficiary_proof/${beneficiary.image3}`
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
                                </Grid>
                            </Segment>

                            <Segment>
                                <Header as="h2">GS/DS Certificate</Header>
                                <Grid>
                                    <Grid.Column width={16}>
                                        <Image
                                            src={selectedFiles.certificate_image
                                                ? formData.certificate_image
                                                : beneficiary.certificate_image !== "https://via.placeholder.com/300"
                                                    ? `http://localhost:9013/images/beneficiary_certificate/${beneficiary.certificate_image}`
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
                            </Segment>
                        </>
                    )}

                    <Button primary type="submit">Save</Button>
                </Form>
            </Container>
        </div>
    );
};

export default BeneficiaryUpdateAccount;
