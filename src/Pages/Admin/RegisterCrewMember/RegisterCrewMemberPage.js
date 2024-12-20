import classes from "./RegisterCrewMember.module.css";

import DefaultDash from "../../../Components/Admin/DashboardComp/DefaultDash";
import Header from "../../../Components/Admin/Header/Header";
// import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin"
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";

const RegisterCrewMemberPage = () => {
  return (
    <div className={classes.mainContainer}>
      {/* <h1>Register Crew Member</h1> */}
      <Header />
      {/* <SidebarAdmin/> */}
      <AdminSideBarCmp />
      <DefaultDash>
        <h1>Register page</h1>
      </DefaultDash>
    </div>
  );
};

export default RegisterCrewMemberPage;
