import React, { useState } from 'react';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Label,
  Menu,
  Table,
  Dropdown,
  Button,
} from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import './VerifyRequestsTable.css';

const data = [
  {
    name: 'Liviru Weerasinghe',
    registrationNo: '0001',
    requestNo: '0001',
    email: 'liviruweera@gmail.com',
    telephone: '0716918856',
    description: 'Description about the 0001 Fund Request Application',
    documents: 'https://example.com/sample-image.jpg',
    status: 'Pending',
  },
  {
    name: 'Saman Arachchige',
    registrationNo: '0002',
    requestNo: '0002',
    email: 'samanarach@gmail.com',
    telephone: '0716647856',
    description: 'Description about the 0002 Fund Request Application',
    documents: 'https://example.com/sample-image.jpg',
    status: 'Published',
  },

];

const statusOptions = [
  { key: 'pending', text: 'Pending', value: 'Pending' },
  { key: 'rejected', text: 'Rejected', value: 'Rejected' },
  { key: 'published', text: 'Published', value: 'Published' },
];

const VerifyRequestsTable = () => {
  const [status, setStatus] = useState({});

  const handleStatusChange = (index, value) => {
    setStatus(prevState => ({
      ...prevState,
      [index]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting status changes:', status);
  };

  // const renderDocument = (url) => {
  //   if (url.endsWith('.pdf')) {
  //     return (
  //       <div style={{ maxWidth: '200px', overflow: 'hidden' }}>
  //         <Document file={url}>
  //           <Page pageNumber={1} />
  //         </Document>
  //       </div>
  //     );
  //   } else if (url.match(/\.(jpg|jpeg|png)$/)) {
  //     return <img src={url} alt="Document preview" style={{ maxWidth: '200px' }} />;
  //   } else {
  //     return <a href={url} download>Download</a>;
  //   }
  // };

  return (
    <div className='verify-requests-container'>
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
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.registrationNo}</TableCell>
            <TableCell>{row.requestNo}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.telephone}</TableCell>
            <TableCell data-tooltip={row.description}>{row.description}</TableCell>
            <TableCell>{row.documents}</TableCell>
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
          <TableHeaderCell colSpan='8'>
            <Menu floated='right' pagination>
              <MenuItem as='a' icon>
                <Icon name='chevron left' />
              </MenuItem>
              <MenuItem as='a'>1</MenuItem>
              <MenuItem as='a'>2</MenuItem>
              <MenuItem as='a'>3</MenuItem>
              <MenuItem as='a'>4</MenuItem>
              <MenuItem as='a' icon>
                <Icon name='chevron right' />
              </MenuItem>
            </Menu>
          </TableHeaderCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
};

export default VerifyRequestsTable;
