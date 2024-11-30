import classes from "./ViewCrewMembers.module.css";
import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import CrewMemberTableCmp from "../../../Components/Admin/CrewMemberDets/CrewMemberTableCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";

const ViewCrewMembersPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Crew Members</h1>
            <CrewMemberTableCmp />
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default ViewCrewMembersPg;
