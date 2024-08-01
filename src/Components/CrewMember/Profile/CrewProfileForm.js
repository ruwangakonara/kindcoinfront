import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import './CrewProfileForm.css';

const CrewMemberForm = () => {
    const initialData = {
        name: 'Liviru Weerasinghe',
        crewId: '0001',
        email: 'liviruweera@gmail.com',
        telephone: '071- 6918856',
        areaDetails: 'Colombo',
    };

    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setFormData(initialData);
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
        <div className="form-container">
            <div className="image-container">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="profile-image"
                />
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
            </Form>


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
        </div>

    );
};

export default CrewMemberForm;
