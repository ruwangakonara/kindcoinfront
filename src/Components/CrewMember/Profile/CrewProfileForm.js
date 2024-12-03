import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { useEffect, axios } from 'react';
import { Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './CrewProfileForm.css';

const CrewMemberForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        crewId: '',
        username: '',
        phone: '',
        areaDetails: '',
        noOfOperations: 0,
        profile_image: 'https://via.placeholder.com/150'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/profile', {
                    withCredentials: true
                });
                console.log('Fetched profile data:', response.data);
                
                // Update all fields from response
                setFormData({
                    name: response.data.member.name || '',
                    crewId: response.data.member.crewId || '',
                    email: response.data.member.email || '',
                    telephone: response.data.member.telephone || '',
                    areaDetails: response.data.member.areaDetails || '',
                    profile_image: response.data.member.profile_image,
                    noOfOperations: response.data.member.noOfOperations || 0
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfileData();
    }, []);



    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handlePasswordSubmit = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await axios.put('http://localhost:9013/crew/update-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                withCredentials: true
            });

            setShowPasswordModal(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert('Password updated successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating password');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await axios.post('http://localhost:9013/crew/update-image',
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            // Update to use full URL path
            setFormData(prev => ({ 
                ...prev, 
                profile_image: `http://localhost:9013/images/crew/${response.data.image}`
            }));
        } catch (error) {
            alert('Error uploading image');
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setFormData(formData);
    };

    const handleSave = () => {
        setShowModal(true);
    };


    const confirmSave = () => {
        setIsEditing(false);
        setShowModal(false);
        alert('Changes saved successfully!');
    };

    const cancelSave = () => {
        setShowModal(false);
    };

    return (
        <div className="crew-form-container">
            <div className="crew-image-container">
                <Image
                    src={formData.profile_image}
                    alt="Profile"
                    className="crew-profile-image"
                />
                {isEditing && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ marginTop: '10px' }}
                    />
                )}
            </div>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Crew ID</label>
                    <Input
                        name="crewId"
                        value={formData.crewId}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Telephone</label>
                    <Input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Area Details</label>
                    <Input
                        name="areaDetails"
                        value={formData.areaDetails}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                </Form.Field>
                <div>
                    {!isEditing ? (
                        <Button color="blue" onClick={toggleEditMode}>
                            Edit
                        </Button>
                    ) : (
                        <>
                            <Button color="green" onClick={handleSave}>
                                Save
                            </Button>
                            <Button color="red" onClick={toggleEditMode}>
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
                <div>
                    {!isEditing ? (
                        <>
                            <Button color="blue" onClick={toggleEditMode}>
                                Edit Profile
                            </Button>
                            <Button color="green" onClick={() => setShowPasswordModal(true)}>
                                Change Password
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="green" onClick={handleSave}>
                                Save
                            </Button>
                            <Button color="red" onClick={toggleEditMode}>
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
                <Modal open={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Current Password</label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>New Password</label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm New Password</label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setShowPasswordModal(false)}>
                            Cancel
                        </Button>
                        <Button positive onClick={handlePasswordSubmit}>
                            Update Password
                        </Button>
                    </Modal.Actions>
                </Modal>


                <Modal open={showModal} size="small">
                    <Modal.Header>Confirm Save</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to save the changes?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={cancelSave}>
                            No
                        </Button>
                        <Button positive onClick={confirmSave}>
                            Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Form>
        </div>

    );
};

export default CrewMemberForm;
