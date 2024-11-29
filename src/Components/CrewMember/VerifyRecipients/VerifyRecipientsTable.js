import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import './VerifyRecipientsTable.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const VerifyRecipientsTable = () => {
    const [recipients, setRecipients] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/get_recepient'); // Ensure this URL is correct
                setRecipients(response.data.benificiaries); // Adjust to the correct response structure
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };

        fetchRecipients();
    }, []);

    const handleStatusChange = (event, recipientId) => {
        const newStatus = event.target.value;

        // Update the status in the backend
        axios.put(`http://localhost:9013/crew/update_recepient_status`, { recipientId, status: newStatus }) // Ensure this URL is correct
            .then(response => {
                console.log('Status updated:', response.data);
                setRecipients(prevRecipients => prevRecipients.map(recipient => 
                    recipient._id === recipientId ? { ...recipient, status: newStatus } : recipient
                ));
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleVerify = async (recipientId, newStatus) => {
        try {
            await axios.put('http://localhost:9013/crew/update_recepient_status', {
                recipientId,
                status: newStatus,
            });

            setRecipients((prevRecipients) =>
                prevRecipients.map((recipient) =>
                    recipient._id === recipientId ? { ...recipient, status: newStatus } : recipient
                )
            );

            alert('Recipient updated successfully!');
        } catch (error) {
            console.error('Error updating recipient:', error);
            alert('Failed to update the recipient. Please try again.');
        }
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
        <div className='crew-verify-recipients-container'>
            <table className='ui celled table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Telephone Number</th>
                        <th>Description</th>
                        <th>Documents</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipients.map(recipient => (
                        <tr key={recipient._id}>
                            <td>{recipient.user_id?.name || 'N/A'}</td>
                            <td>{recipient.user_id?.username || 'N/A'}</td>
                            <td>{recipient.user_id?.email || 'N/A'}</td>
                            <td>{recipient.user_id?.phoneNo || 'N/A'}</td>
                            <td>{recipient.description || 'No Description'}</td>
                            <td>
                                <a href="#" onClick={() => openModal(recipient.documents)}>View Document</a>
                            </td>
                            <td>
                                <select
                                    value={recipient.status}
                                    onChange={(e) =>
                                        setRecipients((prevRecipients) =>
                                            prevRecipients.map((r) =>
                                                r._id === recipient._id
                                                    ? { ...r, status: e.target.value }
                                                    : r
                                            )
                                        )
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleVerify(recipient._id, recipient.status)}
                                >
                                    Verify
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
