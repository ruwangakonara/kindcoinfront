import React from 'react';
import classes from "./AdminBeneficiary.module.css"
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
  } from 'semantic-ui-react'

const AdminBeneficiary = () =>{

    const rows = [
        { name: 'Giacomo Guilizzoni', jobTitle: 'Founder & CEO', age: 40, nickname: 'Peldi', employee: true },
        { name: 'Marco Botton', jobTitle: 'Tuttofare', age: 38, nickname: 'Patata', employee: true },
        { name: 'Mariah Maclachlan', jobTitle: 'Better Half', age: 41, nickname: '', employee: false },
        { name: 'Valerie Liberty', jobTitle: 'Head Chef', age: 34, nickname: 'Val', employee: true },
      ];

    return(
        <div className={classes.mainContainer}>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Header1</TableHeaderCell>
                        <TableHeaderCell>Header2</TableHeaderCell>
                        <TableHeaderCell>Header3</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                        {/* <Label ribbon>First</Label> */}
                        Cell
                        </TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
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
    )
}

export default AdminBeneficiary