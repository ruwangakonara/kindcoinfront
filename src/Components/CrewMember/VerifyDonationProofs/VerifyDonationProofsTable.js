import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Modal,
} from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import "./VerifyDonationProofsTable.css";
import SearchBar from './Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Filter from './Filter';


const VerifyRequestsTable = () => {
  const [proofs, setProof] = useState([]);
  const [filterDonations, setFilterDonations] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const response = await axios.get('http://localhost:9013/crew/get_donation_proof');
        if (response.data && response.data.donations) {
          setProof(response.data.donations);
          setFilterDonations(response.data.donations);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching recipients:', error);
        toast.error('Failed to fetch recipients. Please try again later.');
      }
    };

    fetchProof();
  }, []);

  const handleStatusChange = async (docId, newStatus) => {
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
        const validStatuses = ['Verified', 'Unverified'];
        if (!validStatuses.includes(newStatus)) {
          throw new Error('Invalid status');
        }

        const response = await axios.put('http://localhost:9013/crew/update_donation_status', {
          docId,
          status: newStatus,
        });

        const updatedProofs = proofs.map((proof) =>
          proof._id === docId ? { ...proof, status: newStatus } : proof
        );

        setProof(updatedProofs);
        setFilterDonations(updatedProofs);
        toast.success('Status updated successfully');
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

    const filteredData = proofs.filter((proof) => {
      const searchString = `${proof.donorName} 
            ${proof.donorUserName} ${proof.donationId}
             ${proof.donorPhone} ${proof.requestId}
             ${proof.benificiaryId} ${proof.benificiaryName}
              ${proof.benificiaryPhone} ${proof.description} ${proof.status} ${proof.donorId}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });
    console.log('Filtered data:', filteredData);
    setFilterDonations(filteredData);
    setNoResultsFound(filteredData.length === 0);
  };

  const handleFilterChange = (selectedStatuses) => {
    if (selectedStatuses.length === 0) {
      setFilterDonations([]); // Show no records if nothing is selected
    } else {
      const filtered = proofs.filter(proof => {
        const status = proof.verified ? 'Verified' : 'Not Verified';
        return selectedStatuses.includes(status);
      });
      setFilterDonations(filtered);
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
    } else {
      return (
        <img
          src={url}
          alt="Document preview"
          style={{ maxWidth: "200px", marginBottom: "10px" }}
        />
      );
    }
  };

  const handleVerify = async (docId, docStatus) => {
    try {
      await axios.put('http://localhost:9013/crew/update_donation_status', {
        docId,
        status: docStatus,
      });

      setProof((prevRecipients) =>
        prevRecipients.map((donation) =>
          donation._id === docId ? { ...donation, status: docStatus } : donation
        )
      );

      alert('Recipient updated successfully!');
    } catch (error) {
      console.error('Error updating recipient:', error);
      alert('Failed to update the recipient. Please try again.');
    }
  };

  const handleVerificationChange = async (donationId, currentVerifiedStatus) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Confirm Verification Status',
        text: `Do you want to ${currentVerifiedStatus ? 'unverify' : 'verify'} this donation?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change status!'
      });

      // If user confirms
      if (result.isConfirmed) {
        console.log('Updating verification status for donation:', donationId, " : ", currentVerifiedStatus);
        const response = await axios.put('http://localhost:9013/crew/update_donation_status', {
          docId: donationId // Changed from requestId to donationId
        });

        // Update local state with the correct property
        const updatedProofs = proofs.map(proof =>
          proof._id === donationId
            ? { ...proof, verified: response.data.donation.verified }
            : proof
        );

        setProof(updatedProofs);
        setFilterDonations(updatedProofs);

        toast.success("Verification status updated successfully");

      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      toast.error('Failed to update verification status');
    }
  };


  const openModal = (documents) => {
    setSelectedDocuments(documents);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDocuments(null);
    setModalOpen(false);
  };


  return (
    <div className='crew-verify-requests-container'>
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
      <Filter onFilterChange={handleFilterChange} />
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Donor ID</TableHeaderCell>
            <TableHeaderCell>Donor Name</TableHeaderCell>
            <TableHeaderCell>Donor Phone</TableHeaderCell>
            <TableHeaderCell>Donor Username</TableHeaderCell>
            <TableHeaderCell>Donation ID</TableHeaderCell>
            <TableHeaderCell>Request ID</TableHeaderCell>
            <TableHeaderCell>Benificiary ID</TableHeaderCell>
            <TableHeaderCell>Beneficiary Name</TableHeaderCell>
            <TableHeaderCell>Benificiary Phone</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Documents</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        {noResultsFound && (
          <tbody>
            <tr>
              <td colSpan="9" className="crew-no-results-message">
                No matching records available.
              </td>
            </tr>
          </tbody>
        )}

        <TableBody>
          {filterDonations.map((donation, index) => (
            <TableRow key={donation.donationId}>
              <TableCell>{donation.donorId || 'N/A'}</TableCell>
              <TableCell>{donation.donorName || 'N/A'}</TableCell>
              <TableCell>{donation.donorPhone || 'N/A'}</TableCell>
              <TableCell>{donation.donorUserName || 'N/A'}</TableCell>
              <TableCell>{donation.donationId || 'N/A'}</TableCell>
              <TableCell>{donation.requestId || 'N/A'}</TableCell>
              <TableCell>{donation.beneficiaryId || 'N/A'}</TableCell>
              <TableCell>{donation.benificiaryName || 'N/A'}</TableCell>
              <TableCell>{donation.benificiaryPhone || 'N/A'}</TableCell>
              <TableCell data-tooltip={donation.description}>{donation.description || 'No Description'}</TableCell>
              <TableCell>
                {donation.documents.length > 0 ? (
                  <button onClick={() => openModal(donation.documents)} className="crew-link-button">
                    View Document
                  </button>
                ) : (
                  'No Documents'
                )}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleVerificationChange(donation.donationId, donation.verified)}
                  className={`verify-toggle-btn ${donation.verified ? 'btn-unverify' : 'btn-verify'}`}
                >
                  {donation.verified ? 'Unverify' : 'Verify'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="large"
        closeIcon
      >
        <Modal.Header>Document Preview</Modal.Header>
        <Modal.Content>
          {selectedDocuments.map((docUrl, index) => (
            <div key={index} className='crew-document-preview'>
              {renderDocumentPreview(docUrl)}
            </div>
          ))}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default VerifyRequestsTable;

// import React, { useState } from 'react';
// import { Form, Checkbox } from 'semantic-ui-react';
// import './Filter.css';

// const Filter = ({ onFilterChange }) => {
//   const [selectedValues, setSelectedValues] = useState([]);

//   const options = ['Pending', 'Rejected', 'Accepted'];

//   const handleCheckboxChange = (e, { value }) => {
//     let newSelectedValues;
//     if (selectedValues.includes(value)) {
//       newSelectedValues = selectedValues.filter((item) => item !== value);
//     } else {
//       newSelectedValues = [...selectedValues, value];
//     }
//     setSelectedValues(newSelectedValues);
//     if (onFilterChange) {
//       onFilterChange(newSelectedValues);
//     }
//   };

//   return (
//     <div className="crew-filter-container">
//       <Form>
//         <Form.Group inline>
//           <label>Status:</label>
//           {options.map((option) => (
//             <Form.Field key={option}>
//               <Checkbox
//                 label={option}
//                 name="status"
//                 value={option}
//                 checked={selectedValues.includes(option)}
//                 onChange={handleCheckboxChange}
//               />
//             </Form.Field>
//           ))}
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

// export default Filter;
