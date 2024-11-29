import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import './VerifyRequestsTable.css';
import SearchBar from './Searchbar';

Modal.setAppElement('#root'); // Set the app element for accessibility

const VerifyRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [filterRequests, setFilterRequests] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/get_request'); // Ensure this URL is correct
                setRequests(response.data.requests); // Ensure the correct path to the data
                setFilterRequests(response.data.requests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleStatusChange = (event, requestId) => {
        const newStatus = event.target.value;

        // Update the status in the backend
        axios.put(`http://localhost:9013/crew/update_request_status`, { requestId, status: newStatus }) // Ensure this URL is correct
            .then(response => {
                console.log('Status updated:', response.data);
                // Optionally, update the local state to reflect the change
                setRequests(prevRequests => prevRequests.map(request =>
                    request._id === requestId ? { ...request, status: newStatus } : request
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

        const filteredData = requests.filter((request) => {
            const searchString = `${request.beneficiary_id?.name} 
                ${request.user_id?.username} ${request._id}
                 ${request.beneficiary_id?.email} ${request.beneficiary_id?.phoneNo}
                  ${request.description} ${request.status}`.toLowerCase();
            return searchString.includes(query.toLowerCase());
        });
        console.log('Filtered data:', filteredData);
        setFilterRequests(filteredData);
        setNoResultsFound(filteredData.length === 0);
    };


    const handleVerify = async (requestId, newStatus) => {
        try {
            // Send the single update request to the backend
            await axios.put('http://localhost:9013/crew/update_request_status', {
                requestId,
                status: newStatus,
            });

            // Update the UI by modifying the status of the specific request locally
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === requestId ? { ...request, status: newStatus } : request
                )
            );

            alert('Request updated successfully!');
        } catch (error) {
            console.error('Error updating request:', error);
            alert('Failed to update the request. Please try again.');
        }
    };


    const openModal = (documents) => {
        setSelectedDocument(documents);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedDocument([]);
        setModalIsOpen(false);
    };

    return (
        <div className='crew-verify-requests-container'>
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />

            <table className='ui clelled table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Request Number</th>
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
                    {filterRequests.map(request => (
                        <tr key={request._id}>
                            <td>{request.beneficiary_id?.name || 'N/A'}</td>
                            <td>{request.user_id?.username || 'N/A'}</td>
                            <td>{request._id}</td>
                            <td>{request.beneficiary_id?.email || 'N/A'}</td>
                            <td>{request.beneficiary_id?.phoneNo || 'N/A'}</td>
                            <td>{request.description || 'No Description'}</td>
                            <td>
                                <button href="#" onClick={() => openModal(request.documents)} className='crew-link-button'>View Document</button>
                            </td>
                            <td>
                                <select
                                    value={request.status}
                                    onChange={(e) =>
                                        setRequests((prevRequests) =>
                                            prevRequests.map((r) =>
                                                r._id === request._id
                                                    ? { ...r, status: e.target.value }
                                                    : r
                                            )
                                        )
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Published">Published</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleVerify(request._id, request.status)}
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
                {Array.isArray(selectedDocument) && selectedDocument.length > 0 && selectedDocument.map((doc, index) => (
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

export default VerifyRequestsTable;