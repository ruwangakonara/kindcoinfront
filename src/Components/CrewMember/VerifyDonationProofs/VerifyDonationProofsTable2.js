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
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);

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

  useEffect(() => {
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
      setFilterDonations([]);
    } else {
      const filtered = proofs.filter(proof => {
        const status = proof.verified ? 'Verified' : 'Not Verified';
        return selectedStatuses.includes(status);
      });
      setFilterDonations(filtered);
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
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
              <TableHeaderCell style = {{width: "auto", whiteSpace: "nowrap" }}>Images</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>

          {noResultsFound && (
              <tbody>
              <tr>
                <td colSpan="12" className="crew-no-results-message">
                  No matching records available.
                </td>
              </tr>
              </tbody>
          )}

          <TableBody>
            {filterDonations.map((donation) => {

              console.log(donation)
              return(

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
                  <TableCell>{donation.description || 'No Description'}</TableCell>
                  <TableCell style={{width: "auto", whiteSpace: "nowrap"}}>
                    {/*{['image1', 'image2', 'image3', 'image4'].map((imgKey) => (*/}
                    {/*    donation.documents[imgKey] ? (*/}
                    {/*        <img*/}
                    {/*            key={imgKey}*/}
                    {/*            src={donation[imgKey]}*/}
                    {/*            alt={imgKey}*/}
                    {/*            style={{ maxWidth: '50px', cursor: 'pointer', marginRight: '5px' }}*/}
                    {/*            onClick={() => openModal(donation[imgKey])}*/}
                    {/*        />*/}
                    {/*    ) : null*/}
                    {/*))}*/}

                    <img
                        // key={imgKey}
                        src={donation.documents[0]}
                        alt="one"
                        style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                        onClick={() => openModal(donation.documents[0])}
                    />
                    <img
                        // key={imgKey}
                        src={donation.documents[1]}
                        alt="one"
                        style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                        onClick={() => openModal(donation.documents[1])}
                    />
                    <img
                        // key={imgKey}
                        src={donation.documents[2]}
                        alt="one"
                        style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                        onClick={() => openModal(donation.documents[2])}
                    />
                    <img
                        // key={imgKey}
                        src={donation.documents[3]}
                        alt="one"
                        style={{maxWidth: '50px', cursor: 'pointer', marginRight: '5px'}}
                        onClick={() => openModal(donation.documents[3])}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                        onClick={() => handleStatusChange(donation.donationId, donation.verified ? 'Unverified' : 'Verified')}
                        className={`verify-toggle-btn ${donation.verified ? 'btn-unverify' : 'btn-verify'}`}
                    >
                    {donation.verified ? 'Unverify' : 'Verify'}
                    </button>
                  </TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>

        <Modal open={modalOpen} onClose={closeModal} size="large" closeIcon>
          <Modal.Header>Image Preview</Modal.Header>
          <Modal.Content>
            {selectedImage && (
                <img src={selectedImage} alt="Preview" style={{ width: '100%' }} />
            )}
          </Modal.Content>
        </Modal>
      </div>
  );
};

export default VerifyRequestsTable;
