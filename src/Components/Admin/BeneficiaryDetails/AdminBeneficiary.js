import React from 'react';
// import classes from "./AdminBeneficiary.module.css"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AdminBeneficiary = () =>{

    const rows = [
        { name: 'Giacomo Guilizzoni', jobTitle: 'Founder & CEO', age: 40, nickname: 'Peldi', employee: true },
        { name: 'Marco Botton', jobTitle: 'Tuttofare', age: 38, nickname: 'Patata', employee: true },
        { name: 'Mariah Maclachlan', jobTitle: 'Better Half', age: 41, nickname: '', employee: false },
        { name: 'Valerie Liberty', jobTitle: 'Head Chef', age: 34, nickname: 'Val', employee: true },
      ];

    return(
        <div>
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
                            <button style={{padding: '5px',backgroundColor: '#f5f5f5'}}>View</button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default AdminBeneficiary