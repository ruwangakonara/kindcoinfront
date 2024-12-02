import React, {useState, useEffect, useContext} from 'react';
import { Modal} from 'semantic-ui-react';
import {Document, Page} from 'react-pdf';
import HeaderCrew from '../../../Components/CrewMember/Header/HeaderCrew';
import Sidebar from '../../../Components/CrewMember/Sidebar/Sidebar';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import './GoodsDonation.css';
import Swal from 'sweetalert2';
import SearchBar from './Searchbar';
import Filter from './Filter';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';


const GoodsMemberDonations = () => {

    const { user, userDetails } = useContext(UserContext);
    const member = userDetails;

    const [donations, setDonations] = useState([]);
    
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [filterRequests, setFilterRequests] = useState([]);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.post('http://localhost:9013/crew/goods_donations', {member_id: member._id});

                // Validate response data
                if (response.data && response.data.donations) {
                    setDonations(response.data.donations);
                    setFilterRequests(response.data.donations);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to fetch requests. Please try again later.');
            }
        };

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

                const response = await axios.put('http://localhost:9013/crew/update-donation-status', {
                    requestId,
                    status: newStatus
                });

                const updatedRequests = donations.map(request =>
                    request._id === requestId
                        ? { ...request, status: newStatus }
                        : request
                );

                setDonations(updatedRequests);
                setFilterRequests(updatedRequests);

                toast.success('Status updated successfully');
            } catch (error) {
                console.error('Error updating status:', error);

                toast.error('Failed to update status. Please try again.');
            }
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredData = donations.filter((request) => {
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
            const filtered = donations.filter(request => {
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
    const openModal = (documents) => {
        setSelectedDocument(documents);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedDocument([]);
        setModalIsOpen(false);
    };



    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: '1' }}>
                <HeaderCrew />
                <div className='crew-goods-table'>
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
                <div className="crew-table-container">
                <table className='ui celled table'>
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
                            <td>
                            {request.documents.length > 0 ? (
                                <button onClick={() => openModal(request.documents)} className="crew-link-button">
                                    View Document
                                </button>
                            ) : (
                                'No Documents'
                            )}
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
            </div>

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
        </div>
        </div>
    );
};

export default GoodsMemberDonations;