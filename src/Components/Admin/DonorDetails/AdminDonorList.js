import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import './AdminDonorList.css'

const AdminDonorList = () => {
  const rows = [
    { name: 'Giacomo Guilizzoni', jobTitle: 'Founder & CEO', age: 40, nickname: 'Peldi', employee: true },
    { name: 'Marco Botton', jobTitle: 'Tuttofare', age: 38, nickname: 'Patata', employee: true },
    { name: 'Mariah Maclachlan', jobTitle: 'Better Half', age: 41, nickname: '', employee: false },
    { name: 'Valerie Liberty', jobTitle: 'Head Chef', age: 34, nickname: 'Val', employee: true },
  ];

  return (
    <div className="donor-list">
      {/* <div className="search-bar">
        <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton>
      </div> */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><h3>Name</h3></TableCell>
                <TableCell><h3>Age</h3></TableCell>
                <TableCell><h3>Nickname</h3></TableCell>
                <TableCell><h3>Employee</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}<br /><small>{row.jobTitle}</small>
                  </TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.nickname}</TableCell>
                  <TableCell>
                    {/* <Checkbox checked={row.employee} /> */}
                    <button style={{padding: '5px',backgroundColor: '#f5f5f5'}}>View</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AdminDonorList;
