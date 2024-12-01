import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import classes from "./AssignCrewMemberPg2.module.css";
import CrewMemberToDonationsTable from "./CrewMemberToDonationTable";
import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9013",
  withCredentials: true,
});

const AssignCrewMemberPg2 = () => {
  const [donations, setDonations] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getDonations();
    getMembers();
  }, []);

  const getDonations = async () => {
    try {
      const response = await axiosInstance.post(
        "/admin/get_donations_for_assign",
        { type: "goods", verified: false, accepted: true }
      );
      setDonations(response.data.donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await axiosInstance.get("/admin/get_members");
      setMembers(response.data.members);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <HeaderCmp />
        {/* <SidebarAdminCmp visible={true}/> */}

        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Goods Donations</h1>
            <CrewMemberToDonationsTable
              donations={donations}
              members={members}
              axiosInstance={axiosInstance}
              getdonations={getDonations}
            />
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AssignCrewMemberPg2;
