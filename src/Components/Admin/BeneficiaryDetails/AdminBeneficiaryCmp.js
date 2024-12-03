import React, { useEffect, useState } from "react";
import classes from "./AdminBeneficiaryCmp.module.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";

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

// const AdminBeneficiaryCmp = ({beneficiaryDetails}) => {
const AdminBeneficiaryCmp = () => {
  const { userId } = useParams();
  console.log(userId);
  const [beneficiary, setBeneficiary] = useState(null); // State to store the fetched beneficiary data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch beneficiary data based on userId
  useEffect(() => {
    const fetchBeneficiaryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9013/Beneficiary_List/Beneficiary/${userId}`
        );
        setBeneficiary(response.data); // Assuming the response contains the beneficiary data
        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error("Error fetching beneficiary details:", error);
        setError("Error fetching beneficiary details.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchBeneficiaryDetails(); // Fetch the data when the component is mounted or userId changes
    }
  }, [userId]); // Dependency array ensures the effect runs when the userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!beneficiary) {
    return <div>No beneficiary details found</div>;
  }

  const {
    user_id,
    name,
    username,
    profile_image,
    district,
    phoneNo,
    stellar_address,
    type,
    date_of_birth,
    description,
    anonymous,
    no_donations,
    donated,
    tokens,
    created_at,
  } = beneficiary;

  // const donorDetails = {
  //   userId: "1",
  //   userName: "michael_scott",
  //   name: "Michael Scott",
  //   image: "https://via.placeholder.com/150",
  //   district: "Kegalle",
  //   stellarAddress: "stellar123abc1",
  //   address: "No: 18 Forest Avenue, Kegalle",
  //   contact: "0771122334",
  //   beneficiaryType: "Individual",
  // };

  return (
    <div className={classes.admin_mainContainer}>
      <div className={classes.admin_subContainer}>
        <div className={classes.admin_cardWrapper}>
          <Card
            className={{
              display: "flex",
              flexDirection: "row",
              width: "600px",
            }}
            fluid={true}
            centered={true}
            raised
          >
            {/* <Image
            src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
            wrapped
            ui={false}
          /> */}
            <CardContent>
              {/* <CardHeader>{anonymous ? "Anonymous Donor" : name}</CardHeader> */}
              <CardHeader>
                {anonymous ? "Anonymous Beneficiary" : name}
              </CardHeader>
              <CardMeta>
                {/* <span className="date">Joined in {new Date(created_at).toLocaleDateString()}</span> */}
                <span className="date">
                  Joined on {new Date(created_at).toLocaleDateString()}
                </span>
              </CardMeta>
              <CardDescription textAlign="left">
                <div className={classes.admin_cardDescription}>
                  {/* Daniel is a Janiter in Bangladesh. */}
                  <p>
                    <strong>User ID:</strong> {user_id}
                  </p>
                  {/* <p>
                    <strong>Name:</strong> {donorDetails.name}
                  </p> */}
                  <p>
                    <strong>UserName:</strong> {username}
                  </p>
                  <p>
                    <strong>District:</strong> {district}
                  </p>
                  <p>
                    <strong>Address:</strong> {stellar_address}
                  </p>
                  <p>
                    <strong>Contact No.:</strong> {phoneNo}
                  </p>
                  {/* <p>
                    <strong>Stellar Address:</strong>{" "}
                    {donorDetails.stellarAddress}
                  </p> */}
                </div>
              </CardDescription>
            </CardContent>
            <Image
              className={classes.admin_image}
              style={{ width: "200px", height: "200px" }}
              src={
                // profile_image ||
                "https://react.semantic-ui.com/images/avatar/large/matthew.png"
              }
              wrapped
              ui={false}
            />
            {/* <CardContent extra>
              <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBeneficiaryCmp;
