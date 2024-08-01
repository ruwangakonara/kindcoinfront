import classes from "./AdminBeneficiaryListCmp.module.css"
import { useState } from 'react';
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

const AdminBeneficiaryListCmp = () => {

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
     * CertificateImage
     * Description
     * Type
     * DateOfBirth
     * District
     * CreatedAt
     * PhoneNo
     */

    const rows = [
        { userId: "1", userName: "alex_jones99", name: "Alex Jones", image: "https://via.placeholder.com/150", district: "Colombo", stellarAddress: "stellar123abc", address: "No: 5 Main Street, Colombo", contact: "0771234567", beneficiaryType: "Individual" },
        { userId: "2", userName: "rose_marie", name: "Rose Marie Trust", image: "https://via.placeholder.com/150", district: "Kandy", stellarAddress: "stellar456def", address: "No: 23 Hilltop Avenue, Kandy", contact: "0777654321", beneficiaryType: "Organization" },
        { userId: "3", userName: "samwilliams", name: "Sam Williams", image: "https://via.placeholder.com/150", district: "Galle", stellarAddress: "stellar789ghi", address: "No: 10 Lighthouse Road, Galle", contact: "0779876543", beneficiaryType: "Individual" },
        { userId: "4", userName: "greenearth_org", name: "Green Earth Foundation", image: "https://via.placeholder.com/150", district: "Jaffna", stellarAddress: "stellar012jkl", address: "No: 1 North Lane, Jaffna", contact: "0773456789", beneficiaryType: "Organization" },
        { userId: "5", userName: "emily_clark", name: "Emily Clark", image: "https://via.placeholder.com/150", district: "Matara", stellarAddress: "stellar345mno", address: "No: 45 Beach Road, Matara", contact: "0776543210", beneficiaryType: "Individual" },
        { userId: "6", userName: "happy_kids_home", name: "Happy Kids Home", image: "https://via.placeholder.com/150", district: "Badulla", stellarAddress: "stellar678pqr", address: "No: 9 Sunrise Boulevard, Badulla", contact: "0778765432", beneficiaryType: "Organization" },
        { userId: "7", userName: "john_doe", name: "John Doe", image: "https://via.placeholder.com/150", district: "Anuradhapura", stellarAddress: "stellar901stu", address: "No: 11 Sacred City, Anuradhapura", contact: "0772345678", beneficiaryType: "Individual" },
        { userId: "8", userName: "blue_ocean", name: "Blue Ocean Society", image: "https://via.placeholder.com/150", district: "Trincomalee", stellarAddress: "stellar234vwx", address: "No: 7 Marine Drive, Trincomalee", contact: "0775432109", beneficiaryType: "Organization" },
        { userId: "9", userName: "rachel_green", name: "Rachel Green", image: "https://via.placeholder.com/150", district: "Ratnapura", stellarAddress: "stellar567yz", address: "No: 3 Gem Street, Ratnapura", contact: "0776789012", beneficiaryType: "Individual" },
        { userId: "10", userName: "nature_lovers", name: "Nature Lovers Group", image: "https://via.placeholder.com/150", district: "Nuwara Eliya", stellarAddress: "stellar890abc", address: "No: 8 Misty Hills, Nuwara Eliya", contact: "0779012345", beneficiaryType: "Organization" },
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
}
 
export default AdminBeneficiaryListCmp;