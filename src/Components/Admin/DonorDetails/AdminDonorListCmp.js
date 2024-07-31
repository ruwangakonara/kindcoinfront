import classes from "./AdminDonorListCmp.module.css"
import { useState } from "react";
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
    Image,
    Button
} from 'semantic-ui-react'

const AdminDonorListCmp = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [activeRows, setActiveRows] = useState({});

    /**
     * Fields to be included 
     * 
     * userId
     * Name
     * UserName
     * Address
     * Images
     * ProfileImage
     * Description
     * Type
     * DateOfBirth
     * StellarAddress
     * District
     * CreatedAt
     * PhoneNo 
     */

    const rows = [
        { userId: "1",userName:"Sumihiri@34",name: 'Sumihiri Childrens Home',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Organization" },
        { userId: "2",userName:"nimalperera@2",name: 'Nimal Perera',image:'https://via.placeholder.com/150', district: 'Gampaha', stellarAddress: "abcde34hijk0", address:"No: 19/5 Walawwatta Road, Nugegoda",contact:"07129354488", beneficiaryType:"Individual" },
        { userId: "3",userName:"Vanr#ossum123",name: 'Guido Van Rossum',image:'https://via.placeholder.com/150', district: 'Trincomalee', stellarAddress: "abcd0--ijkl", address:"1st lane, China Bay, Trincomalee",contact:"071394844", beneficiaryType:"Individual" },
        { userId: "4",userName:"Gih@n@7809",name: 'Gihan Tharindya Andrew',image:'https://via.placeholder.com/150', district: 'Kaluthara', stellarAddress: "ab==efghijk+", address:"No:33,Raja Mawatha, Kaluthara North",contact:"0714939944", beneficiaryType:"Individual" },
        { userId: "5",userName:"Uvi@Amandy",name: 'Uvini Amandee Ferdinandez Ferdinandez',image:'https://via.placeholder.com/150', district: 'Galle', stellarAddress: "abc4;'/hijkl", address:"No:34/8,New Market Street, Galle",contact:"0711900074", beneficiaryType:"Individual" },
        { userId: "6",userName:"chamalferdy",name: 'Chamal Fernando',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Organization" },
        { userId: "7",userName:"chamalferdy",name: 'Chamal Fernando',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Organization" },
        { userId: "8",userName:"chamalferdy",name: 'Chamal Fernando',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Individual" },
        { userId: "9",userName:"chamalferdy",name: 'Chamal Fernando',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Organization" },
        { userId: "10",userName:"chamalferdy",name: 'Chamal Fernando',image:'https://via.placeholder.com/150', district: 'Colombo', stellarAddress: "abcdefghijkl", address:"No: 17 Peiris Road, Moratuwa",contact:"071193444", beneficiaryType:"Individual" },
    ];


    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    const toggleActivation = (index) => {
        setActiveRows(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };


  return (
    <div className={classes.mainContainer}>
        <Table celled>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell className={classes.customFont}>UserId</TableHeaderCell>
                    <TableHeaderCell className={classes.customFont}>Name</TableHeaderCell>
                    <TableHeaderCell className={classes.customFont}>UserName</TableHeaderCell>
                    <TableHeaderCell className={classes.customFont}>District</TableHeaderCell>
                    {/* <TableHeaderCell className={classes.customFont}> Address</TableHeaderCell> */}
                    <TableHeaderCell className={classes.customFont}>Address</TableHeaderCell>
                    <TableHeaderCell className={classes.customFont}>Contact No.</TableHeaderCell>
                    <TableHeaderCell className={classes.customFont}>Action</TableHeaderCell>
                    {/* <TableHeaderCell className={classes.customFont}>Beneficiary Type</TableHeaderCell> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, index) => {
                    const isActive = activeRows[index] ?? true;
                    return (
                        <TableRow 
                            key={index} 
                            className={`${classes.dataRow} ${!isActive && classes.deactivatedRow}`} 
                            onClick={() => handleRowClick(row)}
                        >
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell >
                                <div className={classes.userNameContainer}>
                                    <Image src={row.image} circular className={classes.imageStylings}></Image>
                                    <span className={classes.truncatedText}>{row.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{row.district}</TableCell>
                            {/* <TableCell>{row.address}</TableCell> */}
                            <TableCell>{row.stellarAddress}</TableCell>
                            <TableCell>{row.contact}</TableCell>
                            <TableCell className={classes.actionStylings}>
                                <div className={classes.actionContainerDiv}>
                                    <Button color='primary' /*onClick={ }*/>Edit</Button>
                                    <Button 
                                    color={isActive ? 'red' : 'green'} onClick={(e) => {
                                        e.stopPropagation();
                                        toggleActivation(index);
                                    }}>
                                    {isActive ? 'Deactivate' : 'Activate'}</Button>
                                </div>
                            </TableCell>
                            {/* <TableCell>{row.beneficiaryType}</TableCell> */}
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableHeaderCell colSpan='7'>
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

        {selectedUser && (
            // <div className={classes.userDetails}>
            <div>
                <h2>User Details</h2>
                <p><strong>User ID:</strong> {selectedUser.userId}</p>
                <p><strong>User Name:</strong> {selectedUser.userName}</p>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>District:</strong> {selectedUser.district}</p>
                <p><strong>Stellar Address:</strong> {selectedUser.stellarAddress}</p>
                <p><strong>Contact:</strong> {selectedUser.contact}</p>
                <Image src={selectedUser.image} circular className={classes.userDetailImage} />
            </div>
        )}

    </div>
  );
};

export default AdminDonorListCmp;