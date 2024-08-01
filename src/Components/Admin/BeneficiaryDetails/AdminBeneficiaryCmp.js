import React from 'react';
import classes from "./AdminBeneficiaryCmp.module.css"
import { useParams } from 'react-router-dom';
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
  } from 'semantic-ui-react'


// const getDonorDetails = (userId) => {
//     const donors = [
//         { userId: "1", userName: "michael_scott", name: "Michael Scott", image: "https://via.placeholder.com/150", district: "Kegalle", stellarAddress: "stellar123abc1", address: "No: 18 Forest Avenue, Kegalle", contact: "0771122334", beneficiaryType: "Individual" },
//         { userId: "2", userName: "abc_children_home", name: "ABC Children's Home", image: "https://via.placeholder.com/150", district: "Puttalam", stellarAddress: "stellar456def2", address: "No: 2 Lake View Road, Puttalam", contact: "0772233445", beneficiaryType: "Organization" },
//         { userId: "3", userName: "linda_smith", name: "Linda Smith", image: "https://via.placeholder.com/150", district: "Hambantota", stellarAddress: "stellar789ghi3", address: "No: 8 Harbor Lane, Hambantota", contact: "0773344556", beneficiaryType: "Individual" },
//         { userId: "4", userName: "wildlife_org", name: "Wildlife Conservation", image: "https://via.placeholder.com/150", district: "Polonnaruwa", stellarAddress: "stellar012jkl4", address: "No: 19 Jungle Road, Polonnaruwa", contact: "0774455667", beneficiaryType: "Organization" },
//         { userId: "5", userName: "daniel_james", name: "Daniel James", image: "https://via.placeholder.com/150", district: "Kandy", stellarAddress: "stellar345mno5", address: "No: 6 Temple Street, Kandy", contact: "0775566778", beneficiaryType: "Individual" },
//         { userId: "6", userName: "bright_future", name: "Bright Future Foundation", image: "https://via.placeholder.com/150", district: "Kurunegala", stellarAddress: "stellar678pqr6", address: "No: 10 Hope Avenue, Kurunegala", contact: "0776677889", beneficiaryType: "Organization" },
//         { userId: "7", userName: "jane_doe", name: "Jane Doe", image: "https://via.placeholder.com/150", district: "Ampara", stellarAddress: "stellar901stu7", address: "No: 22 Peace Street, Ampara", contact: "0777788990", beneficiaryType: "Individual" },
//         { userId: "8", userName: "save_earth", name: "Save the Earth", image: "https://via.placeholder.com/150", district: "Batticaloa", stellarAddress: "stellar234vwx8", address: "No: 3 Lagoon View, Batticaloa", contact: "0778899001", beneficiaryType: "Organization" },
//         { userId: "9", userName: "mark_evans", name: "Mark Evans", image: "https://via.placeholder.com/150", district: "Mannar", stellarAddress: "stellar567yz9", address: "No: 5 Sea Breeze Lane, Mannar", contact: "0779900112", beneficiaryType: "Individual" },
//         { userId: "10", userName: "forest_guardians", name: "Forest Guardians", image: "https://via.placeholder.com/150", district: "Monaragala", stellarAddress: "stellar890abc10", address: "No: 7 Green Street, Monaragala", contact: "0770011223", beneficiaryType: "Organization" },
//     ];
//     return donors.find(donor => donor.userId === userId);
// };



const AdminBeneficiaryCmp = () =>{

    const { userId } = useParams();

    const donorDetails = { userId: "1", userName: "michael_scott", name: "Michael Scott", image: "https://via.placeholder.com/150", district: "Kegalle", stellarAddress: "stellar123abc1", address: "No: 18 Forest Avenue, Kegalle", contact: "0771122334", beneficiaryType: "Individual" }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.subContainer}>
                <Card className={classes.donorCardStylings} fluid={true} centered={true} raised>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                    <CardContent>
                        <CardHeader>Daniel</CardHeader>
                        <CardMeta>
                            <span className='date'>Joined in 2012</span>
                        </CardMeta>
                        <CardDescription textAlign="left">
                            <div className={classes.cardDescription}>
                            Daniel is a Janiter in Bangladesh.
                                <p><strong>User ID:</strong> {donorDetails.userId}</p>
                                <p><strong>Name:</strong> {donorDetails.name}</p>
                                <p><strong>UserName:</strong> {donorDetails.userName}</p>
                                <p><strong>District:</strong> {donorDetails.district}</p>
                                <p><strong>Address:</strong> {donorDetails.address}</p>
                                <p><strong>Contact No.:</strong> {donorDetails.contact}</p>
                                <p><strong>Stellar Address:</strong> {donorDetails.stellarAddress}</p>
                            </div>
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        {/* <a>
                            <Icon name='user' />
                            22 Friends
                        </a> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminBeneficiaryCmp