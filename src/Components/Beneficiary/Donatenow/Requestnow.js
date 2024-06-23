import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './Donate.css';

export default function Requestnow() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'goods',
        address: ''
    });

    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log(formData);
        // Handle form submission logic here
        setOpen(false);
        // Redirect after submission
        navigate('/beneficiary/open-requests');
    };

    return (
        <div className='donate'>
            <Button className='donatebutton' onClick={() => setOpen(true)}>
                Request Now
            </Button>

            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                className="request-modal"
            >
                <Modal.Header>Create a New Request</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input
                            label='Title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label='Description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Form.Select
                            label='Type'
                            name='type'
                            options={[
                                { key: 'g', text: 'Goods', value: 'goods' },
                                { key: 'm', text: 'Monetary', value: 'monetary' }
                            ]}
                            value={formData.type}
                            onChange={handleChange}
                        />
                        <Form.Input
                            label='Address'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color='green' onClick={handleSubmit}>Submit</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}
