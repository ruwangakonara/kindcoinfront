import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminBeneficiaryCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import classes from "./AdminBeneficiaryDetails.module.css";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";

const AdminBeneficiaryDetailsPg = () => {
  //CHANGE THE LOGIC

  //     const { user_id } = useParams();

  //   const [donorDetails, setDonorDetails] = useState(null); // Store donor details
  //   const [loading, setLoading] = useState(true); // Loading state
  //   const [error, setError] = useState(null); // Error state

  //   useEffect(() => {
  //     // Fetch donor details when the component mounts
  //     const fetchDonorDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:9013/admin/Donor_List/Donors/${user_id}`
  //         );
  //         console.log(response.data);
  //         setDonorDetails(response.data); // Set donor details
  //         setLoading(false); // Set loading to false
  //       } catch (err) {
  //         console.error("Error fetching donor data:", err);
  //         setError(err.message); // Set error state
  //         setLoading(false); // Set loading to false
  //       }
  //     };

  //     console.log("Before fetching donor details...");
  //     fetchDonorDetails();

  //     // You can now use user_id to fetch data or perform other actions
  //     console.log("Donor ID from URL:", user_id);

  //     // Example: Fetch donor details using the user_id
  //     // fetchDonorDetails(user_id);
  //   }, [user_id]);

  //   if (loading) {
  //     return (
  //       <>
  //         <HeaderCmp />
  //         <div className={classes.mainContainer}>
  //           {/* <SidebarAdminCmp visible={true} /> */}
  //           <AdminSideBarCmp />
  //           <div className={classes.content}>
  //             <DefaultDashCmp>
  //               <div>Loading...</div>
  //             </DefaultDashCmp>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }

  //   if (error) {
  //     // Show an error message
  //     return (
  //       <>
  //         <HeaderCmp />
  //         <div className={classes.mainContainer}>
  //           {/* <SidebarAdminCmp visible={true} /> */}
  //           <AdminSideBarCmp />
  //           <div className={classes.content}>
  //             <DefaultDashCmp>
  //               <div>Error: {error}</div>
  //             </DefaultDashCmp>
  //           </div>
  //         </div>
  //       </>
  //     );
  //   }

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
        console.log("Beneficiary : ", response.data);
        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error("Error fetching beneficiary details:", error);
        setError("Error fetching beneficiary details.");
        setLoading(false);
      }
    };

    // if (userId) {
    fetchBeneficiaryDetails(); // Fetch the data when the component is mounted or userId changes
    // }
  }, []); // Dependency array ensures the effect runs when the userId changes

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

  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        <AdminSideBarCmp />
        {/* <SidebarAdminCmp visible={true} /> */}
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Beneficiary Details</h1>
            {/* <AdminBeneficiaryCmp beneficiaryDetails={beneficiaryDetails}/> */}
            {/* <AdminBeneficiaryCmp /> */}
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
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AdminBeneficiaryDetailsPg;
