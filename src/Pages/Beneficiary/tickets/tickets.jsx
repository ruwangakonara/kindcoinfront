import React, { useState } from 'react';
import { Container, Table, Label, Header, Grid, Button, Modal, Form, Icon } from 'semantic-ui-react';
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2"
import Sidebar from '../../../Components/Donor/Sidebar/Sidebar';
import './tickets.css';

const initialTickets = [
    { id: 1, title: 'Issue with Donation', description: 'There is an issue with the recent donation made.', archived: true },
    { id: 2, title: 'Request for Information', description: 'Need more information about the donation process.', archived: false },
    { id: 3, title: 'Volunteer Inquiry', description: 'Interested in volunteering for upcoming events.', archived: false },
    { id: 4, title: 'Update Account Details', description: 'Request to update account details.', archived: true }
];

const DonorTicketsPage = () => {
    const [tickets, setTickets] = useState(initialTickets);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        setEditedTitle(ticket.title);
        setEditedDescription(ticket.description);
        setOpenEditModal(true);
    };

    const handleSave = () => {
        const updatedTickets = tickets.map(ticket =>
            ticket.id === selectedTicket.id
                ? { ...ticket, title: editedTitle, description: editedDescription }
                : ticket
        );
        setTickets(updatedTickets);
        setOpenEditModal(false);
    };

    const handleDelete = (ticketId) => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
        setTickets(updatedTickets);
    };

    const renderActions = (ticket) => {
        if (!ticket.archived) {
            return (
                <Button.Group>
                    <Button onClick={() => handleEdit(ticket)}>Edit</Button>
                    <Button onClick={() => handleDelete(ticket.id)} color='red'>Delete</Button>
                </Button.Group>
            );
        } else {
            return null; // No actions rendered if archived
        }
    };

    return (
        <div>
            <Navbar2 />
            <Container className="tickets-page-container">
                <Grid>
                    <Grid.Column width={0}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <Header as="h1" style = {{marginTop: "100px"}} className="page-header">Tickets</Header>
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
                                {tickets.map(ticket => (
                                    <Table.Row key={ticket.id} className="ticket-row">
                                        <Table.Cell>{ticket.title}</Table.Cell>
                                        <Table.Cell>{ticket.description}</Table.Cell>
                                        <Table.Cell>
                                            <Label color={ticket.archived ? 'red' : 'orange'}>
                                                {ticket.archived ? 'Archived' : 'Active'}
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
                                <input
                                    placeholder='Title'
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
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
        </div>
    );
};

export default DonorTicketsPage;
