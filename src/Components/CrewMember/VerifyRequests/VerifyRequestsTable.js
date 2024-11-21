import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Modal from 'react-modal';
import './VerifyRequestsTable.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const VerifyRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9013/crew/get_request'); // Ensure this URL is correct
                setRequests(response.data.requests); // Ensure the correct path to the data
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

  const handleSubmit = async (requestId, newStatus) => {
    try {
        // Send the status update to the backend
        const response = await axios.put('http://localhost:9013/crew/update_request_status', {
            requestId,
            status: newStatus,
        });

        // Update the local state to reflect the updated status
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request._id === requestId ? { ...request, status: newStatus } : request
            )
        );

        alert('Request status updated successfully!');
    } catch (error) {
        console.error('Error updating request status:', error);
        alert('Failed to update request status. Please try again.');
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
        <div className='verify-requests-container'>
                <table className='ui clelled table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Registration No</th>
                            <th>Request Number</th>
                            <th>Email</th>
                            <th>Telephone Number</th>
                            <th>Description</th>
                            <th>Documents</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id}>
                            <td>{request.user_id?.name || 'N/A'}</td>
                            <td>{request.beneficiary_id?.username || 'N/A'}</td>
                            <td>{request._id}</td>
                            <td>{request.user_id?.email || 'N/A'}</td>
                            <td>{request.beneficiary_id?.phoneNo || 'N/A'}</td>
                            <td>{request.description || 'No Description'}</td>
                            <td>
                                <a href="#" onClick={() => openModal(request.documents)}>View Document</a>
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

export default VerifyRequestsTable;