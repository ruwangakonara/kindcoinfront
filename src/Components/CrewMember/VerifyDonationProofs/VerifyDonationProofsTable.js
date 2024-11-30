import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Menu,
  Table,
  Dropdown,
  Button,
  Modal,
  Select,
} from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import "./VerifyDonationProofsTable.css";
import SearchBar from './Searchbar';

const data = [
  {
    name: "Liviru Weerasinghe",
    registrationNo: "0001",
    requestNo: "0001",
    email: "liviruweera@gmail.com",
    telephone: "0716918856",
    description: "Description about the 0001 Fund Request Application",
    documents: ["Image1", "Pdf1"],
    status: "Pending",
  },
  {
    name: "Saman Arachchige",
    registrationNo: "0002",
    requestNo: "0002",
    email: "samanarach@gmail.com",
    telephone: "0716647856",
    description: "Description about the 0002 Fund Request Application",
    documents: ["Image2", "Pdf2"],
    status: "Published",
  },
];

const statusOptions = [
  { key: "pending", text: "Pending", value: "Pending" },
  { key: "rejected", text: "Rejected", value: "Rejected" },
  { key: "accepted", text: "Accepted", value: "Accepted" },
];

const VerifyRequestsTable = () => {
  const [proofs, setProof] = useState([]);
  const [status, setStatus] = useState({});
  const [filterDonations, setFilterDonations] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const response = await axios.get('http://localhost:9013/crew/get_donation_proof'); // Ensure this URL is correct
        setProof(response.data.donations); // Adjust to the correct response structure
        setFilterDonations(response.data.donations);
      } catch (error) {
        console.error('Error fetching recipients:', error);
      }
    };

    fetchProof();
  }, []);

  const handleSearch = (event) => {
    console.log('Search query:', event.target.value);
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = proofs.filter((proof) => {
      const searchString = `${proof.name} 
            ${proof.user_id?.username} ${proof._id}
             ${proof.donor_id?.email} ${proof.donor_id?.phoneNo}
             ${proof.benificiary_id?.name} ${proof.request_id}
              ${proof.request_id?.description} ${proof.doc_verified}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });
    console.log('Filtered data:', filteredData);
    setFilterDonations(filteredData);
    setNoResultsFound(filteredData.length === 0);
  };

  const handleSubmit = () => {
    console.log("Submitting status changes:", status);
  };

  const handleRowClick = (documents) => {
    setSelectedDocuments(documents);
    setModalOpen(true);
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
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Donor Name</TableHeaderCell>
            <TableHeaderCell>Donation ID</TableHeaderCell>
            <TableHeaderCell>Request ID</TableHeaderCell>
            <TableHeaderCell>Beneficiary ID</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Telephone Number</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Documents</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        {noResultsFound && (
          <div className="crew-no-results-message">
            No matching records available.
          </div>
        )}

        <TableBody>
          {filterDonations.map((donation, index) => (
            <TableRow key={donation.donationId} onClick={() => openModal(donation.documents)}>
              <TableCell>{donation.donorName || 'N/A'}</TableCell>
              <TableCell>{donation.donationId}</TableCell>
              <TableCell>{donation.requestId || 'N/A'}</TableCell>
              <TableCell>{donation.beneficiaryId || 'N/A'}</TableCell>
              <TableCell>{donation.email || 'N/A'}</TableCell>
              <TableCell>{donation.phone || 'N/A'}</TableCell>
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
                <Select
                  value={donation.status}
                  onChange={(e) =>
                      setProof((prevRequests) =>
                          prevRequests.map((r) =>
                              r._id === donation._id
                                  ? { ...r, status: e.target.value }
                                  : r
                          )
                      )
                  }
                  >
                  <option value="Verified">Verified</option>
                  <option value="Unverified">Not Verified</option>
                  </Select>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleVerify(donation._id, donation.status)}>Submit</Button>
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
