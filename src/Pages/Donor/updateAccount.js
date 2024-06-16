import React, { useState } from 'react';
import {Container, Form, Button, Image, Header} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './updateAccount.css';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";

const UpdateAccount = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: 'John Doe',
        address: '123 Charity Lane, Kindness City, CA',
        description: 'Generous donor helping various causes.',
        email: 'john.doe@example.com',
        commonDonationItems: ['Clothes', 'Books', 'Toys', 'Food'],
        donatedAmount: '$2000',
        tokens: 150,
        profilePicture: 'https://via.placeholder.com/150'
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

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted:', formData);
        history('/donor/account');
    }

    return (
        <div>
            <Navbar2/>

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
                    <Form.Input
                        label="Common Donation Items"
                        name="commonDonationItems"
                        value={formData.commonDonationItems.join(', ')}
                        onChange={(e, { value }) => setFormData({ ...formData, commonDonationItems: value.split(', ') })}
                    />
                    <Button primary type="submit">Save</Button>
                </Form>
            </Container>
        </div>

    );
}

export default UpdateAccount;
