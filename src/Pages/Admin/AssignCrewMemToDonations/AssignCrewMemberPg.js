import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
// import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
// import SidebarAdminCmp from "../../../Components/Admin/Sidebar/SidebarAdminCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import classes from "./AssignCrewMemberPg.module.css";

const AssignCrewMemberPg = () => {
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        {/* <SidebarAdminCmp visible={true} /> */}
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>
              Assign Crew Member For Operations
            </h1>
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default AssignCrewMemberPg;
