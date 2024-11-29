import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminDonorEditFormCmp from "../../../Components/Admin/DonorDetails/AdminDonorEditFormCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./AdminDonorEditFormPg.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDonorEditFormPg = () => {
  const { user_id } = useParams();

  const [donorDetails, setDonorDetails] = useState(null); // Store donor details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch donor details when the component mounts
    const fetchDonorDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9013/admin/Donor_List/Donors/${user_id}`
        );
        console.log(response.data);
        setDonorDetails(response.data); // Set donor details
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setError(err.message); // Set error state
        setLoading(false); // Set loading to false
      }
    };

    console.log("Before fetching donor details...");
    fetchDonorDetails();

    // You can now use user_id to fetch data or perform other actions
    console.log("Donor ID from URL:", user_id);

    // Example: Fetch donor details using the user_id
    // fetchDonorDetails(user_id);
  }, [user_id]);

  if (loading) {
    return (
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <SidebarAdminCmp visible={true} />
        <DefaultDashCmp>
          <div>Loading...</div>
        </DefaultDashCmp>
      </div>
    );
  }

  if (error) {
    // Show an error message
    return (
      <div className={classes.mainContainer}>
        <HeaderCmp />
        <SidebarAdminCmp visible={true} />
        <DefaultDashCmp>
          <div>Error: {error}</div>
        </DefaultDashCmp>
      </div>
    );
  }

  return (
    <div className={classes.mainContainer}>
      <HeaderCmp />
      <SidebarAdminCmp visible={true} />
      <DefaultDashCmp>
        <h1 style={{ textAlign: "center" }}>Edit Donor</h1>
        {/* Pass the donor details to AdminDonorCmp */}
        <div className={classes.editForm}>
          <AdminDonorEditFormCmp donorDetails={donorDetails} />
        </div>
      </DefaultDashCmp>
    </div>
  );
};

export default AdminDonorEditFormPg;
