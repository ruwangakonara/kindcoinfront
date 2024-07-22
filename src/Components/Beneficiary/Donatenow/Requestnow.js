import React, {useContext, useState} from 'react';
import { Button, Modal, Form, Transition } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './Donate.css';
import { UserContext } from '../../Home/UserConext/UserContext';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

export default function Requestnow() {
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'goods',
        address: '',
        phone: '',
        user_id: user._id,
        beneficiary_id: beneficiary._id
    });

    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const  handleSubmit = async () => {
        try{
            console.log(formData);
            // Handle form submission logic here

            await axiosInstance.post("/beneficiary/post_request", formData)

            setOpen(false);
            // Redirect after submission
            navigate('/beneficiary/open-requests');
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className='donate'>
            <Button
                className='donatebutton'
                style={{ backgroundColor: 'lightcyan', color: 'white', fontSize: '18px' }}
                onClick={() => setOpen(true)}
            >
                Request Now
            </Button>


            <Transition visible={open} animation='scale' duration={500}>
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
                                required={true}
                                label='Title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                required={true}
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
                                required={true}
                                label='Address'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <Form.Input
                                required={true}
                                label='Phone'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' onClick={() => setOpen(false)}>Cancel</Button>
                        <Button color='blue' onClick={handleSubmit}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </Transition>
        </div>
    );
}
