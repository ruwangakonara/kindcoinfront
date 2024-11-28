import React, { useState } from "react";
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
} from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import "./VerifyDonationProofsTable.css";

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
  const [status, setStatus] = useState({});
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStatusChange = (index, value) => {
    setStatus((prevState) => ({
      ...prevState,
      [index]: value,
    }));
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

  return (
    <div className="verify-requests-container">
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Registration No</TableHeaderCell>
            <TableHeaderCell>Request Number</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Telephone Number</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Documents</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} onClick={() => handleRowClick(row.documents)}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.registrationNo}</TableCell>
              <TableCell>{row.requestNo}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.telephone}</TableCell>
              <TableCell data-tooltip={row.description}>
                {row.description}
              </TableCell>
              <TableCell>{renderDocumentPreview(row.documents[0])}</TableCell>
              <TableCell>
                <Dropdown
                  selection
                  options={statusOptions}
                  value={status[index] || row.status}
                  onChange={(e, { value }) => handleStatusChange(index, value)}
                />
              </TableCell>
              <TableCell>
                <Button onClick={handleSubmit}>Submit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="8">
              <Menu floated="right" pagination>
                <MenuItem as="a" icon>
                  <Icon name="chevron left" />
                </MenuItem>
                <MenuItem as="a">1</MenuItem>
                <MenuItem as="a">2</MenuItem>
                <MenuItem as="a">3</MenuItem>
                <MenuItem as="a">4</MenuItem>
                <MenuItem as="a" icon>
                  <Icon name="chevron right" />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
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
            <div key={index} className="document-preview">
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
//     <div className="filter-container">
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
