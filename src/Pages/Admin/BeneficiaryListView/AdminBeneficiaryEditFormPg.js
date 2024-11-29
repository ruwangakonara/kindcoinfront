import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import AdminBeneficiaryEditFormCmp from "../../../Components/Admin/BeneficiaryDetails/AdminBeneficiaryEditFormCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import classes from "./AdminBeneficiaryEditFormPg.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminBeneficiaryEditFormPg = () => {
  const { user_id } = useParams();

  const [beneficiaryDetails, setBeneficiaryDetails] = useState(null); // Store donor details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch donor details when the component mounts
    const fetchBeneficiaryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9013/admin/Beneficiary_List/Beneficiary/${user_id}`
        );
        console.log(response.data);
        setBeneficiaryDetails(response.data); // Set donor details
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setError(err.message); // Set error state
        setLoading(false); // Set loading to false
      }
    };

    console.log("Before fetching donor details...");
    fetchBeneficiaryDetails();

    // You can now use user_id to fetch data or perform other actions
    console.log("Beneficiary ID from URL:", user_id);

    // Example: Fetch beneficiary details using the user_id
    // fetchBeneficiaryDetails(user_id);
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
        <h1 style={{ textAlign: "center" }}>Edit</h1>
        <div className={classes.editForm}>
          {/* <AdminBeneficiaryEditFormCmp /> */}
          <AdminBeneficiaryEditFormCmp
            beneficiaryDetails={beneficiaryDetails}
          />
        </div>
      </DefaultDashCmp>
    </div>
  );
};

export default AdminBeneficiaryEditFormPg;
