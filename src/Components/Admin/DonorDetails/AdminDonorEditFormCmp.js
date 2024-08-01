import classes from "./AdminDonorEditFormCmp.module.css"
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Image } from 'semantic-ui-react';

const AdminDonorEditFormCmp = () => {

    const { Donor_Id } = useParams();
    const navigate = useNavigate();

    // Sample initial state, replace with actual data fetching logic
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        name: '',
        district: '',
        address: '',
        contact: '',
        image: '',
    });

    useEffect(() => {
        // Fetch donor data using Donor_Id and update state
        // Replace the following with actual data fetching
        const fetchData = async () => {
            // Simulating fetching data
            const donorData = {
                userId: Donor_Id,
                userName: 'sample_user',
                name: 'Sample Name',
                district: 'Sample District',
                address: 'Sample Address',
                contact: 'Sample Contact',
                image: 'https://via.placeholder.com/150',
            };
            setFormData(donorData);
        };

        fetchData();
    }, [Donor_Id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit updated data to the server
        console.log('Submitted data:', formData);
        navigate('/admin/Donor_List/Donors'); // Navigate back to the list after saving
    };

    return (
        <div className={classes.mainContainer}>
                <Form onSubmit={handleSubmit} size="big">
                    <Form.Field>
                        <label>User ID</label>
                        <input
                            name="userId"
                            value={formData.userId}
                            readOnly
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>User Name</label>
                        <input
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>District</label>
                        <input
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Contact</label>
                        <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Profile Image</label>
                        <Image src={formData.image} size="small" />
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange} // Adjust this for image file uploads
                        />
                    </Form.Field>
                    <Button type="submit" secondary>Save</Button>
                    <Button type="button" onClick={() => navigate('/admin/Donor_List/Donors')}>Cancel</Button>
                </Form>
        </div>
    );
}
 
export default AdminDonorEditFormCmp;