import React from 'react';
import { Container, Table, Label, Header, Grid } from 'semantic-ui-react';
import Navbar2 from '../../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../../Components/Donor/Sidebar/Sidebar3';
import './TicketsPage.css';

const tickets = [
    { title: 'Issue with Donation', description: 'There is a problem with my recent donation.', archived: true },
    { title: 'Question about Rewards', description: 'I have a question regarding my reward points.', archived: false },
    { title: 'Update Profile', description: 'I need help updating my profile information.', archived: false },
    { title: 'Donation History', description: 'I cannot see my past donations.', archived: true },
];

const TicketsPage = () => {
    return (
        <div>
            <Navbar2 />
            <Grid>
                <Grid.Column width={3}>
                    <Sidebar3 />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Container className="tickets-container">
                        <Header as="h1" className="page-header">Tickets</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {tickets.map((ticket, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{ticket.title}</Table.Cell>
                                        <Table.Cell>{ticket.description}</Table.Cell>
                                        <Table.Cell>
                                            <Label color={ticket.archived ? 'red' : 'orange'}>
                                                {ticket.archived ? 'Archived' : 'Not Archived'}
                                            </Label>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default TicketsPage;
