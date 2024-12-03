import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import {Modal} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import './VerifyRecipientsTable.css';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import SearchBar from './Searchbar';
import Filter from './Filter';


const VerifyRecipientsTable = () => {
    const [recipients, setRecipients] = useState([]);
    const [filterRecipients, setFilterRecipients] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

    const fetchRecipients = async () => {
        try {
            const response = await axios.get('http://localhost:9013/crew/get_recepient'); // Ensure this URL is correct
            setRecipients(response.data.benificiaries); // Adjust to the correct response structure
            setFilterRecipients(response.data.benificiaries);
        } catch (error) {
            console.error('Error fetching recipients:', error);
        }
    };

    useEffect(() => {


        fetchRecipients();
    }, []);

    const handleStatusChange = async (recipientId, newStatus) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change the status to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        });

        if (result.isConfirmed) {
            try {
                const validStatuses = ['Pending', 'Approved', 'Rejected'];
                if (!validStatuses.includes(newStatus)) {
                    throw new Error('Invalid status');
                }

                await axios.put('http://localhost:9013/crew/update_recepient_status', {
                    recipientId,
                    status: newStatus,
                });

                const updatedRecipient = recipients.map(recipient =>
                    recipient._id === recipientId
                        ? { ...recipient, status: newStatus }
                        : recipient
                );

                setRecipients(updatedRecipient);
                setFilterRecipients(updatedRecipient);

                toast.success('Status updated successfully');
                fetchRecipients()
            } catch (error) {
                console.error('Error updating status:', error);

                toast.error('Failed to update status. Please try again.');
            }

        }
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

    const handleFilterChange = (selectedStatuses) => {
        if (selectedStatuses.length === 0) {
            setFilterRecipients([]); // Show no records if nothing is selected
        } else {
            const filtered = recipients.filter(recipient => {
                // Map recipient status to match checkbox options
                let currentStatus;
                if (recipient.status === 'Approved') {
                    currentStatus = 'Approved';
                } else if (recipient.status === 'Rejected') {
                    currentStatus = 'Rejected';
                } else {
                    currentStatus = 'Pending';
                }
                // Return true if current status is in selected statuses array
                return selectedStatuses.includes(currentStatus);
            });
            setFilterRecipients(filtered);
            // setNoResultsFound(filtered.length === 0);
        }
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

    const getFileName = (url) => {
        return url.substring(url.lastIndexOf("/") + 1);
    };

    const renderDocumentPreview = (url) => {
        if (url.endsWith(".pdf")) {
            return (
                <div style={{ maxWidth: "200px", marginBottom: "10px" }}>
                    <Document file={url}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            );
        } else if (url.match(/\.(jpg|jpeg|png)$/)) {
            return (
                <img
                    src={url}
                    alt="Document preview"
                    style={{ maxWidth: "200px", marginBottom: "10px" }}
                />
            );
        } else {
            const fileName = getFileName(url);
            return (
                <a href={url} download>
                    {fileName}
                </a>
            );
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
            {/* Toast Notification Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='crew-filter-search'>
            <Filter onFilterChange={handleFilterChange} />
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
            </div>
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
                    </tr>
                </thead>

                {noResultsFound && (
        <tbody>
            <tr>
                <td colSpan="7" className="crew-no-results-message">
                    No matching records available.
                </td>
            </tr>
        </tbody>
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
                                {recipient.documents.length > 0 ? (
                                    <button onClick={() => openModal(recipient.documents)} className="crew-link-button">
                                        View Document
                                    </button>
                                ) : (
                                    'No Documents'
                                )}
                            </td>
                            <td>
                                <select
                                    value={(recipient.verified) ? "Approved" : "Pending"}
                                    onChange={(e) => handleStatusChange(recipient._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                size="large"
                closeIcon
            >
                <Modal.Header>Document Preview</Modal.Header>
                <Modal.Content>
                    {selectedDocument.map((docUrl, index) => (
                        <div key={index} className='crew-document-preview'>
                            {renderDocumentPreview(docUrl)}
                        </div>
                    ))}
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default VerifyRecipientsTable;
