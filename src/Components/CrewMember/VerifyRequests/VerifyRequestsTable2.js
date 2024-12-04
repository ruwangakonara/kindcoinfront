import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import {Modal} from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import './VerifyRequestsTable.css';
import SearchBar from './Searchbar';
import Filter from './Filter';
import { useAuthCheck } from '../../../hooks/useAuthHook';



// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:9013',
//     withCredentials: true
// });


const VerifyRequestsTable = () => {
    // useAuthCheck();
    console.log('Component rendering');
    // State management
    const [requests, setRequests] = useState([]);
    const [filterRequests, setFilterRequests] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);


    const fetchRequests = async () => {
        try {
            console.log('Starting to fetch requests...');

            const token = document.cookie.includes('Authorization');
            console.log('Auth token exists:', token);

            const response = await axios.get('http://localhost:9013/crew/get_request');
            console.log('Request data:', response.data);

            // Validate response data
            if (response.data && response.data.requests) {
                setRequests(response.data.requests);
                setFilterRequests(response.data.requests);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status
            });
            toast.error('Failed to fetch requests. Please try again later.');
        }
    };
    // Fetch requests on component mount
    useEffect(() => {
        console.log('Useeffect Fetching requests Triggered');


        // const token = document.cookie.includes('Authorization');
        // if (token) {
        //     fetchRequests();
        // }
        fetchRequests();
    }, []);

    const handleStatusChange = async (requestId, newStatus) => {
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
                const validStatuses = ['Pending', 'Published', 'Rejected'];
                if (!validStatuses.includes(newStatus)) {
                    throw new Error('Invalid status');
                }

                const response = await axios.put('http://localhost:9013/crew/update_request_status', {
                    requestId,
                    status: newStatus
                });

                const updatedRequests = requests.map(request =>
                    request._id === requestId
                        ? { ...request, status: newStatus }
                        : request
                );

                setRequests(updatedRequests);
                setFilterRequests(updatedRequests);

                toast.success('Status updated successfully');
                fetchRequests()
            } catch (error) {
                console.error('Error updating status:', error);

                toast.error('Failed to update status. Please try again.');
            }
        }
    };

    // Search functionality
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredData = requests.filter((request) => {
            const searchString = `
                ${request.beneficiary_id?.name || ''} 
                ${request.user_id?.username || ''} 
                ${request._id || ''} 
                ${request.beneficiary_id?.email || ''} 
                ${request.beneficiary_id?.phoneNo || ''}
                ${request.description || ''} 
                ${request.status || ''}
            `.toLowerCase();

            return searchString.includes(query.toLowerCase());
        });

        setFilterRequests(filteredData);
        setNoResultsFound(filteredData.length === 0);
    };

    const handleFilterChange = (selectedStatuses) => {
        if (selectedStatuses.length === 0) {
            setFilterRequests([]); // Show no records if nothing is selected
        } else {
            const filtered = requests.filter(request => {
                // Map the request status to match the checkbox options
                let currentStatus;
                if (request.status === 'Published') {
                    currentStatus = 'Published';
                } else if (request.status === 'Rejected') {
                    currentStatus = 'Rejected';
                } else {
                    currentStatus = 'Pending';
                }
                // Return true if current status is in selected statuses array
                return selectedStatuses.includes(currentStatus);
            });
            setFilterRequests(filtered);
            // setNoResultsFound(filtered.length === 0);
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

    // Document modal handlers

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    return (
        <div className='crew-verify-request-container'>
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
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearch}
                />
            </div>

            <table className='ui celled table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Request Number</th>
                        <th>Email</th>
                        <th>Telephone Number</th>
                        <th>Description</th>
                        <th style = {{width: "auto", whiteSpace: "nowrap" }}>Images</th>
                        <th>Certificate</th>
                        <th>Status</th>
                    </tr>
                </thead>

                {noResultsFound && (
                    <tbody>
                        <tr>
                            <td colSpan="8" className="crew-no-results-message">
                                No matching records available.
                            </td>
                        </tr>
                    </tbody>
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
                            <td style={{width: "auto", whiteSpace: "nowrap"}}>
                                <img
                                    // key={imgKey}
                                    src={request.documents[0]}
                                    alt="one"
                                    style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                                    onClick={() => openModal(request.documents[0])}
                                />
                                <img
                                    // key={imgKey}
                                    src={request.documents[1]}
                                    alt="one"
                                    style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                                    onClick={() => openModal(request.documents[1])}
                                />
                                <img
                                    // key={imgKey}
                                    src={request.documents[2]}
                                    alt="one"
                                    style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                                    onClick={() => openModal(request.documents[2])}
                                />
                            </td>
                            <td>
                                <img
                                    // key={imgKey}
                                    src={request.documents[3]}
                                    alt="one"
                                    style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                                    onClick={() => openModal(request.documents[3])}
                                />
                            </td>
                            <td>
                                <select
                                    value={request.status}
                                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Published">Published</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal open={modalOpen} onClose={closeModal} size="large" closeIcon>
                <Modal.Header>Image Preview</Modal.Header>
                <Modal.Content>
                    {selectedImage && (
                        <img src={selectedImage} alt="Preview" style={{width: '100%'}}/>
                    )}
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default VerifyRequestsTable;