import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow, Button, Menu, MenuItem, Icon } from 'semantic-ui-react';
import './VerifyRecipientsTable.css';

const VerifyRecipientsTable = () => {
    const [recipients, setRecipients] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/get_recepient'); // Ensure this URL is correct
                setRecipients(response.data.recipients); // Ensure the correct path to the data
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };

        fetchRecipients();
    }, []);

    const handleStatusChange = (event, recipientId) => {
        const newStatus = event.target.value;

        // Update the status in the backend
        axios.put('http://localhost:9013/crew/update_recepient_status', { recipientId, status: newStatus }) // Ensure this URL is correct
            .then(response => {
                console.log('Status updated:', response.data);
                // Optionally, update the local state to reflect the change
                setRecipients(prevRecipients => prevRecipients.map(recipient => 
                    recipient._id === recipientId ? { ...recipient, status: newStatus } : recipient
                ));
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    const openModal = (document) => {
      setSelectedDocument(document);
      setModalIsOpen(true);
  };

  const closeModal = () => {
      setSelectedDocument(null);
      setModalIsOpen(false);
  };

    return (
        <div className='verify-recipients-container'>
            <form onSubmit={handleSubmit}>
                <Table className='verify-recipients-table'>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Username</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Phone Number</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recipients.map(recipient => (
                            <TableRow key={recipient._id}>
                                <TableCell>{recipient.name}</TableCell>
                                <TableCell>{recipient.username}</TableCell>
                                <TableCell>{recipient.email}</TableCell>
                                <TableCell>{recipient.phoneNo}</TableCell>
                                <TableCell>
                                    <select value={recipient.status} onChange={(e) => handleStatusChange(e, recipient._id)}>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => openModal(recipient)}>View</Button>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Document Viewer">
                <button onClick={closeModal}>Close</button>
                {selectedDocument && selectedDocument.endsWith('.pdf') ? (
                    <Document file={selectedDocument}>
                        <Page pageNumber={1} />
                    </Document>
                ) : (
                    <img src={selectedDocument} alt="Document" style={{ width: '100%' }} />
                )}
            </Modal>
        </div>
    );
};

export default VerifyRecipientsTable;