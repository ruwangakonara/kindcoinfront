import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Label, Header, Grid, Button, Modal, Form } from 'semantic-ui-react';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar"
import Sidebar from '../../../Components/Donor/Sidebar/Sidebar';
import './tickets.css';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function DonorTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [openNewModal, setOpenNewModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        get_tickets();
    }, []);

    const get_tickets = async () => {
        try{
            const response = await axiosInstance.get('/donor/get_tickets');
            setTickets(response.data.tickets);
        } catch (error){
            console.log(error);
        }

    };

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        setEditedTitle(ticket.title);
        setEditedDescription(ticket.description);
        setOpenEditModal(true);
    };

    const handleSave = async () => {
        const updatedTickets = tickets.map(ticket =>
            ticket.id === selectedTicket.id
                ? { ...ticket, title: editedTitle, description: editedDescription }
                : ticket
        );
        // Send update request to server
        try {
            await axiosInstance.put(`/donor/update_ticket`, {
                title: editedTitle,
                description: editedDescription,
                user_id: user._id,
                ticket_id: selectedTicket._id

            });
            get_tickets()
            setOpenEditModal(false);
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    const handleDelete = async (ticketId) => {
        // Send delete request to server
        try {
            await axiosInstance.post('/donor/delete_ticket',{ticket_id: ticketId});
            get_tickets()
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    const handleNewSave = async () => {
        const newTicket = {
            title: newTitle,
            description: newDescription,
            user_id: user._id
        };
        try {
            const response = await axiosInstance.post('/donor/raise_ticket', {
                title: newTitle,
                description: newDescription,
                user_id: user._id,

            });
            get_tickets()
            setOpenNewModal(false);
            setNewTitle('');
            setNewDescription('');
        } catch (error) {
            console.error("Error creating new ticket:", error);
        }
    };

    const renderActions = (ticket) => {
        if (!ticket.archived) {
            return (
                <Button.Group>
                    <Button onClick={() => handleEdit(ticket)}>Edit</Button>
                    <Button onClick={() => handleDelete(ticket._id)} color='red'>Delete</Button>
                </Button.Group>
            );
        } else {
            return null; // No actions rendered if archived
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="tickets-page-container">
                <Grid>
                    <Grid.Column width={0}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <Header as="h2" style={{ marginTop: "90px" }} className="page-header">Tickets</Header>
                        <Button primary onClick={() => setOpenNewModal(true)} style={{ marginBottom: '20px', position: "relative"}}>
                            Raise New Ticket
                        </Button>
                        <Table celled padded className="tickets-table">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {tickets && tickets.map(ticket => (
                                    <Table.Row key={ticket.id} className="ticket-row">
                                        <Table.Cell>{ticket.title}</Table.Cell>
                                        <Table.Cell>{ticket.description}</Table.Cell>
                                        <Table.Cell>
                                            <Label color={ticket.archived ? 'red' : 'orange'}>
                                                {ticket.archived ? 'Archived' : 'Not Archived'}
                                            </Label>
                                        </Table.Cell>
                                        <Table.Cell>{renderActions(ticket)}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </Container>

            {selectedTicket && (
                <Modal
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    size='small'
                    className="edit-modal"
                >
                    <Modal.Header>Edit Ticket</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Title</label>
                                <input readOnly={true}
                                       placeholder='Title'
                                       value={editedTitle}
                                       onChange={(e) => setEditedTitle(e.target.value)}
                                       style={{fontStyle:"italic"}}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <input
                                    placeholder='Description'
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                        <Button color='green' onClick={handleSave}>Save</Button>
                    </Modal.Actions>
                </Modal>
            )}

            <Modal
                open={openNewModal}
                onClose={() => setOpenNewModal(false)}
                size='small'
                className="new-modal"
            >
                <Modal.Header>Raise New Ticket</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                placeholder='Title'
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input
                                placeholder='Description'
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpenNewModal(false)}>Cancel</Button>
                    <Button color='green' onClick={handleNewSave}>Save</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default DonorTicketsPage;
