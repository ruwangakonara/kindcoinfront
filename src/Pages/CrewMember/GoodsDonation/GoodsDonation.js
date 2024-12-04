// GoodsDonation.js
import React, { useState, useEffect, useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import HeaderCrew from '../../../Components/CrewMember/Header/HeaderCrew';
import Sidebar from '../../../Components/CrewMember/Sidebar/Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './GoodsDonation.css';
import Swal from 'sweetalert2';
import SearchBar from './Searchbar';
import Filter from './Filter';
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import { useAuthCheck } from '../../../hooks/useAuthHook';

const GoodsMemberDonations = () => {
    // useAuthCheck();

    const { user, userDetails } = useContext(UserContext);
    const member = userDetails;
    console.log(member);

    const [donations, setDonations] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [filterRequests, setFilterRequests] = useState([]);
    const [selectedGoods, setSelectedGoods] = useState([]); // Initialize as an empty array
    const [goodsModalIsOpen, setGoodsModalIsOpen] = useState(false);
    const [selectedDonationValue, setSelectedDonationValue] = useState(0);
    const [currentDonationId, setCurrentDonationId] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/goods_donations', {
                    withCredentials: true
                });

                // Validate response data
                if (response.data && response.data.donations) {
                    setDonations(response.data.donations);
                    setFilterRequests(response.data.donations);
                    // setSelectedGoods(response.data.donations[0]?.donationDetails?.goods || []);
                    console.log(response.data.donations);
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

    const handleGoodsSubmit = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to submit the goods values?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        });

        if (result.isConfirmed) {
            try {
                // const response = await axios.put('http://localhost:9013/crew/verify_goods_donation', {
                //     donationId: selectedGoods[0].donationId,
                //     goods: selectedGoods.map(good => ({
                //         donation_id:
                //         value: selectedDonationValue
                //     }))
                // });

                const response = await axios.put('http://localhost:9013/crew/verify_goods_donation', {
                    donation_id: currentDonationId,  // Make sure the correct donationId is sent
                    value: selectedDonationValue   // Send the updated value to the backend
                });
        

                const updatedRequests = donations.map(request =>
                    request.donationDetails._id === selectedGoods[0].donationId
                        ? { ...request, status: 'Published' }
                        : request
                );

                setDonations(updatedRequests);
                setFilterRequests(updatedRequests);

                toast.success('Goods values updated and status changed to Published');
                setGoodsModalIsOpen(false);
            } catch (error) {
                console.error('Error updating goods values:', error);
                toast.error('Failed to update goods values. Please try again.');
            }
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        const filteredData = donations.filter((request) => {
            const searchString = `
                ${request.beneficiaryDetails?._id || ''} 
                ${request.donorDetails?.username || ''} 
                ${request.donationDetails._id || ''} 
                ${request.beneficiary_id?.email || ''} 
                ${request.beneficiaryDetails?.phoneNo || ''} 
                ${request.beneficiaryDetails?.email || ''} 
                ${request.donationDetails.description || ''} 
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

    // Goods modal handlers
    const openGoodsModal = (goods, donationId) => {
        const goodsWithDonationId = goods.map(good => ({ ...good, donationId }));
        setSelectedGoods(goodsWithDonationId);
        setCurrentDonationId(donationId);
        setSelectedDonationValue(0); // Reset value
        setGoodsModalIsOpen(true);
    };

    const closeGoodsModal = () => {
        setSelectedGoods([]);
        setGoodsModalIsOpen(false);
    };

    const handleGoodsValueChange = (index, value) => {
        const updatedGoods = [...selectedGoods];
        updatedGoods[index].amount = value;
        setSelectedGoods(updatedGoods);
    };

    const handleVerifyDonation = async () => {
        const result = await Swal.fire({
            title: 'Verify Donation',
            text: 'Do you want to verify this donation?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, verify!'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.put('http://localhost:9013/crew/verify_goods_donation', {
                    donation_id: currentDonationId,
                    value: selectedDonationValue
                });

                // Update the local state to reflect the verification
                const updatedRequests = donations.map(request =>
                    request.donationDetails._id === currentDonationId
                        ? { 
                            ...request, 
                            donationDetails: { 
                                ...request.donationDetails, 
                                verified: true,
                                value: selectedDonationValue
                            }
                        }
                        : request
                );

                setDonations(updatedRequests);
                setFilterRequests(updatedRequests);

                toast.success('Donation verified successfully');
                setGoodsModalIsOpen(false);
            } catch (error) {
                console.error('Error verifying donation:', error);
                toast.error('Failed to verify donation. Please try again.');
            }
        }
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
                                    <th>Goods</th>
                                    <th>Documents</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            {noResultsFound && (
                                <tbody>
                                    <tr>
                                        <td colSpan="9" className="crew-no-results-message">
                                            No matching records available.
                                        </td>
                                    </tr>
                                </tbody>
                            )}

                            <tbody>
                                {filterRequests.map(request => (
                                    <tr key={request.donationDetails._id}>  {/* Use donationDetails._id for the key */}
                                        {/* Access beneficiary details */}
                                        <td>{request.beneficiaryDetails?._id || 'N/A'}</td>
                                        <td>{request.donorDetails?.username || 'N/A'}</td> {/* Access donor username */}
                                        <td>{request.donationDetails._id}</td> {/* Access donationDetails._id */}
                                        <td>{request.beneficiaryDetails?.email || 'N/A'}</td> {/* Access beneficiary email */}
                                        <td>{request.beneficiaryDetails?.phoneNo || 'N/A'}</td> {/* Access beneficiary phone number */}
                                        <td>{request.donationDetails.description || 'No Description'}</td> {/* Access donation description */}
                                        <td>
                                            <button onClick={() => openGoodsModal(request.donationDetails.goods, request.donationDetails._id)} className="crew-link-button">
                                                View Goods
                                            </button>
                                        </td>
                                        <td>
                                            {request.documents?.length > 0 ? (
                                                <button onClick={() => openModal(request.documents)} className="crew-link-button">
                                                    View Document
                                                </button>
                                            ) : (
                                                'No Documents'
                                            )}
                                        </td>
                                        <td>{request.donationDetails.status}</td>
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

                    <Modal
                        open={goodsModalIsOpen}
                        onClose={closeGoodsModal}
                        size="large"
                        closeIcon
                    >
                        <Modal.Header>Goods Details</Modal.Header>
                        <Modal.Content>
                            <table className='ui celled table'>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedGoods && selectedGoods.map((good, index) => (
                                        <tr key={good._id}>
                                            <td>{good.item}</td>
                                            <td>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    value={good.amount}
                                                    onChange={(e) => handleGoodsValueChange(index, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <td style={{ textAlign: 'right' }}>
    <input
        type="number"
        value={selectedDonationValue}  // This is the single value you want to update
        onChange={(e) => setSelectedDonationValue(e.target.value)}  // Update the value
    />
</td>

                
                                </tbody>
                            </table>
                            
                        </Modal.Content>
                        <Modal.Actions>
                            <button onClick={handleGoodsSubmit} className="ui button primary">
                                Submit
                            </button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default GoodsMemberDonations;