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
import classes from "./AdminBeneficiaryList.module.css"


const AdminBeneficiaryList = () => {
    const rows = [
        { userId: "1",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "2",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "3",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "4",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "5",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "6",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "7",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "8",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "9",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
        { userId: "10",userName:"chamalferdy",name: 'Chamal Fernando', district: 'Colombo', stellarAddress: "No: 17 Peiris Road, Moratuwa" },
      ];

    return (
        <div className={classes.mainContainer}>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell className={classes.customFont}>UserId</TableHeaderCell>
                        <TableHeaderCell className={classes.customFont}>UserName</TableHeaderCell>
                        <TableHeaderCell className={classes.customFont}>Name</TableHeaderCell>
                        <TableHeaderCell className={classes.customFont}>District</TableHeaderCell>
                        <TableHeaderCell className={classes.customFont}>Stellar Address</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.district}</TableCell>
                            <TableCell>{row.stellarAddress}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='5'>
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
}
 
export default AdminBeneficiaryList;