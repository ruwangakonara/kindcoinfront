import classes from "./AdminDonorListCmp.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate()

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
        { userId: "1", userName: "michael_scott", name: "Michael Scott", image: "https://via.placeholder.com/150", district: "Kegalle", stellarAddress: "stellar123abc1", address: "No: 18 Forest Avenue, Kegalle", contact: "0771122334", beneficiaryType: "Individual" },
        { userId: "2", userName: "abc_children_home", name: "ABC Children's Home", image: "https://via.placeholder.com/150", district: "Puttalam", stellarAddress: "stellar456def2", address: "No: 2 Lake View Road, Puttalam", contact: "0772233445", beneficiaryType: "Organization" },
        { userId: "3", userName: "linda_smith", name: "Linda Smith", image: "https://via.placeholder.com/150", district: "Hambantota", stellarAddress: "stellar789ghi3", address: "No: 8 Harbor Lane, Hambantota", contact: "0773344556", beneficiaryType: "Individual" },
        { userId: "4", userName: "wildlife_org", name: "Wildlife Conservation", image: "https://via.placeholder.com/150", district: "Polonnaruwa", stellarAddress: "stellar012jkl4", address: "No: 19 Jungle Road, Polonnaruwa", contact: "0774455667", beneficiaryType: "Organization" },
        { userId: "5", userName: "daniel_james", name: "Daniel James", image: "https://via.placeholder.com/150", district: "Kandy", stellarAddress: "stellar345mno5", address: "No: 6 Temple Street, Kandy", contact: "0775566778", beneficiaryType: "Individual" },
        { userId: "6", userName: "bright_future", name: "Bright Future Foundation", image: "https://via.placeholder.com/150", district: "Kurunegala", stellarAddress: "stellar678pqr6", address: "No: 10 Hope Avenue, Kurunegala", contact: "0776677889", beneficiaryType: "Organization" },
        { userId: "7", userName: "jane_doe", name: "Jane Doe", image: "https://via.placeholder.com/150", district: "Ampara", stellarAddress: "stellar901stu7", address: "No: 22 Peace Street, Ampara", contact: "0777788990", beneficiaryType: "Individual" },
        { userId: "8", userName: "save_earth", name: "Save the Earth", image: "https://via.placeholder.com/150", district: "Batticaloa", stellarAddress: "stellar234vwx8", address: "No: 3 Lagoon View, Batticaloa", contact: "0778899001", beneficiaryType: "Organization" },
        { userId: "9", userName: "mark_evans", name: "Mark Evans", image: "https://via.placeholder.com/150", district: "Mannar", stellarAddress: "stellar567yz9", address: "No: 5 Sea Breeze Lane, Mannar", contact: "0779900112", beneficiaryType: "Individual" },
        { userId: "10", userName: "forest_guardians", name: "Forest Guardians", image: "https://via.placeholder.com/150", district: "Monaragala", stellarAddress: "stellar890abc10", address: "No: 7 Green Street, Monaragala", contact: "0770011223", beneficiaryType: "Organization" },
    ];


    const handleRowClick = (userId) => {
        navigate(`/admin/Donor_List/Donors/${userId}`);
    };

    const handleEditClick = (e, userId) => {
        e.stopPropagation(); // Prevent the row click event
        navigate(`/admin/Donor_List/Donors/${userId}/edit`);
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
                            onClick={() => handleRowClick(row.userId)}
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
                                    <Button color='primary' onClick={(e) => handleEditClick(e, row.userId)}>Edit</Button>
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
    </div>
  );
};

export default AdminDonorListCmp;