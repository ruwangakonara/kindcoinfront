import React, { useContext, useState } from 'react';
import { Container, Form, Button, Image, Header, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './updateAccount.css';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import { UserContext } from '../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const UpdateAccount = () => {
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;
    const navigate = useNavigate();

    const initialFormData = {
        name: donor.name,
        anonymous: donor.anonymous,
        address: donor.address || '', // Handle null values gracefully
        description: donor.description || '', // Handle null values gracefully
        username: donor.username,
        usual_donations: donor.usual_donations || [],
        profile_image: donor.profile_image || '',
        stellar_address: donor.stellar_address
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [changed, setChanged] = useState(false);

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFormData({ ...formData, profile_image: URL.createObjectURL(file) });
        setChanged(true)
    };

    const handleAddDonation = () => {
        const updatedDonations = [...formData.usual_donations, ''];
        setFormData({ ...formData, usual_donations: updatedDonations });
    };

    const handleRemoveDonation = (index) => {
        const updatedDonations = [...formData.usual_donations];
        updatedDonations.splice(index, 1);
        setFormData({ ...formData, usual_donations: updatedDonations });
    };

    const handleDonationChange = (index, value) => {
        const updatedDonations = [...formData.usual_donations];
        updatedDonations[index] = value;
        setFormData({ ...formData, usual_donations: updatedDonations });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        if (selectedFile) {
            data.append('profileImage', selectedFile);
        }
        data.append('user_id', user._id);
        data.append('donor_id', donor._id);

        Object.keys(formData).forEach(key => {
            if (key !== 'profile_image') {
                data.append(key, formData[key]);
            }
        });

        try {
            await axiosInstance.put('/donor/update_account', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/donor/account');
        } catch (error) {
            console.error('Error updating the account:', error);
        }
    };

    return (
        <div>
            <Navbar2 />
            <Container className="update-form-container">
                <Header as="h1">Update Account</Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Profile Picture</label>
                        {formData.profile_image && (
                            <Image src={!changed ? ((formData.profile_image !==  "https://via.placeholder.com/150" ) ?  ("http://localhost:9013/images/profileimages/donor/" + formData.profile_image): "https://via.placeholder.com/150") : formData.profile_image} circular size='small' />
                        )}
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
                    <Form.Field>
                        <label>Anonymous</label>
                        <input
                            type="checkbox"
                            name="anonymous"
                            checked={formData.anonymous}
                            onChange={(e) => handleChange(e, { name: 'anonymous', value: e.target.checked })}
                        />
                    </Form.Field>
                    <Form.TextArea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Stellar Address"
                        name="stellar_address"
                        value={formData.stellar_address}
                        onChange={handleChange}
                    />
                    <Button type="button" onClick={handleAddDonation}>
                        Add Donation Item
                    </Button>
                    {formData.usual_donations.map((donation, index) => (
                        <Form.Group key={index}>
                            <Form.Input
                                width={12}
                                placeholder={`Donation Item ${index + 1}`}
                                value={donation}
                                onChange={(e, { value }) => handleDonationChange(index, value)}
                            />
                            <Button
                                type="button"
                                icon
                                color='red'
                                onClick={() => handleRemoveDonation(index)}
                            >
                                <Icon name='trash' />
                            </Button>
                        </Form.Group>
                    ))}
                    <Button primary type="submit">Save</Button>
                </Form>
            </Container>
        </div>
    );
};

export default UpdateAccount;
