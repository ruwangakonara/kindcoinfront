import classes from "./ViewCrewMembers.module.css";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp"
import CrewMemberTableCmp from "../../../Components/Admin/CrewMemberDets/CrewMemberTableCmp2";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import { useEffect, useState } from "react";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:9013",
  withCredentials: true,
});
const ViewCrewMembersPg = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    try {
      const response = await axiosInstance.get("/admin/get_members");
      setMembers(response.data.members);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <HeaderCmp />
      {/* <SidebarAdminCmp visible={true} /> */}
      <AdminSideBarCmp />
      <DefaultDashCmp>
        <h1 style={{ textAlign: "center" }}>Crew Members</h1>
        <CrewMemberTableCmp members={members} />
      </DefaultDashCmp>
    </div>
  );
};

export default ViewCrewMembersPg;
