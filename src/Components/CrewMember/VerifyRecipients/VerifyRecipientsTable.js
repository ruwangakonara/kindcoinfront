import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import './VerifyRecipientsTable.css';
import SearchBar from './Searchbar';

Modal.setAppElement('#root'); // Set the app element for accessibility

const VerifyRecipientsTable = () => {
    const [recipients, setRecipients] = useState([]);
    const [filterRecipients, setFilterRecipients] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/get_recepient'); // Ensure this URL is correct
                setRecipients(response.data.benificiaries); // Adjust to the correct response structure
                setFilterRecipients(response.data.benificiaries);
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

    const handleSearch = (event) => {
        console.log('Search query:', event.target.value);
        const query = event.target.value;
        setSearchQuery(query);

        const filteredData = recipients.filter((recipient) => {
            const searchString = `${recipient.name} 
                ${recipient.user_id?.username} ${recipient._id}
                 ${recipient.email} ${recipient.phoneNo}
                  ${recipient.description} ${recipient.status}`.toLowerCase();
            return searchString.includes(query.toLowerCase());
        });
        console.log('Filtered data:', filteredData);
        setFilterRecipients(filteredData);
        setNoResultsFound(filteredData.length === 0);
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

    const openModal = (documents) => {
        setSelectedDocument(documents);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedDocument(null);
        setModalIsOpen(false);
    };

    return (
        <div className='crew-verify-recipients-container'>
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
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

                {noResultsFound && (
                    <div className="crew-no-results-message">
                        No matching records available.
                    </div>
                )}

                <tbody>
                    {filterRecipients.map(recipient => (
                        <tr key={recipient._id}>
                            <td>{recipient.name || 'N/A'}</td>
                            <td>{recipient.user_id?.username || 'N/A'}</td>
                            <td>{recipient.email || 'N/A'}</td>
                            <td>{recipient.phoneNo || 'N/A'}</td>
                            <td>{recipient.description || 'No Description'}</td>
                            <td>
                            <button href="#" onClick={() => openModal(recipient.documents)} className='crew-link-button'>View Document</button>
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
                {selectedDocument.length > 0 && selectedDocument.map((doc, index) => (
                    <div key={index}>
                        {doc.endsWith('.pdf') ? (
                            <Document file={doc}>
                                <Page pageNumber={1} />
                            </Document>
                        ) : (
                            <img src={doc} alt={`Document ${index + 1}`} style={{ width: '100%' }} />
                        )}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default VerifyRecipientsTable;
